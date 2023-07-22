// Replace the following configuration with your own Firebase project details
var firebaseConfig = {
  apiKey: "AIzaSyB5zOfDmJbsegwyd5J01fPlHOpML4rXuZs",
  authDomain: "chatapp-adffe.firebaseapp.com",
  projectId: "chatapp-adffe",
  storageBucket: "chatapp-adffe.appspot.com",
  messagingSenderId: "22604188733",
  appId: "1:22604188733:web:c49db5990a57d31489ee54",
  measurementId: "G-B1C49K816P"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

document.addEventListener("DOMContentLoaded", function() {
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  var bodyElement = document.querySelector("body");

  if (isMobile) {
    bodyElement.classList.add("mobile");
  } else {
    bodyElement.classList.add("desktop");
  }

  var messageInput = document.getElementById("messageInput");
  var chatContainer = document.getElementById("chatContainer");
  var sendButton = document.getElementById("sendButton");
  var usernameContainer = document.getElementById("usernameContainer");
  var usernameInput = document.getElementById("usernameInput");
  var usernameSubmit = document.getElementById("usernameSubmit");
  var username = null;

  function setUsername() {
    var inputUsername = usernameInput.value.trim();
    if (inputUsername !== "") {
      username = inputUsername;
      usernameContainer.style.display = "none";
    }
  }

  usernameSubmit.addEventListener("click", setUsername);
  usernameInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      setUsername();
    }
  });

  sendButton.addEventListener("click", function() {
    var messageContent = messageInput.value.trim();
    if (messageContent !== "") {
      firebase.database().ref("messages").push().set({
        username: username,
        content: messageContent
      });
      messageInput.value = "";
    }
  });

  firebase.database().ref("messages").on("child_added", function(snapshot) {
    var message = snapshot.val();
    var messageElement = document.createElement("div");
    messageElement.classList.add("message");

    var usernameElement = document.createElement("span");
    usernameElement.classList.add("message-username");
    usernameElement.innerText = message.username + ": ";
    messageElement.appendChild(usernameElement);

    var contentElement = document.createElement("span");
    contentElement.classList.add("message-content");
    contentElement.innerText = message.content;
    messageElement.appendChild(contentElement);

    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  });

  usernameContainer.style.display = "flex";
});
