import { Server } from 'socket.io'
import { config } from 'dotenv'
config()
import { createServer } from "http"
import express from 'express'

const app = express()

const server = createServer(app)

const io = new Server(server, {
    cors: {
        origin: "https://rushchat.netlify.app",
        
    }
})


// used to store online user

const userSocketMap = {}


export function getRecieverSocketId(userId) {
    return userSocketMap[userId]
}

io.on("connection", (socket) => {
    // console.log(`A user connected : ${socket.id}`)
    const userId = socket.handshake.query.userId
  
    if (userId) userSocketMap[userId] = socket.id
      
    io.emit("getOnlineUsers",Object.keys(userSocketMap))



    socket.on("disconnect", () => {
        // console.log(`A user Disconnected ${socket.id}`)

  
        delete userSocketMap[userId];

        io.emit('getOnlineUsers', Object.keys(userSocketMap))
     

    })
})

export {server,io,app}