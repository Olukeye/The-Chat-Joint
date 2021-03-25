const socket = io()

socket.on('updatedCount', (count) => {
    console.log('you have been updated!', count);
})

// event for button to listen to update number of clicks
document.querySelector('#increement').addEventListener('click', () => {
    console.log('clicked')
    socket.emit('increement')
})