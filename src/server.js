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
let count = 0;
io.on('connection', (socket) => {
  console.log('Welcome to the chat Room')

  socket.emit('updatedCount', count)

  socket.on('increement', () => {
    count++
    // socket.emit('updatedCount', count)
    io.emit('updatedCount', count)
  })
})






const port = process.env.PORT || 2021
server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })