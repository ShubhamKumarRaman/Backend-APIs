require('dotenv').config();
const http = require('http')
const { Server } = require('socket.io')

const app = require('./app')
const connectDB = require('./config/db')
const pollSocket = require('./sockets/pollSocket')

connectDB();

const server = http.createServer(app);

//Socket.io setup
const io = new Server(server, {
    cors: {
        origin: "*"
    }
})

pollSocket(io);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})