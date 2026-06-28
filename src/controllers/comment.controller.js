import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from '../utils/ApiResponse.js'
import mongoose from "mongoose"
import { commentModel } from "../models/comment.model.js"
import { videoModel } from "../models/video.model.js"


const addComment = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const { comment } = req.body

    if (!comment || comment.trim() === '') {
        throw new ApiError(400, 'comment is required')
    }

    if (!videoId) {
        throw new ApiError(400, 'channelId is required')
    }

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
        throw new ApiError(400, 'Invalid videoId')
    }

    const videoExist = await videoModel.findById(videoId)

    if (!videoExist) {
        throw new ApiError(404, 'no video found')
    }

    const createdComment = await commentModel.create({
        content: comment,
        video: videoId,
        owner: req.user?._id
    })

    if (!createdComment) {
        throw new ApiError(500, 'something went wrong')
    }

    const commentFullDetails = await commentModel.findById(Added._id).populate('owner', 'fullName username avatar')

    return res
        .status(201)
        .json(new ApiResponse(
            200,
            commentFullDetails,
            'comment post successfully'
        ))
})

const updateComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params
    const { commentValue } = req.body

    const newComment = commentValue.trim()

    if (!commentValue || newComment === '') {
        throw new ApiError(400, 'comment is required')
    }

    if (!commentId) {
        throw new ApiError(400, 'commentId is required')
    }

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
        throw new ApiError(400, 'Invalid commentId')
    }

    const commentExist = await commentModel.findById(commentId)

    if (!commentExist) {
        throw new ApiError(404, 'comment not found')
    }

    if (!(req.user?._id.equals(commentExist.owner))) {
        throw new ApiError(403, 'unauthorize request by user')
    }

    const updatedComment = await commentModel.findByIdAndUpdate(commentId, {
        $set: {
            content: newComment
        }
    },
        {
            returnDocument: 'after'
        })

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            updatedComment,
            'updated successfully'
        ))
})

const deleteComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params

    if (!commentId) {
        throw new ApiError(400, 'commentId is required')
    }

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
        throw new ApiError(400, 'Invalid commentId')
    }

    const commentExist = await commentModel.findById(commentId)

    if (!commentExist) {
        throw new ApiError(404, 'comment not found')
    }

    if (!(req.user?._id.equals(commentExist.owner))) {
        throw new ApiError(403, 'unauthorize request by user')
    }

    await commentExist.deleteOne()

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            {},
            'commment deleted successfully'
        ))
})


const getVideoComments = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const { page = 1, limit = 10 } = req.query

    if (!videoId) {
        throw new ApiError(400, 'invalid video id')
    }

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
        throw new ApiError(400, 'Invalid video id')
    }

    const videoExist = await videoModel.findById(videoId)

    if (!videoExist) {
        throw new ApiError(404, 'video not found')
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

    const aggregation = commentModel.aggregate([
        {
            $match:{
                video: new mongoose.Types.ObjectId(videoId)
            }
        },
        {
            $sort:{
                createdAt:-1
            }
        },
        {
            $lookup:{
                from:'users',
                localField:'owner',
                foreignField:'_id',
                as:'owner',
                pipeline:[
                    {
                        $project:{
                            fullName:1,
                            username:1,
                            avatar:1
                        }
                    }
                ]
            }
        },
        {
            $addFields:{
                owner:{
                    $first:'$owner'
                }
            }
        },
        {
            $project:{
                content:1,
                owner:1,
                createdAt:1,
                updatedAt:1
            }
        }
    ])

    const options = {
        page: pageNumber,
        limit: limitNumber
    }

    const allComments =  await commentModel.aggregatePaginate(
        aggregation,
        options
    )

   console.log(allComments);
   
    return res
            .status(200)
            .json(new ApiResponse(
                200,
                allComments,
                'comments fetched on videos'
            ))

}) 

export {addComment,updateComment
    ,deleteComment,getVideoComments
}










