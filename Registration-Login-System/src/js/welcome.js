// Get student data from Local Storage

let students =
localStorage.getItem("studentList");

// Check data exists

if(students == null){

    alert("No registration data found.");
    window.location.href = "../index.html";
}

// Convert JSON into Object

students = JSON.parse(students);

// Get latest registered student

let student =
students[students.length - 1];

// Display Data

document.getElementById("studentName").innerHTML =
student.firstName + " " + student.lastName;

document.getElementById("registrationNumber").innerHTML =
student.registrationNumber;

document.getElementById("studentEmail").innerHTML =
student.email;