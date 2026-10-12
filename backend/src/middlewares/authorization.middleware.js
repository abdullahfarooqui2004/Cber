import userModel from '../models/user.model.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import configEnv from '../config/config.js'
import BlackListModel from '../models/blacklistToken.model.js';
import CaptainModel from '../models/captain.model.js';

const extractToken = (req) => {
    const cookieToken = req.cookies?.token;
    if (cookieToken) return cookieToken;

    const authHeader = req.headers?.authorization;
    if (typeof authHeader !== 'string') return null;

    const [scheme, token] = authHeader.split(' ');
    if (scheme === 'Bearer' && token) return token;

    return null;
};

export const authUser = async (req, res, next) => {
    const token = extractToken(req);

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    const isBlacklisted = await BlackListModel.findOne({ token })

    if (isBlacklisted) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    try {
        const decoded = jwt.verify(token, configEnv.JWT_SECRET)

        const user = await userModel.findById(decoded._id)

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        req.user = user;

        return next()
    } catch (e) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
}

export const authCaptain = async (req, res, next) => {
    const token = extractToken(req);
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    const isBlacklisted = await BlackListModel.findOne({ token })

    if (isBlacklisted) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    try {
        const decoded = jwt.verify(token, configEnv.JWT_SECRET)
        const captain = await CaptainModel.findById(decoded._id)

        if (!captain) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        req.captain = captain
        return next();
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
}