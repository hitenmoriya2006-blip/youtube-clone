import mongoose from "mongoose";
import { videoModel } from "../models/video.model.js";
import { playlistModel } from "../models/playlist.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createPlaylist = asyncHandler(async (req, res) => {
    const { name, description } = req.body
    const userId = req.user?._id
    const { videoId } = req.params

    console.log(name);


    if (!name) {
        throw new ApiError(400, 'name is required')
    }

    const trimmedName = name.trim()

    if (trimmedName === '') {
        throw new ApiError(400, 'invalid name')
    }


    if (videoId) {
        if (!(mongoose.Types.ObjectId.isValid(videoId))) {
            throw new ApiError(400, 'Invalid videoId')
        }
    }

    if (!userId) {
        throw new ApiError(400, 'user id is required')
    }

    const playlist = await playlistModel.create({
        name: trimmedName,
        description: description ,
        owner: userId,
        videos: videoId ? [
            new mongoose.Types.ObjectId(videoId)
        ] : []
    })

    if (!playlist) {
        throw new ApiError(400, 'playlist not created')
    }

    return res
        .status(201)
        .json(new ApiResponse(
            201,
            playlist,
            'playlist created successfully'
        ))
})

const getUserPlaylists = asyncHandler(async (req, res) => {
    const userId = req.user?._id

    if (!userId) {
        throw new ApiError(400, 'user id is required')
    }

    const playList = await playlistModel.find({
        owner: userId
    })

    console.log(playList);


    if (playList.length === 0) {
        return res
            .status(200)
            .json(new ApiResponse(
                200,
                [],
                'no playlist found'
            ))
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            playList,
            'playlist fetched successfully'
        ))
})

const getPlaylistById = asyncHandler(async (req, res) => {
    const { playlistId } = req.params

    if (!playlistId) {
        throw new ApiError(400, 'playlist id is required')
    }

    if (!(mongoose.Types.ObjectId.isValid(playlistId))) {
        throw new ApiError(400, 'invalid playlist id')
    }

    const playlist = await playlistModel.findById(playlistId).populate({
        path: 'videos',
        select: "title thumbnail duration views owner",
        populate: {
            path: "owner",
            select: "fullName username avatar"
        }
    })

    if (!playlist) {
        throw new ApiError(404, 'playlist not found')
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            playlist,
            'playlist fetched successfully'
        ))
})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params
    const userId = req.user?._id

    if (!userId) {
        throw new ApiError(403, 'unauthorized request')
    }

    if (!(playlistId && videoId)) {
        throw new ApiError(400, 'playlist & video id is required')
    }

    if (!(mongoose.Types.ObjectId.isValid(playlistId) &&
        mongoose.Types.ObjectId.isValid(videoId)
    )) {
        throw new ApiError(400, 'invalid id')
    }

    const isVideoExist = await videoModel.findById(videoId)

    if (!isVideoExist) {
        throw new ApiError(404, 'video not found')
    }

    const isPlaylistExist = await playlistModel.findById(playlistId)

    if (!isPlaylistExist) {
        throw new ApiError(404, 'playlist not found')
    }

    if (!(userId.equals(isPlaylistExist.owner))) {
        throw new ApiError(403, `user dont have authorization`)
    }

    const newPlaylist = await playlistModel.findByIdAndUpdate(
        playlistId,
        {
            $addToSet: {
                videos: new mongoose.Types.ObjectId(videoId)
            }
        },
        {
            new: true
        }
    )

    if (!newPlaylist) {
        throw new ApiError(400, 'something went wrong')
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            newPlaylist,
            'video added successfully'
        ))
})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params
    const userId = req.user?._id

    if (!userId) {
        throw new ApiError(403, 'unauthorized request')
    }

    if (!(playlistId && videoId)) {
        throw new ApiError(400, 'playlist & video id is required')
    }

    if (!(mongoose.Types.ObjectId.isValid(playlistId) &&
        mongoose.Types.ObjectId.isValid(videoId)
    )) {
        throw new ApiError(400, 'invalid id')
    }

    const isPlaylistExist = await playlistModel.findById(playlistId)

    if (!isPlaylistExist) {
        throw new ApiError(404, 'playlist not found')
    }

    if (!(userId.equals(isPlaylistExist.owner))) {
        throw new ApiError(403, `user don't have authorization`)
    }

    const updatedPlaylist = await playlistModel.findByIdAndUpdate(
        playlistId,
        {
            $pull: {
                videos: new mongoose.Types.ObjectId(videoId)
            }
        },
        {
            new: true
        }
    )

    if (!updatedPlaylist) {
        throw new ApiError(400, 'something went wrong')
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            updatedPlaylist,
            'video removed from playlist'
        ))
})

const deletePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params
    const userId = req.user?._id

    if (!userId) {
        throw new ApiError(403, 'unauthorized request')
    }

    if (!playlistId) {
        throw new ApiError(400, 'playlist id is required')
    }

    if (!(mongoose.Types.ObjectId.isValid(playlistId))) {
        throw new ApiError(400, 'invalid playlist id')
    }

    const deleted = await playlistModel.findOneAndDelete({
        _id: playlistId,
        owner: userId
    })

    if (deleted === null) {
        throw new ApiError(404, 'playlist not found or unauthorized')
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            {},
            'playlist deleted successfully'
        ))
})

const updatePlaylist = asyncHandler(async (req, res) => {
    const { name, description } = req.body
    const { playlistId } = req.params
    const userId = req.user?._id

    if (!userId) {
        throw new ApiError(403, 'unauthorized request')
    }

    if (!(name || description)) {
        throw new ApiError(400, 'name or description is required')
    }

    const trimmedName = name?.trim();
    const trimmedDescription = description?.trim();

    if (name && trimmedName === '') {
        throw new ApiError(400, 'invalid name')
    }

    if (description && trimmedDescription === '') {
        throw new ApiError(400, 'invalid description')
    }

    const updateFields = {}

    if (trimmedName) {
        updateFields.name = trimmedName
    }

    if (trimmedDescription) {
        updateFields.description = trimmedDescription
    }


    if (!playlistId) {
        throw new ApiError(400, 'playlist id is required')
    }

    if (!(mongoose.Types.ObjectId.isValid(playlistId))) {
        throw new ApiError(400, 'invalid playlist id')
    }

    const updatedPlaylist = await playlistModel.findOneAndUpdate({
        _id: playlistId,
        owner: userId
    },
        {
            $set: updateFields
        },
        {
            new: true
        })

    if (updatedPlaylist === null) {
        throw new ApiError(403, 'playlist not found or unauthorized')
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            updatedPlaylist,
            'playlist updated successfully'
        ))
})

export {
    createPlaylist,
    getPlaylistById, getUserPlaylists,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    updatePlaylist,
    deletePlaylist
}