import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import configEnv from "../config/config.js"

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
});

schema.methods.generateAuthToken = function () {
	const token = jwt.sign(
		{
			_id: this._id,
		},
		configEnv.JWT_SECRET,
	);
    return token;
};

schema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

schema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10)
}


const userModel = mongoose.model("user", schema)
export default userModel;