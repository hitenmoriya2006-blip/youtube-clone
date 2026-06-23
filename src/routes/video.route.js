import express from 'express'
import {upload} from '../middlewares/multer.middleware.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { publishVideo,getVideoById } from '../controllers/video.controller.js'

const router = express.Router()

router.route('/publish').post(upload.fields([
    {
        name:'videoFile',
        maxCount:1
    },
    {
        name:'thumbnail',
        maxCount:1
    }
]),authMiddleware,publishVideo)
router.route('/get/:videoID').get(getVideoById)

export default  router