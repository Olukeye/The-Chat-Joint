const socket = io();
// elememnts for the Form
const $form = document.querySelector("#chat-form");
const $formInput = $form.querySelector("input");
const $formButton = $form.querySelector("button");
const $messages = document.querySelector("#messages");
const $sendLocationButton = document.querySelector("#location");

// this for the templates
const chatTemplate = document.querySelector("#chat-template").innerHTML;
const locationMgsTemplate = document.querySelector(
  "#location-mgs-template"
).innerHTML;

const { username, room } = Qs.parse(location.search, {ignoreQueryPrefix: true });

socket.on("message", (message) => {
  console.log(message);
  const html = Mustache.render(chatTemplate, {
    messages: message.text,
    createdAt: moment(message.createdAt).format("h:mm a"),
  }); // this allows every chat to render in the html template
  $messages.insertAdjacentHTML("beforeend", html);
});

socket.on("locationMessage", (url) => {
  console.log(url);
  const html = Mustache.render(locationMgsTemplate, {
    url,
  });
  $messages.insertAdjacentHTML("beforeend", html);
});

// event for form  to listen when  submitted
$form.addEventListener("submit", (e) => {
  e.preventDefault();

  $formButton.setAttribute("disabled", "disabled");
  // disabe the form btn

  const message = e.target.elements.input.value;

  socket.emit("chat-form", message, (message) => {
    // enable the form
    $formButton.removeAttribute("disabled");

    // clear input text after submit
    $formInput.value = "";
    $formInput.focus();

    console.log(message);
  });
});

// $sendLocationButton.addEventListener("click", () => {
//   if (!navigator.geolocation) {
//     return alert("Geolocaton is not supported by your browser!");
//   }

//   $sendLocationButton.setAttribute("disabled", "disabled");

//   navigator.geolocation.getCurrentPosition((position) => {
//     socket.emit(
//       "sendLocation",
//       {
//         latitude: position.coords.latitude,
//         longitude: position.coords.longitude,
//       },
//       () => {
//         console.log("location shared");
//       }
//     );
//   });
// });

socket.emit("join", { username, room });
