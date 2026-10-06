import {Router} from 'express'
import {userRegisterValidationRules, userLoginValidationRules} from  '../middlewares/validationRules.middleware.js'
import * as authController from '../controllers/auth.controller.js'
import {authUser} from "../middlewares/authorization.middleware.js"

const authRouter = Router()

authRouter.get("/", authController.test)
authRouter.post("/register", userRegisterValidationRules, authController.register)
authRouter.post("/login", userLoginValidationRules, authController.login)
authRouter.post("/logout", authUser, authController.logout)

authRouter.get("/profile",authUser, authController.profile);

export default authRouter