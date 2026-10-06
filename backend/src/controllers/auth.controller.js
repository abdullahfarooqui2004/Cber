import {createUser} from "../services/user.service.js" 
import userModel from "../models/user.model.js"
import {validationResult} from "express-validator"

export const test = (req, res) => {
    res.send("Working")
}

export const register = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {fullname, email, password} = req.body;

    const hashedPassword = await userModel.hashPassword(password)

    const user = await createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    })
 
    const token = user.generateAuthToken();

    return res.status(201).json({token, user})
    
}