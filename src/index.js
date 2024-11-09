const form = document.getElementById("registration");

const usernameEl = form.elements["username"];
const emailEl = form.elements["email"];
const passwordEl = form.elements["password"];
const passwordCheckEl = form.elements["passwordCheck"];
const termsEl = form.elements["terms"];

form.addEventListener("submit", validate);

function validate(event) {
  //  errorDisplay.innerHTML = '';
  //  clearErrors();

  const userVal = validateUsername();
  if (userVal === false) {
    event.returnValue = false;
    return false;
  }

  const emailVal = validateEmail();
  if (emailVal === false) {
    evt.returnValue = false;
    return false;
  }
  const passwordVal = validatePassword();
  if (passwordVal === false) {
    event.returnValue = false;
    return false;
  }
}

//validate the other form
function validateUsername() {
  const regex = /[^A-Za-z0-9]/; // checking characters
  const username = usernameEl.value;
  let isUnique = false;

  // Check if username has at least two unique characters
  for (let i = 0; i < username.length; i++) {
    if (username[i] !== username[0]) isUnique = true;
    break; // if the unique value is met
  }
  //return value.length >= 4 && isUnique && !regex.test(value);

  if (username.length < 4) {
    return "Username must be at least 4 characters long.";
  } else if (!isUnique) {
    return "Username must contain at least two unique characters.";
  } else if (regex.test(username)) {
    return "The username cannot contain special characters or whitespace.";
  }

  return true; // Validation passes
}

function validateEmail(field) {
  //probably gonna change this soon
  let email = emailEl.value;
  console.log(email);
  if (!email.includes("@") && !email.includes(".")) {
    alert(`Please enter a valid email address.`);
    emailEl.focus();
    return false;
  } else if (value.includes("@example.com")) {
    showError(field, "Your email must not be from the domain 'example.com'.");
    return false;
  }
} //else {
return true;
