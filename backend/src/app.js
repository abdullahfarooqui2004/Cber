import express from "express"
import dotenv from 'dotenv'
import cors from "cors"
import authRouter from "./routes/auth.route.js";

dotenv.config();

const app = express()
app.use(cors())
app.use(express.json())

app.use("/auth", authRouter)

export default app