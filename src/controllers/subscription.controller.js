import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from '../utils/ApiResponse.js'
import mongoose from "mongoose"
import { userModel } from "../models/user.model.js"
import { subscriptionModel } from "../models/subscription.model.js"

const toggleSubscription = asyncHandler(async (req, res) => {
    const { channelId } = req.params
    const userId = req.user?._id

    if (!channelId) {
        throw new ApiError(400, 'channelId is required')
    }

    if (!mongoose.Types.ObjectId.isValid(channelId)) {
        throw new ApiError(400, 'Invalid channelId')
    }

       if (req.user._id.equals(channelId)) {
        throw new ApiError(400, 'You cannot subscribe to your own channel')
    }

    const channel = await userModel.findById(channelId)

    if (!channel) {
        throw new ApiError(404, 'channel dont exist')
    }

    const alreadyExist = await subscriptionModel.findOne({
        subscriber: userId,
        channel: channelId
    })

    if (!alreadyExist) {
        await subscriptionModel.create({
            subscriber: userId,
            channel: channelId
        })
    } else {
        await alreadyExist.deleteOne()
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            alreadyExist ? { subscribed: false } : { subscribed: true },
            alreadyExist ? 'Unsubscribed successfully' : 'subscribed successfully'
        ))
})

const getUserChannelSubscribers = asyncHandler(async (req,res) =>{
    const {channelId} = req.params

     if (!channelId) {
        throw new ApiError(400, 'channelId is required')
    }

    if (!mongoose.Types.ObjectId.isValid(channelId)) {
        throw new ApiError(400, 'Invalid channelId')
    }

    const channel = await userModel.findById(channelId)

    if(!channel){
        throw new ApiError(404,'channel not found')
    }

    const subscribers = await subscriptionModel.aggregate([
        {
            $match:{
                channel: new mongoose.Types.ObjectId(channelId)
            }
        },
        {
            $lookup:{
                from:'users',
                localField:'subscriber',
                foreignField:'_id',
                as:'subscriber',
                pipeline:[
                    {
                        $project:{
                            fullName:1,
                            username:1,
                            avatar:1,
                            coverImage:1
                        }
                    }
                ]
            }
        },
        {
            $addFields:{
                subscriber:{
                    $first:'$subscriber'
                }
            }
        },
        {
            $replaceRoot: {
                newRoot: "$subscriber"
            }
        }
    ])

    if(subscribers.length === 0){
        return res.status(200).json(new ApiResponse(200,[],'This channel currently has zero subscribers.'))
    }

    return res
             .status(200)
             .json(new ApiResponse(
                200,
                subscribers,
                'subscribers data fetched'
             ))
})

const getSubscribedChannels = asyncHandler(async (req,res) =>{
    const userId = req.user?._id

    if(!userId){
        throw new ApiError(400,'userId is required')
    }

    const subscribedChannels = await subscriptionModel.aggregate([
        {
            $match:{
                subscriber: userId
            }
        },
        {
            $lookup:{
                from:'users',
                localField:'channel',
                foreignField:'_id',
                as:'channel',
                pipeline:[
                    {
                        $project:{
                            fullName:1,
                            username:1,
                            coverImage:1,
                            avatar:1
                        }
                    }
                ]
            }
        },
        {
            $addFields:{
                channel:{
                    $first:'$channel',
                }
            }
        },
         {
          $lookup:{
            from:'subscriptions',
            localField:'channel._id',
            foreignField:'channel',
            as:'totalSubscribers',         
          }
        },
        {
            $addFields:{
                subscribersCount:{
                    $size:'$totalSubscribers'
                }
            }
        },
        {
            $addFields:{
               'channel.subscribersCount': '$subscribersCount'
            }
        },
        {
            $replaceRoot:{
                newRoot:'$channel'
            }
        }
    ])

    if(subscribedChannels.length === 0){
        return res.status(200).json(new ApiResponse(200,[],'no cahnnel subscribed by you!'))
    }

    return res
            .status(200)
            .json(new ApiResponse(
                200,
                subscribedChannels,
                'subscribed channnel data fetched'
            ))
}) 

export {toggleSubscription,getUserChannelSubscribers,getSubscribedChannels}