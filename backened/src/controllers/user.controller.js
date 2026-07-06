import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from '../utils/ApiResponse.js'
import { deleteFromCloudinary, uploadOnCloudinary } from "../services/storage.js"
import { userModel } from "../models/user.model.js"
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

const generateAccessandRefreshToken = async (userId) => {
   try {
      const user = await userModel.findById(userId)
      const accessToken = await user.generateAccessToken()
      const refreshToken = await user.generateRefreshToken()

      user.refreshToken = refreshToken
      user.save({
         validateBeforeSave: false
      })

      return { accessToken, refreshToken }

   } catch (error) {
      throw new ApiError(500, 'Something went wrong while generate Tokens')
   }
}

const userRegistration = asyncHandler(async (req, res) => {
   const { fullName, username, password, email } = req.body

   if ([fullName, username, email, password].some(feild => feild.trim() === '')) {
      throw new ApiError(400, 'All feild are required')
   }

   const existedUser = await userModel.findOne({
      $or: [
         { username },
         { email }
      ]
   })

   if (existedUser) {
      throw new ApiError(409, 'User already Existed')
   }

   const avatarLocalPath = req.files?.avatar[0]?.path

   let coverImageLocalPath;
   if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
      coverImageLocalPath = req.files.coverImage[0].path
   }

   if (!avatarLocalPath) {
      throw new ApiError(400, 'avatar is required')
   }

   const avatar = await uploadOnCloudinary(avatarLocalPath)
   const coverImage = await uploadOnCloudinary(coverImageLocalPath)

   if (!avatar) {
      throw new ApiError(500, 'Something went wrong')
   }

   const createdUser = await userModel.create({
      avatar: avatar.url,
      avatarPublicID: avatar.public_id,
      coverImage: coverImage?.url || '',
      coverImagePublicID: coverImage?.public_id || '',
      fullName,
      username: username.toLowerCase(),
      email,
      password
   })

   const user = await userModel.findById(createdUser._id).select('-password -refreshToken')

   if (!user) {
      throw new ApiError(500, 'Something went wrong')
   }

   res.status(201).json(
      new ApiResponse(200, 'User register successfullly', createdUser,)
   )

})

const loginUser = asyncHandler(async (req, res) => {
   console.log(req.body);

   const { login, password } = req.body;

   
   

   if (!login) {
      throw new ApiError(400, "Username or email is required");
   }

   const user = await userModel.findOne({
      $or: [
         { username: login },
         { email: login }
      ]
   });

   if (!user) {
      throw new ApiError(401, 'user not exist')
   }

   const isPasswordValid = await user.isPasswordCorrect(password)

   if (!isPasswordValid) {
      throw new ApiError(404, 'invalid  credentials')
   }

   const { accessToken, refreshToken } = await generateAccessandRefreshToken(user._id)

   const loggedinUser = await userModel.findById(user._id).select('-password -refreshToken')

   const options = {
      httpOnly: true,
      secure: true
   }

   res
      .status(200)
      .cookie('accessToken', accessToken, options)
      .cookie('refreshToken', refreshToken, options)
      .json(
         new ApiResponse(
            200,
            {
               user: loggedinUser
            },
            'user loggged in successfully'
         )
      )

})

const logoutUser = asyncHandler(async (req, res) => {
   await userModel.findByIdAndUpdate(req.user._id,
      {
         $unset: {
            refreshToken: 1
         }
      },
      {
         returnDocument: 'after'
      }
   )

   const options = {
      httpOnly: true,
      secure: true
   }

   res
      .status(201)
      .clearCookie('accessToken', options)
      .clearCookie('refreshToken', options)
      .json(new ApiResponse(200, {}, 'user logged out'))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
   const incomingRefreshTOken = req.cookies.refreshToken || req.body.refreshToken

   if (!incomingRefreshTOken) {
      throw new ApiError(401, "unauthorized request")
   }

   try {
      const decodedToken = await jwt.verify(incomingRefreshTOken, process.env.REFRESH_TOKEN_SECRET)

      const user = await userModel.findById(decodedToken._id)

      if (!user) {
         throw new ApiError(401, "invalid or expired token")
      }

      if (incomingRefreshTOken !== user?.refreshToken) {
         throw new ApiError(401, "refresh token is expired or used")
      }

      const { accessToken, newRefreshToken } = generateAccessandRefreshToken(user._id)

      const options = {
         httpOnly: true,
         secure: true
      }

      res
         .status(200)
         .cookie('accessToken', accessToken, options)
         .cookie('refreshToken', refreshToken, options)
         .json(
            new ApiResponse(200, {
               accessToken, refreshToken: newRefreshToken
            },
               "Access token refreshed"
            )
         )

   } catch (error) {
      throw new ApiError(401, error?.message || 'invalid refresh token')
   }
})

const changeCurrentPassword = asyncHandler(async (req, res) => {

   const { oldPassword, newPassword } = req.body

   const user = await userModel.findById(req.user?._id)
   const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

   if (!isPasswordCorrect) {
      throw new ApiError(400, 'invalid password')
   }

   user.password = newPassword
   await user.save({ validateBeforeSave: false })

   return res
      .status(200)
      .json(new ApiResponse(200, {}, 'password  change successfully'))
})

