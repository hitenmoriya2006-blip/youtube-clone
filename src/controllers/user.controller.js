import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from '../utils/ApiResponse.js'
import { uploadOnCloudinary } from "../services/storage.js"
import { userModel } from "../models/user.model.js"
import { log } from "console"
import { json } from "stream/consumers"
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"

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



   console.log(req.files);


   if (!avatarLocalPath) {
      throw new ApiError(400, 'avatar is required')
   }

   const avatar = await uploadOnCloudinary(avatarLocalPath)
   const coverImage = await uploadOnCloudinary(coverImageLocalPath)
   console.log(`image ${coverImage}`);



   if (!avatar) {
      throw new ApiError(500, 'Something went wrong')
   }

   const createdUser = await userModel.create({
      avatar: avatar.url,
      coverImage: coverImage?.url || '',
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

   const { username, email, password } = req.body

   if (!username && !email) {
      throw new ApiError(404, 'username or email is required')
   }

   const user = await userModel.findOne({
      $or: [
         { username },
         { email }
      ]
   })

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
         $set: {
            refreshToken: undefined
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
      .cookie('accessToken',accessToken,options)
      .cookie('refreshToken',refreshToken,options)
      .json(
         new ApiResponse(200,{
            accessToken,refreshToken:newRefreshToken
         },
         "Access token refreshed"
      )
      )

   } catch (error) {
      throw new ApiError(401,error?.message || 'invalid refresh token')
   }
})

export { userRegistration, loginUser, logoutUser }