import {Router} from 'express'
import {registerValidationRules, loginValidationRules} from  '../middlewares/validationRules.middleware.js'
import * as authController from '../controllers/auth.controller.js'
import {authUser} from "../middlewares/authorization.middleware.js"

const authRouter = Router()

authRouter.get("/", authController.test)
authRouter.post("/register", registerValidationRules, authController.register)
authRouter.post("/login", loginValidationRules, authController.login)
authRouter.post("/logout", authUser, authController.logout)

authRouter.get("/profile",authUser, authController.profile);

export default authRouter