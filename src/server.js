const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const {  generateMessage } = require('./utils/messages')


const app = express()
const server = http.createServer(app)
const io = socketio(server)



const publicDirectoryPath = path.join(__dirname, "../public")
app.use(express.static(publicDirectoryPath))


// when a member joined with a welcome message 
io.on('connection', (socket) => {
  console.log('Welcome to the chat Room')

  // to target a specific ROOM when a given user joined
        socket.on('join', ({username, room}) => {
          socket.join(room)
          // Welcome Messages
        socket.emit('message', generateMessage('Welcome!'))

        // event to notify the group a new user has joined
        socket.broadcast.to(room).emit('message', generateMessage(`${username} joined`))

          // io.emit, socket.emit,  socket.broadcast.emit
          // io.to.emit/socket.broadcast.to.emit(it emit an event in a specific room)


           // when i user left the chat room
        socket.on('disconnect', () => {
          io.to(room).emit('message', generateMessage(`${username} left`))
       })
 
        })

        // event for form submit
        socket.on("chat-form",(message, callback) => {

            io.emit('message',  generateMessage(message))
            // callback function for delivered messages 
            callback('Delivered')

        })

})



const port = process.env.PORT || 2021
server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
