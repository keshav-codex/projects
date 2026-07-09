// Select Form

const registrationForm = document.getElementById("registrationForm");

// Error Message Functions

function showError(id, message) {
    document.getElementById(id).innerHTML = message;
}

function clearError(id) {
    document.getElementById(id).innerHTML = "";
}

// Get Existing Students

function getStudents() {

    let students = localStorage.getItem("studentList");
    if (students == null) {
        return [];
    }
    return JSON.parse(students);
}

// Name Validation

function validateName(fieldId, errorId, fieldName) {
    let value = document.getElementById(fieldId).value.trim();
    let pattern = /^[A-Za-z]+$/;

    if (value === "") {

        showError(errorId, fieldName + " is required.");
        return false;
    }

    if (value.length < 2 || value.length > 30) {

        showError(errorId, fieldName + " must be 2 to 30 characters.");
        return false;
    }

    if (!pattern.test(value)) {

        showError(errorId, fieldName + " should contain only alphabets.");
        return false;
    }
    clearError(errorId);
    return true;
}

// DOB Validation

function validateDOB() {
    let dob = document.getElementById("dob").value;
    if (dob === "") {

        showError("dobError", "Date of birth is required.");
        return false;
    }

    let birthDate = new Date(dob);
    let today = new Date();

    if (birthDate > today) {

        showError("dobError", "Date cannot be future date.");
        return false;
    }

    let age = today.getFullYear() - birthDate.getFullYear();

    let month =
        today.getMonth() - birthDate.getMonth();


    if (month < 0 ||
        (month === 0 &&
        today.getDate() < birthDate.getDate())) {

        age--;
    }

    if (age < 16) {

        showError("dobError", "Minimum age should be 16 years.");
        return false;
    }

    if (age > 110) {

        showError("dobError", "Maximum age should be 110 years.");
        return false;
    }

    clearError("dobError");
    return true;
}

// Email Validation

function validateEmail() {

    let email =
    document.getElementById("email").value.trim();

    let pattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {

        showError("emailError", "Email is required.");
        return false;
    }

    if (!pattern.test(email)) {

        showError("emailError", "Enter valid email address.");
        return false;
    }

    let students = getStudents();

    let exists = students.some(function(student){

        return student.email === email;
    });

    if (exists) {

        showError("emailError", "Email already registered.");
        return false;

    }
    clearError("emailError");
    return true;
}

// Mobile Validation

function validateMobile() {
    let mobile =
    document.getElementById("mobile").value.trim();
    let pattern = /^[0-9]{10}$/;
    if (mobile === "") {

        showError("mobileError", "Mobile number is required.");
        return false;

    }
    if (!pattern.test(mobile)) {

        showError("mobileError", "Enter valid 10 digit mobile number.");
        return false;
    }

    let students = getStudents();

    let exists = students.some(function(student){

        return student.mobile === mobile;

    });

    if (exists) {

        showError("mobileError", "Mobile number already registered.");
        return false;

    }
    clearError("mobileError");
    return true;
}

// Password Validation

function validatePassword() {

    let password =
    document.getElementById("password").value;

    let pattern =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&+=]).{8,}$/;

    if(password === "") {

        showError("passwordError", "Password is required.");
        return false;

    }

    if(!pattern.test(password)) {

        showError(
            "passwordError",
            "Password must have 8 characters, uppercase, lowercase, number and special character."
        );
        return false;
    }
    clearError("passwordError");
    return true;

}

// Confirm Password

function validateConfirmPassword(){

    let password =
    document.getElementById("password").value;

    let confirmPassword =
    document.getElementById("confirmPassword").value;

    if(confirmPassword === "") {

        showError(
            "confirmPasswordError",
            "Confirm password is required."
        );

        return false;

    }

    if(password !== confirmPassword){

        showError(
            "confirmPasswordError",
            "Password does not match."
        );

        return false;
    }

    clearError("confirmPasswordError");
    return true;
}

// Security Validation

function validateSecurity(){

    let question =
    document.getElementById("securityQuestion").value;

    let answer =
    document.getElementById("securityAnswer").value.trim();

    if(question === ""){

        showError(
            "securityQuestionError",
            "Please select security question."
        );

        return false;

    }

    if(answer === ""){

        showError(
            "securityAnswerError",
            "Security answer is required."
        );

        return false;

    }

    clearError("securityQuestionError");
    clearError("securityAnswerError");

    return true;

}

// Photo Validation

function validatePhoto(){

    let file =
    document.getElementById("profilePhoto").files[0];

    if(!file){

        showError(
            "profilePhotoError",
            "Please upload profile photo."
        );

        return false;

    }

    let allowed =
    ["image/jpeg","image/png"];

    if(!allowed.includes(file.type)){

        showError(
            "profilePhotoError",
            "Only JPG, JPEG and PNG allowed."
        );

        return false;

    }

    let size = file.size / 1024;

    if(size < 20 || size > 1024){

        showError(
            "profilePhotoError",
            "Image size should be between 20 KB and 1024 KB."
        );

        return false;

    }

    clearError("profilePhotoError");
    return true;
}

