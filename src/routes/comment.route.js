import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import {addComment,
        updateComment,
        deleteComment,
        getVideoComments
} from '../controllers/comment.controller.js'

const router = express.Router()

router.route('/add/:videoId').post(authMiddleware,addComment)
router.route('/update/:commmentId').patch(authMiddleware,updateComment)
router.route('/delete/:commentId').delete(authMiddleware,deleteComment)
router.route('/get-comments/:videoId').get(authMiddleware,getVideoComments)

export default router