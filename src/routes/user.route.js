import express from 'express'
import {userRegistration} from '../controllers/user.controller.js'

const router = express.Router()

router.route('/register').post(userRegistration)

export default router