// Generate Registration Number

function generateRegistrationNumber(){

    let students = getStudents();

    let registrationNumber;

    do {

        let date = new Date();

        let day =
        String(date.getDate()).padStart(2,"0");

        let month =
        String(date.getMonth()+1).padStart(2,"0");

        let year =
        date.getFullYear();

        let randomText = "";

        let chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        for(let i=0;i<3;i++){
            randomText +=
            chars[Math.floor(Math.random()*chars.length)];
        }

        let number =
        Math.floor(Math.random()*1000);

        registrationNumber =
        "REG" + year + month + day + randomText + number;
    }
    while(
        students.some(function(student){
            return student.registrationNumber === registrationNumber;
        })
    );

    return registrationNumber;
}

// Blur Events

document.getElementById("firstName")
.addEventListener("blur", function(){

    validateName(
        "firstName",
        "firstNameError",
        "First Name"
    );

});

document.getElementById("lastName")
.addEventListener("blur", function(){

    validateName(
        "lastName",
        "lastNameError",
        "Last Name"
    );

});

document.getElementById("dob")
.addEventListener("blur", validateDOB);

document.getElementById("email")
.addEventListener("blur", validateEmail);

document.getElementById("mobile")
.addEventListener("blur", validateMobile);

document.getElementById("password")
.addEventListener("blur", validatePassword);

document.getElementById("confirmPassword")
.addEventListener("blur", validateConfirmPassword);

// Clearing error messages on input

document.getElementById("firstName")
.addEventListener("input", function(){

    document.getElementById("firstNameError").innerHTML = "";

});

document.getElementById("lastName")
.addEventListener("input", function(){

    document.getElementById("lastNameError").innerHTML = "";

});


document.getElementById("email")
.addEventListener("input", function(){

    document.getElementById("emailError").innerHTML = "";

});

document.getElementById("mobile")
.addEventListener("input", function(){

    document.getElementById("mobileError").innerHTML = "";

});

document.getElementById("password")
.addEventListener("input", function(){

    document.getElementById("passwordError").innerHTML = "";

});

document.getElementById("confirmPassword")
.addEventListener("input", function(){

    document.getElementById("confirmPasswordError").innerHTML = "";

});

document.getElementById("securityQuestion")
.addEventListener("change", function(){

    document.getElementById("securityQuestionError").innerHTML = "";

});

document.getElementById("securityAnswer")
.addEventListener("input", function(){

    document.getElementById("securityAnswerError").innerHTML = "";

});

document.getElementById("profilePhoto")
.addEventListener("change", function(){

    document.getElementById("profilePhotoError").innerHTML = "";

});

// Submit Event

registrationForm.addEventListener("submit", function(event){

    event.preventDefault();

    document.querySelectorAll(".text-danger")
    .forEach(function(error){

    error.innerHTML = "";

    });

    if(!validateName("firstName","firstNameError","First Name"))
        return;

    if(!validateName("lastName","lastNameError","Last Name"))
        return;

    if(!validateDOB())
        return;

    if(!validateEmail())
        return;

    if(!validateMobile())
        return;

    if(!validatePassword())
        return;

    if(!validateConfirmPassword())
        return;

    if(!validateSecurity())
        return;

    if(!validatePhoto())
        return;

    let registrationNumber =
    generateRegistrationNumber();

    let student = {

        registrationNumber:

        registrationNumber,

        firstName:

        document.getElementById("firstName").value,

        lastName:

        document.getElementById("lastName").value,

        dob:

        document.getElementById("dob").value,

        email:

        document.getElementById("email").value,

        mobile:

        document.getElementById("mobile").value,

        password:

        document.getElementById("password").value,

        securityQuestion: 

        document.getElementById("securityQuestion").value,

        securityAnswer:

        document.getElementById("securityAnswer").value,

        profilePhoto: ""

    };

    let students = getStudents();

    let photoFile =
    document.getElementById("profilePhoto").files[0];


        let reader = new FileReader();


    reader.onload = function(){

    student.profilePhoto = reader.result;


    students.push(student);


    localStorage.setItem(
        "studentList",
        JSON.stringify(students)
    );


    alert(
    "Registration Successful\nYour Registration Number is: "
    + registrationNumber
    );


    window.location.href =
    "welcome.html";

    };


    reader.readAsDataURL(photoFile);
});

// Show Password

let password =
document.getElementById("password");

let showPassword =
document.getElementById("showPassword");

showPassword.addEventListener("click", function () {

    if (password.type === "password") {

        password.type = "text";
        showPassword.innerHTML = "Hide";

    }
    else {

        password.type = "password";
        showPassword.innerHTML = "Show";

    }

});

let confirmPassword =
document.getElementById("confirmPassword");

let showConfirmPassword =
document.getElementById("showConfirmPassword");

showConfirmPassword.addEventListener("click", function () {

    if (confirmPassword.type === "password") {

        confirmPassword.type = "text";
        showConfirmPassword.innerHTML = "Hide";

    }
    else {

        confirmPassword.type = "password";
        showConfirmPassword.innerHTML = "Show";

    }
});