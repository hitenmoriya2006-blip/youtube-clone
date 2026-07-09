import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from '../utils/ApiResponse.js'
import { deleteFromCloudinary, uploadOnCloudinary } from "../services/storage.js"
import { userModel } from "../models/user.model.js"
import { videoModel } from '../models/video.model.js'
import { subscriptionModel } from '../models/subscription.model.js'
import mongoose from "mongoose"

const publishVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body

  if (!title || !description) {
    throw new ApiError(400, 'title & description is required')
  }

  const videoFilesPath = req.files?.videoFile[0]?.path
  const thumbnailFilePath = req.files?.thumbnail[0]?.path

  if (!videoFilesPath || !thumbnailFilePath) {
    throw new ApiError(400, 'file & thumbnail is required')
  }

  const videoFile = await uploadOnCloudinary(videoFilesPath)
  const thumbnail = await uploadOnCloudinary(thumbnailFilePath)

  if (!videoFile && !thumbbnail) {
    throw new ApiError(500, 'something went wrong')
  }

  const video = await videoModel.create({
    videoFile: videoFile.url,
    videoFilePublicId: videoFile.public_id,
    thumbnail: thumbnail.url,
    thumbnailPublicId: thumbnail.public_id,
    title: title,
    description: description,
    owner: req.user?._id,
    isPublished: true,
    duration: videoFile.duration
  })

  return res
    .status(201)
    .json(new ApiResponse(
      200,
      video,
      'video published successfully'
    ))
})

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params

  if (!videoId) {
    throw new ApiError(400, 'video ID is required')
  }

  const validVideoID = mongoose.Types.ObjectId.isValid(videoId)

  if (!validVideoID) {
    throw new ApiError(400, 'Invalid videoId')
  }

  const fetchedVideo = await videoModel.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(videoId)
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'owner',
        foreignField: '_id',
        as: 'owner',
        pipeline: [
          {
            $project: {
              _id: 1,
              fullName: 1,
              username: 1,
              email: 1,
              avatar: 1,
              coverImage: 1
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
      $lookup: {
        from: 'subscriptions',
        localField: 'owner._id',
        foreignField: 'channel',
        as: 'totalSubscribers'
      }
    },
    {
      $lookup: {
        from: 'likes',
        localField: '_id',
        foreignField: 'video',
        as: 'totalLikes'
      }
    },
    {
      $addFields: {
        subscribersCount: {
          $size: '$totalSubscribers'
        },
        isSubscribed: {
          $in: [req.user?._id, "$totalSubscribers.subscriber"]
        },
        likesCount: {
          $size: '$totalLikes'
        },
        isLiked:{
          $in: [req.user?._id, "$totalLikes.likedBy"]
        }
      }
    },
    {
      $project: {
        videoFile: 1,
        thumbnail: 1,
        title: 1,
        description: 1,
        isPublished: 1,
        views: 1,
        owner: 1,
        duration: 1,
        createdAt: 1,
        subscribersCount: 1,
        isSubscribed: 1,
        likesCount: 1,
        isLiked:1
      }
    }
  ])

  if (fetchedVideo.length === 0) {
    throw new ApiError(404, 'Video not found')
  }

  await videoModel.findByIdAndUpdate(videoId, {
    $inc: {
      views: 1
    }
  })

  return res
    .status(200)
    .json(new ApiResponse(
      200,
      fetchedVideo[0],
      'video fetched successfully'
    ))
})

