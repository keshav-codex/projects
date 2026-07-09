let students =
JSON.parse(localStorage.getItem("studentList")) || [];

let selectedStudent = null;

let registrationInput =
document.getElementById("registrationNumber");

// Find Student

registrationInput.addEventListener("blur", function(){

    let regNumber =
    registrationInput.value.trim();

    selectedStudent =
    students.find(function(student){

        return student.registrationNumber === regNumber;

    });

    document.getElementById("registrationNumberError").innerHTML = "";

    if(selectedStudent == undefined){

        document.getElementById("registrationNumberError").innerHTML =
        "Registration number not found.";

        document.getElementById("securityQuestion").value = "";

        return;

    }

    document.getElementById("securityQuestion").value =
    selectedStudent.securityQuestion;

});

// Clear answer error while typing

document.getElementById("securityAnswer")
.addEventListener("input", function(){

    document.getElementById("answerError").innerHTML = "";

});

// Clear password error while typing

document.getElementById("newPassword")
.addEventListener("input", function(){

    document.getElementById("passwordError").innerHTML = "";
});

// Submit

document.getElementById("forgotPasswordForm")
.addEventListener("submit", function(event){

    event.preventDefault();

    // Clear old errors

    document.getElementById("registrationNumberError").innerHTML = "";

    document.getElementById("answerError").innerHTML = "";

    document.getElementById("passwordError").innerHTML = "";
 
    if(selectedStudent == null){
        document.getElementById("registrationNumberError").innerHTML =
        "Enter valid registration number.";
        return;
    }

    let answer =
    document.getElementById("securityAnswer")
    .value.trim();

    let newPassword =
    document.getElementById("newPassword")
    .value;

    if(answer === ""){
        document.getElementById("answerError").innerHTML =
        "Security answer required.";
        return;
    }

    if(answer.toLowerCase() !==
    selectedStudent.securityAnswer.toLowerCase()){
        document.getElementById("answerError").innerHTML =
        "Wrong security answer.";
        return;
    }

    let passwordPattern =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&+=]).{8,}$/;

    if(!passwordPattern.test(newPassword)){
        document.getElementById("passwordError").innerHTML =
        "Password must contain minimum 8 characters with uppercase, lowercase, number and special character.";
        return;
    }

    // Update Password

    selectedStudent.password =
    newPassword;

    let index =
    students.findIndex(function(student){

        return student.registrationNumber ===
        selectedStudent.registrationNumber;

    });

    students[index] =
    selectedStudent;

    localStorage.setItem(
        "studentList",
        JSON.stringify(students)
    );

    alert("Password updated successfully");
    window.location.href =
    "login.html";
});

// Show / Hide New Password

let newPassword =
document.getElementById("newPassword");

let showNewPassword =
document.getElementById("shownewPassword");

showNewPassword.addEventListener("click", function(){
    if(newPassword.type === "password"){
        newPassword.type = "text";
        showNewPassword.innerHTML =
        "Hide";
    }
    else{
        newPassword.type = "password";
        showNewPassword.innerHTML =
        "Show";
    }
});