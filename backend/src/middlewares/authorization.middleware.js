import userModel from '../models/user.model.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import configEnv from '../config/config.js'
import BlackListModel from '../models/blacklistToken.model.js';

export const authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];

    if(!token){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    const isBlacklisted = await BlackListModel.findOne({token})

    if(isBlacklisted){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    try{
        const decoded = jwt.verify(token,configEnv.JWT_SECRET)

        const user = await userModel.findById(decoded._id)

        req.user = user;

        return next()
    }
    catch(e){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

}
