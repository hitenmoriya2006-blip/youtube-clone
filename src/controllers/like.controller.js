import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from '../utils/ApiResponse.js'
import { deleteFromCloudinary, uploadOnCloudinary } from "../services/storage.js"
import mongoose from "mongoose"
import { likeModel } from "../models/like.model.js"
import { videoModel } from "../models/video.model.js"

const getLikedVideo = asyncHandler(async (req, res) => {
    const userId = req.user?._id

    if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
        throw new ApiError(400, 'Invalid userId')
    }

    const likedVideos = await likeModel.aggregate([
        {
            $match: {
                likedBy: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup: {
                from: 'videos',
                localField: 'video',
                foreignField: '_id',
                as: 'video',
                pipeline: [
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'owner',
                            foreignField: '_id',
                            as: 'owner',
                            pipeline: [
                                {
                                    $project: {
                                        fullName: 1,
                                        username: 1,
                                        email: 1,
                                        subscriberTo: 1,
                                        subscribersCount: 1,
                                        channelsSubscribedToCount: 1,
                                        avatar: 1,
                                        coverImage: 1,
                                        isSubscribed: 1,
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $addFields: {
                            owner: {
                                $first: '$owner'
                            }
                        }
                    },
                    {
                        $project: {
                            videoFile: 1,
                            thumbnail: 1,
                            title: 1,
                            description: 1,
                            views: 1,
                            owner: 1,
                            duration: 1,
                            createdAt: 1
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                video: {
                    $first: '$video'
                }
            }
        },
        {
            $replaceRoot: {
                newRoot: "$video"
            }
        },
        {
            $project: {
                video: 1
            }
        }
    ])


    if (likedVideos.length === 0) {
        return res
            .status(200)
            .json(new ApiResponse(
                200,
                [],
                'no liked video found'
            ))
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            likedVideos,
            'video fetched successfully'
        ))
})

const toggleVideoLike = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const userId = req.user?._id

    if(!videoId){
         throw new ApiError(404, 'videoId is required')
    }

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
        throw new ApiError(400, 'Invalid videoId')
    }

    const video = await videoModel.findById(videoId)

    if(!video){
        throw new ApiError(404,'video not found')
    }

    const alreadyExist = await likeModel.findOne({
        likedBy: userId,
        video: videoId
    })

    if (!alreadyExist) {
        await likeModel.create({
            likedBy: userId,
            video: videoId
        })
    } else {
       await alreadyExist.deleteOne()
    }

     return res
             .status(200)
             .json(new ApiResponse(
                200,
                alreadyExist ? {liked:false} : {liked:true},
                alreadyExist ? 'Video unliked successfully' : 'Video liked successfully'
             ))

})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const { commentId } = req.params
    const userId = req.user?._id

    if(!commentId){
         throw new ApiError(404, 'commentId is required')
    }

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
        throw new ApiError(400, 'Invalid videoId')
    }

    const comment = await videoModel.findById(commentId)

    if(!comment){
        throw new ApiError(404,'comment not found')
    }

    const alreadyExist = await likeModel.findOne({
        likedBy: userId,
        comment: commentId
    })

    if (!alreadyExist) {
        await likeModel.create({
            likedBy: userId,
            comment: commentId
        })
    } else {
        await alreadyExist.deleteOne()
    }

     return res
             .status(200)
             .json(new ApiResponse(
                200,
                alreadyExist ? {liked:false} : {liked:true},
                alreadyExist ? 'comment unliked successfully' : 'comment liked successfully'
             ))

})



export { getLikedVideo,toggleVideoLike, toggleCommentLike,  }