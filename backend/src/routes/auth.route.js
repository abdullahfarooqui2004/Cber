import {Router} from 'express'
import {rules} from  '../middlewares/validationRules.middleware.js'
import * as authController from '../controllers/auth.controller.js'

const authRouter = Router()

authRouter.get("/", authController.test)
authRouter.post("/register", rules.registerValidationRules, authController.register)

export default authRouter