import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from '../utils/ApiResponse.js'
import { userModel } from "../models/user.model.js"
import { videoModel } from "../models/video.model.js"
import { subscriptionModel } from "../models/subscription.model.js"
import { likeModel } from "../models/like.model.js"

const getChannelStats = asyncHandler(async (req, res) => {
    const userId = req.user?._id

    if (!userId) {
        throw new ApiError(400, 'user id is required')
    }

    const [videoStats, subscribersStats, likesStats] = await Promise.all([
         videoModel.aggregate([
            {
                $match: {
                    owner: userId
                }
            },
            {
                $group: {
                    _id: null,
                    totalVideos: {
                        $sum: 1
                    },
                    totalViews: {
                        $sum: '$views'
                    }
                }
            }
        ]),
        subscriptionModel.aggregate([
            {
                $match: {
                    channel: userId
                }
            },
            {
                $group: {
                    _id: null,
                    totalSubs: {
                        $sum: 1
                    }
                }
            }
        ]),
        videoModel.aggregate([
            {
                $match: {
                    owner: userId
                }
            },
            {
                $lookup: {
                    from: 'likes',
                    localField: '_id',
                    foreignField: 'video',
                    as: 'totalLikeOnVideo'
                }
            },
            {
                $addFields: {
                    totalLikes: {
                        $size: '$totalLikeOnVideo'
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    allLikes: {
                        $sum: '$totalLikes'
                    }
                }
            }
        ])
    ])

    const totalVideos = videoStats[0]?.totalVideos ?? 0
    const totalViews = videoStats[0]?.totalViews ?? 0
    const totalSubs = subscribersStats[0]?.totalSubs ?? 0
    const allLikes = likesStats[0]?.allLikes ?? 0

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            {
                totalVideos,
                totalViews,
                totalSubscribers: totalSubs,
                totalLikes: allLikes
            },
            'channel stats fetched successfully'
        ))
})

const getChannelVideos = asyncHandler(async (req, res) => {
    const userId = req.user?._id
    const { page = 1, limit = 10 } = req.query

    if (!userId) {
        throw new ApiError(400, 'user id is required')
    }

    const pageNumber = Number(page)
    const limitNumber = Number(limit)

    if (
        Number.isNaN(pageNumber) ||
        Number.isNaN(limitNumber)
    ) {
        throw new ApiError(400, 'Page and limit must be numbers')
    }

    if (pageNumber < 1 || limitNumber < 1) {
        throw new ApiError(400, 'Page and limit must be greater than 0')
    }


    const aggregate = videoModel.aggregate([
        {
            $match: {
                owner: userId
            }
        },
        {
           $sort:{
                createdAt:-1
           }
        },
        {
            $project: {
                title: 1,
                thumbnail: 1,
                views: 1,
                isPublished: 1,
                createdAt: 1
            }
        }
    ])

    const options = {
        page: pageNumber,
        limit: limitNumber
    }


    const allVideos = await videoModel.aggregatePaginate(
        aggregate,
        options
    )

    if (allVideos.docs.length === 0) {
        return res
            .status(200)
            .json(new ApiResponse(
                200,
                allVideos,
                'no video upload by the creator'
            ))
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            allVideos,
            'All videos fetched successfully'
        ))
})

export {getChannelStats,getChannelVideos}