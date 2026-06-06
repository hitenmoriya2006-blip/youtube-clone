import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import {ApiResponse} from '../utils/ApiResponse.js'
import { uploadOnCloudinary } from "../services/storage.js"
import { userModel } from "../models/user.model.js"

const userRegistration = asyncHandler(async (req,res) =>{
   const {fullName,username,password,email} = req.body

   if([fullName,username,email,password].some(feild => feild.trim() === '')){
      throw new ApiError(400,'All feild are required')
   }

   const existedUser = await userModel.findOne({
      $or: [
         {username},
         {email}
      ]
   })

   if(existedUser){
      throw new ApiError(409,'User already Existed')
   }

   const avatarLocalPath = req.file?.avatar[0]?.path 
   const coverImageLocalPath = req.file?.coverImage[0]?.path

   if(!avatarLocalPath){
      throw new ApiError(400,'avatar is reuquired')
   }

   const avatar = await uploadOnCloudinary(avatarLocalPath)
   const coverImage = await uploadOnCloudinary(coverImageLocalPath)

   if(!avatar){
      throw new ApiError(500,'Something went wrong')
   }

   const createdUser = await userModel.create({
      avatar:avatar.url,
      coverImage:coverImage.url || '',
      fullName,
      username:username.toLowerCase(),
      email,
      password
   })

   const user = await userModel.findById(createdUser._id).select('-password -refreshToken')

   if(!user){
      throw new ApiError(500,'Something went wrong')
   }

   res.status(201).json(
      new ApiResponse(200,message='User register successfullly',createdUser,)
   )

})

export {userRegistration}