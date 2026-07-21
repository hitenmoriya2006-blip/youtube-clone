import express from 'express'
import {userRegistration,
        loginUser,
        logoutUser,
        changeCurrentPassword,
        getCurrentUser,
        updateAccountDetail,
        updateAvatarImage,
        updateCoverImage,
        getChannelDetails,
        getWatchHistory,
        refreshAccessToken,
        removeVideoFromHistory,
        clearWatchHistory
      } from '../controllers/user.controller.js'
import {upload} from '../middlewares/multer.middleware.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.route('/register').post(upload.fields([
   {
     name:'avatar',
     maxCount:1
   },
   {
     name:'coverImage',
     maxCount:1
   }
]),userRegistration)

router.route('/login').post(loginUser)
router.route('/logout').post(authMiddleware,logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route('/change-password').patch(authMiddleware,changeCurrentPassword)
router.route('/current-user').get(authMiddleware,getCurrentUser)
router.route('/update-account').patch(authMiddleware,updateAccountDetail)
router.route('/avatar').patch(authMiddleware,upload.single('avatar'),updateAvatarImage)
router.route('/cover-image').patch(authMiddleware,upload.single('coverImage'),updateCoverImage)
router.route('/channel/:username').get(authMiddleware,getChannelDetails)
router.route('/history').get(authMiddleware,getWatchHistory)
router.route('/history/remove/:videoId').delete(authMiddleware,removeVideoFromHistory)
router.route('/history/clear').delete(authMiddleware,clearWatchHistory)

export default router