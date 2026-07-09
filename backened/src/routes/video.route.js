import express from 'express'
import {upload} from '../middlewares/multer.middleware.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { publishVideo,getVideoById,getAllVideo,updateVideo,deleteVideo,togglePublishStatus } from '../controllers/video.controller.js'

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
router.route('/get/:videoId').get(authMiddleware,getVideoById)
router.route('/get-all').get(getAllVideo)
router.route('/update/:videoId').patch(authMiddleware,upload.single('thumbnail'),updateVideo)
router.route('/delete/:videoId').delete(authMiddleware,deleteVideo)
router.route('/toggle/:videoId').patch(authMiddleware,togglePublishStatus)

export default  router