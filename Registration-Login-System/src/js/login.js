// Select Login Form

const loginForm =
document.getElementById("loginForm");

// Get Students from Local Storage

function getStudents(){

    let students =
    localStorage.getItem("studentList");

    if(students == null){
        return [];
    }
    return JSON.parse(students);
}

// Show Error

function showError(id,message){

    document.getElementById(id).innerHTML =
    message;
}

// Clear Error

function clearError(id){

    document.getElementById(id).innerHTML =
    "";
}

// Clear Error on Input

document.getElementById("loginRegistrationNumber")
.addEventListener("input", function(){

    clearError("registrationNumberError");

});

document.getElementById("loginPassword")
.addEventListener("input", function(){

    clearError("passwordError");

});

// Login Submit

loginForm.addEventListener("submit",function(event){

    event.preventDefault();

    clearError("registrationNumberError");

    clearError("passwordError");

    let registrationNumber =
    document.getElementById(
        "loginRegistrationNumber"
    ).value.trim();

    let password =
    document.getElementById(
        "loginPassword"
    ).value;

    let valid = true;

    // Registration Number Check

    if(registrationNumber === ""){
        showError(
            "registrationNumberError",
            "Registration number is required."
        );

        valid = false;
    }

    // Password Check
    if(password === ""){
        showError(
            "passwordError",
            "Password is required."
        );
        valid = false;

    }

    if(!valid){
        return;
    }

    // Find Student

    let students =
    getStudents();

    let student =
    students.find(function(item){
        return item.registrationNumber === registrationNumber;
    });
    if(student == undefined){
        showError(
            "registrationNumberError",
            "Registration number not found."
        );

        return;

    }
    // Password Match
    if(student.password !== password){
        showError(
            "passwordError",
            "Incorrect password."
        );
        return;

    }

    // Store Current User

    localStorage.setItem(
        "currentUser",
        JSON.stringify(student)
    );

    alert("Login Successful");
    window.location.href =
    "dashboard.html";
});

// Show / Hide Password

let loginPassword =
document.getElementById("loginPassword");

let showLoginPassword =
document.getElementById("showloginPassword");

showLoginPassword.addEventListener("click", function(){
    if(loginPassword.type === "password"){
        loginPassword.type = "text";
        showLoginPassword.innerHTML =
        "Hide";
    }
    else{
        loginPassword.type = "password";

        showLoginPassword.innerHTML =
        "Show";
    }
});