// Get Current User

let currentUser =
localStorage.getItem("currentUser");

// If user not logged in

if(currentUser == null){

    alert("Please login first");

    window.location.href =
    "login.html";
}

// Convert JSON

currentUser =
JSON.parse(currentUser);

// Display Data

document.getElementById("profileImage").src =
currentUser.profilePhoto;

document.getElementById("studentName").innerHTML =
currentUser.firstName + " " + currentUser.lastName;

document.getElementById("registrationNumber").innerHTML =
currentUser.registrationNumber;

document.getElementById("studentEmail").innerHTML =
currentUser.email;

document.getElementById("studentMobile").innerHTML =
currentUser.mobile;

// Logout

document.getElementById("logoutButton")
.addEventListener("click",function(){

    localStorage.removeItem("currentUser");

    alert("Logout Successful");

    window.location.href =
    "../../index.html";

});