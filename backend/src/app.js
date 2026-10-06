import express from "express"
import dotenv from 'dotenv'
import cors from "cors"
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser"
import captainRouter from "./routes/captain.route.js";

dotenv.config();

const app = express()
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/user", authRouter)
app.use("/api/captain", captainRouter)

export default app