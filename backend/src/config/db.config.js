import mongoose from "mongoose";
import configEnv from "./config.js";

async function connectDb() {
	try {
		await mongoose.connect(configEnv.MONGODB_URI);
		console.log("Database connected");
	} catch (error) {
		console.log(error);
	}
}

export default connectDb;
