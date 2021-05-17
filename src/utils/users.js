const users = []

// functions we'll be creating for users information
// addUser *
// RemoveUser *
// getUser *
// getting user in a room * 

const addUser = ({id, username, room }) => {
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    // we validate the user data
    if(!username || !room) {
        return {error: "Username and room are required"}
    }
    
    // we check if user already existed 
    const existingUser = users.find((user) => {
        return user.username === username & user.room === room
    })

    // we validate username
    if(existingUser) {
        return { error: "Username is already in use!"}
    }

    // we store the data
    const user = {id, username, room}
    users.push(user)
    return {user}
}

const removeUser = (id) => {
const index = users.findIndex((user) => user.id === id)

    if(index !== -1){
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => {
    return users.find((user) => user.id === id)
}

const getUserInRoom = (room) => {
    return users.filter((user) => user.room === room)
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUserInRoom
}
