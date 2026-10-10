import {validationResult} from "express-validator"
import createCaptain from "../services/captain.service.js"
import CaptainModel from "../models/captain.model.js";
import BlackListModel from '../models/blacklistToken.model.js'

export const test = (req, res) => {
    return res.status(200).json({message: "test"})
}

export const register = async (req, res) =>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({errors : error.array()})
    }

    const {fullname, email, password, vehicle} = req.body;

    const alreadyExists = await CaptainModel.findOne({email})
    if(alreadyExists){
        return res.status(409).json({message: "Email already exists"})
    }
    
    const hashedPassword = await CaptainModel.hashPassword(password);

    const captain = await createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    })

    const token = captain.generateAuthToken();

    res.cookie('token', token)

    return res.status(201).json({
        token,
        captain: {
            fullname: captain.fullname,
            email: captain.email,
            vehicle: captain.vehicle
        }
    })
}

export const login = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }


    const {email, password} = req.body;

    const captain = await CaptainModel.findOne({email}).select('+password')

    if(!captain){
        return res.status(401).json({
            message: "Invalid email or password"
        })
    }

    const isMatched = await captain.comparePassword(password);

    if(!isMatched){
        return res.status(401).json({
            message: "Invalid email or password"
        })
    }

    const token = captain.generateAuthToken(); 

    res.cookie('token', token)


    return res.status(200).json({
        token,
        captain: {
            fullname: captain.fullname,
            email: captain.email,
            vehicle: captain.vehicle
        }
    })
}

export const logout = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    await BlackListModel.create({token})

    res.clearCookie("token")

    return res.status(200).json({
        message: "Logged Out"
    })
}

export const profile = (req, res) => {
    return res.status(200).json({
        captain : req.captain
    })
}