const getAllVideo = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query

  const Type = sortType === 'asc' ? 1 : -1
  const sortOption = {
    [sortBy || 'createdAt']: Type
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

  const skip = (pageNumber - 1) * limitNumber

  let conditions = {
    isPublished: true
  }

  if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, 'Invalid userId')
  }

  if (userId) {
    conditions.owner = new mongoose.Types.ObjectId(userId)
  }

  if (query) {
    conditions.$or = [
      {
        title: {
          $regex: query,
          $options: 'i'
        }
      },
      {
        description: {
          $regex: query,
          $options: 'i'
        }
      }
    ]
  }

  const totalVideos = await videoModel.countDocuments(conditions)

  const allVideos = await videoModel.aggregate([
    {
      $match: conditions
    },
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
              avatar: 1,
              coverImage: 1
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
        isPublished: 1,
        views: 1,
        owner: 1,
        duration: 1,
        createdAt: 1
      }
    },
    {
      $sort: sortOption
    },
    {
      $skip: skip
    },
    {
      $limit: limitNumber
    }
  ])

  if (allVideos.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(
        200,
        {
          allVideos: [],
          totalVideos: 0
        },
        'no video found'
      ))
  }

  return res
    .status(200)
    .json(new ApiResponse(
      200,
      {
        allVideos: allVideos,
        totalVideos
      },
      'Videos fetched successfully'
    ))
})

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params
  const { title, description } = req.body
  const thumbnailLocalPAth = req.file?.path

  if (!(title || description || thumbnailLocalPAth)) {
    throw new ApiError(400, 'title ,description or thumbnail is required')
  }

  if (videoId && !mongoose.Types.ObjectId.isValid(videoId)) {
    throw new ApiError(400, 'Invalid videoId')
  }

  let updateField = {}

  if (title) {
    updateField.title = title
  }

  if (description) {
    updateField.description = description
  }

  const video = await videoModel.findById(videoId)

  if (!video) {
    throw new ApiError(404, 'Video not found')
  }

  if (!video.owner.equals(req.user?._id)) {
    throw new ApiError(403, 'User is not authorized')
  }

  let thumbnail;

  if (thumbnailLocalPAth) {
    thumbnail = await uploadOnCloudinary(thumbnailLocalPAth)

    if (!thumbnail) {
      throw new ApiError(500, 'something went wrong')
    }
    await deleteFromCloudinary(video?.thumbnailPublicId)

    updateField.thumbnail = thumbnail.url
  }

  const updatedVideo = await videoModel.findByIdAndUpdate(videoId,
    {
      $set: updateFeild
    },
    {
      returnDocument: 'after'
    }
  )

  return res
    .status(200)
    .json(new ApiResponse(
      200,
      { updatedVideo },
      'video updated successfully'
    ))
})

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params

  if (videoId && !mongoose.Types.ObjectId.isValid(videoId)) {
    throw new ApiError(400, 'Invalid videoId')
  }

  const video = await videoModel.findById(videoId)

  if (!video) {
    throw new ApiError(404, 'Video not found')
  }

  if (!video.owner.equals(req.user?._id)) {
    throw new ApiError(403, 'User is not authorized')
  }

  if (video.thumbnailPublicId) {
    await deleteFromCloudinary(video.thumbnailPublicId)
  }

  if (video.videoFilePublicId) {
    await deleteFromCloudinary(video.videoFilePublicId)
  }

  const deleted = await videoModel.findByIdAndDelete(videoId)

  return res
    .status(200)
    .json(new ApiResponse(
      200,
      {},
      'video deleted successfully'
    ))

})

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params

  if (videoId && !mongoose.Types.ObjectId.isValid(videoId)) {
    throw new ApiError(400, 'Invalid videoId')
  }

  const video = await videoModel.findById(videoId)

  if (!video) {
    throw new ApiError(404, 'Video not found')
  }

  if (!video.owner.equals(req.user?._id)) {
    throw new ApiError(403, 'User is not authorized')
  }

  const updatedVideo = await videoModel.findByIdAndUpdate(videoId, {
    $set: {
      isPublished: !video.isPublished
    }
  },
    {
      returnDocument: 'after'
    })

  if (!updatedVideo) {
    throw new ApiError(500, 'something went wrong')
  }

  return res
    .status(200)
    .json(new ApiResponse(
      200,
      { updatedVideo },
      'video updated successfully'
    ))
})

export { publishVideo, getVideoById, getAllVideo, updateVideo, deleteVideo, togglePublishStatus }