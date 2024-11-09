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
