// protected.js

// Check if the user is logged in
const isLoggedIn = localStorage.getItem("loggedIn");

if (isLoggedIn !== "true") {
    alert("Please login first!");
    window.location.href = "login.html";
}