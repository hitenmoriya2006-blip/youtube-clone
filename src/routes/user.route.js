import express from 'express'
import {userRegistration} from '../controllers/user.controller.js'
import {upload} from '../middlewares/multer.middleware.js'

const router = express.Router()

router.route('/register').post(upload.fields([
   {
     name:'avatar',
     maxCount:1
   },
   {
     name:'imageCover',
     maxCount:1
   }
]),userRegistration)

export default router