const getCurrentUser = asyncHandler(async (req, res) => {
   const user = await userModel.findById(req.user?._id)

   if (!user) {
      throw new ApiError(400, 'unauthorized request')
   }

   return res
      .status(200)
      .json(new ApiResponse(
         200,
         {
            user: user
         },
         'User fetched successfully'
      ))
})

const updateAccountDetail = asyncHandler(async (req, res) => {

   const { fullName, email } = req.body

   const user = await userModel.findByIdAndUpdate(
      req.user?._id,
      {
         $set: {
            fullName,
            email
         }
      },
      {
         returnDocument: 'after'
      }
   ).select('-password')

   return res
      .status(200)
      .json(new ApiResponse(
         200,
         { user },
         'Account detail successfully'
      ))
})

const updateAvatarImage = asyncHandler(async (req, res) => {

   const avatarLocalPath = req.file?.path

   if (!avatarLocalPath) {
      throw new ApiError(400, 'avatar is required')
   }

   let user;
   user = await userModel.findById(req.user?._id)

   if (!user) {
      throw new ApiError(500, 'something went wrong')
   }

   const avatar = await uploadOnCloudinary(avatarLocalPath)

   if (!avatar?.url) {
      throw new ApiError(500, 'something went wrong')
   }

   await deleteFromCloudinary(user?.avatarPublicID)

   user = await userModel.findByIdAndUpdate(
      req.user?._id,
      {
         $set: {
            avatar: avatar.url,
            avatarPublicID: avatar.public_id
         }
      },
      {
         returnDocument: 'after'
      }
   ).select('-password')

   return res
      .status(200)
      .json(new ApiResponse(
         200,
         { user },
         'Avatar updated successfully'
      ))
})

const updateCoverImage = asyncHandler(async (req, res) => {

   const coverImageLocalPath = req.file.path

   if (!coverImageLocalPath) {
      throw new ApiError(400, 'cover image is required')
   }

   let user;
   user = await userModel.findById(req.user?._id)

   const coverImage = await uploadOnCloudinary(coverImageLocalPath)

   if (!coverImage?.url) {
      throw new ApiError(500, 'something went wrong')
   }

   user = await userModel.findByIdAndUpdate(
      req.user?._id,
      {
         $set: {
            coverImage: coverImage.url,
            coverImagePublicID: coverImage.public_id
         }
      },
      {
         returnDocument: 'after'
      }
   ).select('-password')

   return res
      .status(200)
      .json(new ApiResponse(
         200,
         { user },
         'coverImage updated successfully'
      ))
})

const getChannelDetails = asyncHandler(async (req, res) => {
   const { username } = req.params

   if (!username?.trim()) {
      throw new ApiError(400, 'username is missing!')
   }

   console.log("req.user =", req.user);

   const channel = await userModel.aggregate([
      {
         $match: {
            username: username.toLowerCase()
         }
      },
      {
         $lookup: {
            from: 'subscriptions',
            localField: '_id',
            foreignField: 'channel',
            as: 'subscribers'
         }
      },
      {
         $lookup: {
            from: 'subscriptions',
            localField: '_id',
            foreignField: 'subscriber',
            as: 'subscribedTo'
         }
      },
      {
         $addFields: {
            subscribersCount: {
               $size: '$subscribers',
            },
            channelsSubscribedToCount: {
               $size: '$subscribedTo'
            },
            isSubscribed: {
               $cond: {
                  if: { $in: [req.user?._id, '$subscribers.subscriber'] },
                  then: true,
                  else: false
               }
            }
         }
      },
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
            watchHistory: 1
         }
      }
   ])

   if (!channel?.length) {
      throw new ApiError(404, 'channel doesnot exists')
   }

   return res
      .status(200)
      .json(new ApiResponse(
         200,
         channel[0],
         'fetched successfully'
      ))
})

const getWatchHistory = asyncHandler(async (req, res) => {
   const user = await userModel.aggregate([
      {
         $match: {
            _id: new mongoose.Types.ObjectId(req.user?._id)
         }
      },
      {
         $lookup: {
            from: "videos",
            localField: "watchHistory",
            foreignField: "_id",
            as: "watchHistory",
            pipeline: [
               {
                  $lookup: {
                     from: "users",
                     localField: "owner",
                     foreignField: "_id",
                     as: "owner",
                     pipeline: [
                        {
                           $project: {
                              fullName: 1,
                              username: 1,
                              avatar: 1
                           }
                        }
                     ]
                  }
               },
               {
                  $addFields: {
                     owner: {
                        $first: "$owner"
                     }
                  }
               }
            ]
         }
      }
   ])

   return res.status(200).json(
      new ApiResponse(
         200,
         user[0].watchHistory,
         "Watch history fetched successfully"
      )
   )
})

export {
   userRegistration,
   loginUser,
   logoutUser,
   refreshAccessToken,
   getCurrentUser,
   updateAccountDetail,
   changeCurrentPassword,
   updateAvatarImage,
   updateCoverImage,
   getChannelDetails,
   getWatchHistory
}