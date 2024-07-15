// Import the functions you need from the Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB7a027zMQit25gQDwrCejfPUQR-qdaqAY",
    authDomain: "login-page-821ad.firebaseapp.com",
    projectId: "login-page-821ad",
    storageBucket: "login-page-821ad.appspot.com",
    messagingSenderId: "172388087116",
    appId: "1:172388087116:web:5109d1bafaa52c9cff4be9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to validate email format
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Function to perform form validation
function validateForm(email, password) {
  let isValid = true;

  // Validate email
  if (!validateEmail(email)) {
    document.getElementById('emailError').textContent = "Please enter a valid email address.";
    isValid = false;
  } else {
    document.getElementById('emailError').textContent = "";
  }

  // Validate password (optional: add more password rules as needed)
  if (password.length < 8) {
    document.getElementById('passwordError').textContent = "Password should be at least 8 characters long.";
    isValid = false;
  } else {
    document.getElementById('passwordError').textContent = "";
  }

  return isValid;
}

// Add event listener to the form submit button
const form = document.getElementById('form');
form.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent default form submission

  // Fetch input values
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Validate form inputs
  if (!validateForm(email, password)) {
    return; // Exit function if form is not valid
  }

  // Sign in with email and password
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in successfully
      const user = userCredential.user;
      alert("Logging in successfully...");
      // Redirect to successsignin.html (adjust path as needed)
      window.location.href = "successsignin.html";

    })
    .catch((error) => {
      // Handle errors
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/invalid-credential') {
        alert("The password is incorrect.");
      } else if (errorCode === 'auth/user-not-found') {
        alert("There is no user corresponding to the given email.");
      } else {
        alert(errorMessage);
      }
    });
});
