import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import {toggleSubscription,
        getUserChannelSubscribers,
        getSubscribedChannels
} from '../controllers/subscription.controller.js'

const router = express.Router()

router.route('/toggleSub/:channelId').patch(authMiddleware,toggleSubscription)
router.route('/c/subscribers/:channelId').get(getUserChannelSubscribers)
router.route('/c/subscribed/').get(authMiddleware,getSubscribedChannels)

export default router