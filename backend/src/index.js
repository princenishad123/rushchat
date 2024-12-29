import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import path from "path"
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import { connectDB } from "./lib/db.js"
dotenv.config()
import { app, server, io } from "./lib/socket.js"



const PORT = process.env.PORT || 3001
const __dirname = path.resolve()
app.use(cors({
    origin: process.env.ORIGIN_URL,
    credentials:true
}))
app.use(express.json({ limit: '50mb' })); // Increase JSON payload limit
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cookieParser())
app.use(express.json())


app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/messages", messageRoutes)


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))
    
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}


app.get("/", (req, res) => {
    return res.send("Welcome")
})


server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`),
        connectDB()
})

