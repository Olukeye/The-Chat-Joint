const socket = io()

socket.on('message', (message) => {
    console.log(message);
})

// event for form  to listen for submit
document.querySelector('#chat-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const message = e.target.elements.message.value
    socket.emit('chat-form', message)
})
