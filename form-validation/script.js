const form = document.getElementById('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const successMessage = document.getElementById('success-message');

// When the submit button is clicked, this function will be triggered.
// Inside this function, each input field must be filled with valid information.
// If any of the fields are left empty, it will be considered invalid.
// For the email input, it must follow the proper email format — otherwise, it will be marked as invalid.
// As for the password input, it must contain exactly six digits — if not, it will also be considered invalid.

form.addEventListener('submit', function (e) {
    e.preventDefault();
    nameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';
    successMessage.textContent = '';
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    let valid = true;
    if (name === '') {
        nameError.textContent = "Name is required";
        valid =false;
    }
    if (email === '') {
        emailError.textContent = "Email is required";
        valid = false;
    } else if (!validateEmail(email)) {
        emailError.textContent = "Enter a valid email";
        valid = false;
    }
    if (password === '') {
        passwordError.textContent = "Password is required";
        valid = false;
    }else if (!/^\d{6}$/.test(password)) {
              passwordError.textContent = "Password must be exactly 6 digits";
              valid = false;
         }
    if (valid) {
        successMessage.textContent = "Registration successful!";
        form.reset();
    }
});
function validateEmail(email) {
    const rule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return rule.test(email);
}