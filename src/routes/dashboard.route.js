import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import {
    getChannelStats,
    getChannelVideos
} from '../controllers/dashboard.controller.js'

const router = express.Router()

router.route('/c/stats').get(authMiddleware,getChannelStats)
router.route('/c/all-videos').get(authMiddleware,getChannelVideos)

export default router