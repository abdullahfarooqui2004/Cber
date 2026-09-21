import {Router} from 'express'
import * as authController from '../controllers/auth.controller.js'

const authRouter = Router()

authRouter.get("/", authController.test)

export default authRouter