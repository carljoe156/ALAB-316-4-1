const form = document.getElementById("registration");

const usernameEl = form.elements["username"];
const emailEl = form.elements["email"];
const passwordEl = form.elements["password"];
const passwordCheckEl = form.elements["passwordCheck"];
const termsEl = form.elements["terms"];

form.addEventListener("submit", validate);

function validate(event) {
  event.preventDefault(); // Prevent form submission to validate first

  // Validate each field
  if (!validateUsername(usernameEl.value)) {
    showError(usernameEl, "Username is invalid.");
    return;
  }

  if (!validateEmail(emailEl)) {
    showError(emailEl, "Email is invalid.");
    return;
  }

  if (!validatePassword(passwordEl, passwordCheckEl)) {
    showError(passwordEl, "Password is invalid.");
    return;
  }

  if (!termsEl.checked) {
    showError(termsEl, "You must agree to the terms.");
    return;
  }

  // If all validations pass, store the data
  const userData = {
    username: usernameEl.value.toLowerCase(),
    email: emailEl.value.toLowerCase(),
    password: passwordEl.value,
  };

  storeUserData(userData);
  clearForm();
  showSuccessMessage("Registration successful!");
}

function validateUsername(username) {
  const regex = /[^A-Za-z0-9]/; // Check for special characters
  let isUnique = false;

  if (username.length === 0) {
    showError(usernameEl, "Username cannot be blank.");
    usernameEl.focus();
    return false;
  }
  if (username.length < 4) {
    showError(usernameEl, "Username must be at least 4 characters long.");
    usernameEl.focus();
  }
  if (regex.test(username)) {
    showError(usernameEl, "Username must be at least 4 characters long.");
    usernameEl.focus();
    return false;
  }
  if (username.length === 1) {
    showError(usernameEl, "Username cannot contain special characters.");
    usernameEl.focus();
    return false;
  }

  // Checks t see if  username is unique in lowerCase
  const existingUsers = getUsersFromStorage();
  if (existingUsers && existingUsers[username.toLowerCase()]) {
    showError(usernameEl, "That username is already taken.");
    usernameEl.focus();
    return false; //  sorry buddy that Username already taken
  }

  return true;
}

function validateEmail(field) {
  const value = field.value;
  if (!value.includes("@") || !value.includes(".")) {
    return false;
  }
  if (value.includes("@example.com")) {
    emailEl.focus();
    return false;
  }
  return true;
}

function validatePassword(passwordField, passwordCheckField) {
  const password = passwordField.value;
  const passwordCheck = passwordCheckField.value;

  if (password.length < 12) {
    passwordEl.focus();
    return false; // Password must be at least 12 characters long
  }
  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
    passwordEl.focus();
    return false; // Password must contain both uppercase and lowercase letters
  }
  if (!/\d/.test(password)) {
    passwordEl.focus();
    return false; // Password must contain a number
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    passwordEl.focus();
    return false; // Password must contain a special character
  }
  if (password.toLowerCase().includes("password")) {
    passwordEl.focus();
    return false; // Password cannot contain the word "password"
  }
  if (password.includes(usernameEl.value.toLowerCase())) {
    passwordEl.focus();
    return false; // Password cannot contain the username
  }
  if (password !== passwordCheck) {
    passwordEl.focus();
    return false; // Password and repeat password must match
  }

  return true;
}

function storeUserData(userData) {
  // call up existing users from localStorage
  const existingUsers = getUsersFromStorage();

  // Store new user as key
  existingUsers[userData.username] = {
    email: userData.email,
    password: userData.password,
  };

  //  Save users object back to localStorage
  localStorage.setItem("users", JSON.stringify(existingUsers));
}

function getUsersFromStorage() {
  const storedUsers = localStorage.getItem("users");
  return storedUsers ? JSON.parse(storedUsers) : {}; // Bring existing users
}

function clearForm() {
  // Clear form fields after successful submission
  form.reset();
}

function showError(field, message) {
  const errorDisplay = document.getElementById("errorDisplay");
  errorDisplay.innerHTML = message;
  errorDisplay.style.display = "block";
  field.style.border = "2px solid red";
}

function showSuccessMessage(message) {
  const successMessage = document.createElement("div");
  successMessage.innerHTML = message;
  successMessage.style.color = "green";
  successMessage.style.marginTop = "20px";
  form.appendChild(successMessage);
  setTimeout(() => {
    successMessage.remove();
  }, 3000);
}
