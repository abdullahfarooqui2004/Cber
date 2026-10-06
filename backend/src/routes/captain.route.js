import {Router} from 'express'
import * as captainController from "../controllers/captain.controller.js"
import { captainRegisterValidationRules, userLoginValidationRules } from '../middlewares/validationRules.middleware.js';
import { authCaptain } from '../middlewares/authorization.middleware.js';



const captainRouter = Router();

captainRouter.get("/", captainController.test);
captainRouter.post("/register", captainRegisterValidationRules, captainController.register);
captainRouter.post("/login", userLoginValidationRules, captainController.login);
captainRouter.post("/logout", authCaptain, captainController.logout);

captainRouter.get("/profile", authCaptain, captainController.profile)

export default captainRouter;