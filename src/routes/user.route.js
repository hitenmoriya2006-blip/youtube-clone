import express from 'express'
import {userRegistration, loginUser,logoutUser} from '../controllers/user.controller.js'
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

export default router