import {createUser} from "../services/user.service.js" 
import userModel from "../models/user.model.js"
import {validationResult} from "express-validator"
import BlackListModel from "../models/blacklistToken.model.js"

export const test = (req, res) => {
    res.send("Working")
}

export const register = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {fullname, email, password} = req.body;

    const alreadyExists = await userModel.findOne({email})
    if(alreadyExists){
        return res.status(409).json({message: "Email already exists"})
    }

    const hashedPassword = await userModel.hashPassword(password)

    const user = await createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    })
 
    const token = user.generateAuthToken();

    res.cookie('token', token);

    return res.status(201).json({token, user: {
        fullname: user.fullname,
        email: user.email
    }})
    
}

export const login = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }


    const {email, password} = req.body;

    const user = await userModel.findOne({email}).select('+password')

    if(!user){
        return res.status(401).json({
            message: "Invalid email or password"
        })
    }

    const isMatched = await user.comparePassword(password);

    if(!isMatched){
        return res.status(401).json({
            message: "Invalid email or password"
        })
    }

    const token = user.generateAuthToken(); 

    res.cookie('token', token)


    return res.status(200).json({
        token,
        user: {
        fullname: user.fullname,
        email: user.email,
        }
    })
}

export const profile = async (req, res) => {
    return res.status(200).json(req.user)
}

export const logout = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    await BlackListModel.create({token})

    res.clearCookie("token")

    return res.status(200).json({
        message: "Logged Out"
    })
}