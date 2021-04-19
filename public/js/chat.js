const socket = io()
// elememnts for the Form 
const $form = document.querySelector('#chat-form')
const $formInput = $form.querySelector('input')
const $formButton = $form.querySelector('button')
const $messages = document.querySelector('#messages')


// this for the templates 
const chatTemplate = document.querySelector('#chat-template').innerHTML

const {username, room } = Qs.parse(location.search, {ignoreQueryPrefix: true})

socket.on('message', (message) => {
    console.log(message)
    const html = Mustache.render(chatTemplate, {
        messages: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    })  // this allows every chat to render in the html template
    $messages.insertAdjacentHTML('beforeend', html)
}) 

// event for form  to listen when  submitted
$form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    $formButton.setAttribute('disabled', 'disabled')
    // disabe the form btn

    const message = e.target.elements.input.value

    socket.emit('chat-form', message, (message) => {
    
     // enable the form 
        $formButton.removeAttribute('disabled')

        // clear input text after submit
        $formInput.value = ''
        $formInput.focus()



        console.log( message)

    })
})

socket.emit('join', {username, room })
 