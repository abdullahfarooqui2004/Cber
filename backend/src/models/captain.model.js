import mongoose from "mongoose"
import configEnv from '../config/config.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const schema = new mongoose.Schema({
	fullname: {
		firstname: {
			type: String,
			required: true,
			minlength: [3, "First Name must be atleast 3 characters long"],
		},
		lastname: {
			type: String,
			required: true,
			minlength: [3, "Last Name must be atleast 3 characters long"],
		},
	},
	email: {
		type: String,
		required: true,
		unique: true,
		minlength: [5, "Email must be atleast 5 char long"],
	},
	password: {
		type: String,
		required: true,
		select: false,
	},
	socketId: {
		type: String,
	},
    status: {
        type: String,
        enum: ['active','inactive'],
        default: 'inactive'

    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, "Color must be atleast 3 char long"]
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, "Color must be atleast 3 char long"]
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Capacity must be atleast 1']
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'bike', 'auto'],
        }
    },
    location: {
        lat: {
            type: Number
        },
        lon: {
            type: Number
        }
    }

    
})

schema.methods.generateAuthToken = function () {
    const token = jwt.sign({
        _id: this._id
    }, configEnv.JWT_SECRET, {expiresIn: "1d"})

    return token
}

schema.methods.comparePassword =async function(password){
    return await bcrypt.compare(password, this.password)
}

schema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10)
}

const CaptainModel = mongoose.model("CaptainModel", schema)
export default CaptainModel;