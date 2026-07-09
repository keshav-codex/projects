# Data Structure

This project uses Local Storage to store user data.

No database is used.

## Stored Data

Two main keys are used:

## studentList

It stores all registered student information.
Example data:

- Registration number
- First name
- Last name
- Date of birth
- Email
- Mobile number
- Password
- Security question
- Security answer
- Profile photo

## currentUser

It stores the currently logged-in user's information.
It is used to display data on the dashboard.

## JSON Format

Data is stored in JSON format.
Example:

{
    "registrationNumber": "REG20260709ABC123",
    "firstName": "John",
    "lastName": "Smith",
    "email": "john@example.com"
}

## Image Storage
Profile images are converted into Base64 format using FileReader API.
The converted image data is stored in Local Storage and displayed on the dashboard.