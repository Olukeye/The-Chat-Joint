const socket = io()
// elememnts for the Form 
const $form = document.querySelector('#chat-form')
const $formInput = $form.querySelector('input')
const $formButton = $form.querySelector('button')


socket.on('message', (message) => {
    console.log(message);
})

// event for form  to listen for submit
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
 


// sending location of the client.
document.querySelector('#map').addEventListener('click',() => {
  if(!navigator.geolocation) {
      return alert('browser not supported !!')
  }

  navigator.geolocation.getCurrentPosition((position)=> {
      console.log(position)
  })
})