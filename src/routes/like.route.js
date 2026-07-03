import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import {getLikedVideo,
        toggleCommentLike,
        toggleVideoLike
       } 
        from '../controllers/like.controller.js'


const router = express.Router()

router.route('/liked-video').get(getLikedVideo)
router.route('/toggle/:videoId').patch(authMiddleware,toggleVideoLike)
router.route('/toggle/:commentId').patch(authMiddleware,toggleCommentLike)


export default router