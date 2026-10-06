import express from "express"
import dotenv from 'dotenv'
import cors from "cors"
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser"

dotenv.config();

const app = express()
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/auth", authRouter)

export default app