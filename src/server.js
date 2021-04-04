const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');


const app = express()
const server = http.createServer(app)
const io = socketio(server)



const publicDirectoryPath = path.join(__dirname, "../public")
app.use(express.static(publicDirectoryPath))


// craeting an event to the server
// let count = 0;



// when a member joined with a welcome message 
io.on('connection', (socket) => {
  console.log('Welcome to the chat Room')

  // event to alert other users that someone has joined
  socket.emit('message', 'Welcome!')
  
  // event to notify the group a new user has joined
  socket.broadcast.emit('message', 'User joined')

  // event for form submit
  socket.on("chat-form",(message, callback) => {
    io.emit('message', message)
    // callback function for delivered messages 
    callback('Delivered')
  })


// when i user left the chat room
  socket.on('disconnect', () => {
    io.emit('message', 'user left!')
  })
  

})



const port = process.env.PORT || 2021
server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
