import {Router} from 'express'
import registerValidationRules from '../middlewares/validationRules.middleware.js'
import * as authController from '../controllers/auth.controller.js'

const authRouter = Router()

authRouter.get("/", authController.test)
authRouter.post("/register", registerValidationRules, authController.register)

export default authRouter