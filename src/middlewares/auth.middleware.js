import jwt from 'jsonwebtoken'
import { userModel } from '../models/user.model.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'

export const authMiddleware = asyncHandler(async (req,_,next) =>{
    try {
         const token = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer','')
         console.log(`token ${token}`);
         

     if(!token){
         throw new ApiError(401,'unauthorized request')
     }

     const decoded = await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

     const user = await  userModel.findById(decoded._id).select("-password -refreshToken")

     if(!user){
        throw new ApiError(401,'invalid access token')
     }

     req.user = user
     next()
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid access token")
    }
})



