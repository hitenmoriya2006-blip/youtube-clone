import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import {getLikedVideo,
        toggleCommentLike,
        toggleVideoLike,
        toggleTweetLike} 
        from '../controllers/like.controller.js'


const router = express.Router()

router.route('/liked-video').get(getLikedVideo)
router.route('/toggle/:videoId').patch(authMiddleware,toggleVideoLike)
router.route('/toggle/:commentId').patch(authMiddleware,toggleCommentLike)
router.route('/toggle/:tweetId').patch(authMiddleware,toggleTweetLike)

export default router