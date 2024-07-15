



  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
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

  const submit = document.getElementById('submit');
  submit.addEventListener("click", function(event) {
      event.preventDefault();
  
      const form = document.getElementById('form');
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const password2 = document.getElementById('password2').value;

      // Email format validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
          alert("Please enter a valid email address.");
          return;
      }
  
      // Password validation regex: at least 8 characters, one special character, one uppercase letter, one lowercase letter, one number
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
          alert("Password should be at least 8 characters long, and contain at least one special character, one uppercase letter, one lowercase letter, and one number.");
          return;
      }
  
      // Password confirmation check
      if (password !== password2) {
          alert("Passwords do not match.");
          return;
      }
  
      // Create user with email and password
      createUserWithEmailAndPassword (auth, email, password)
          .then((userCredential) => {
              // Signed up successfully
              const user = userCredential.user;
              alert("Creating Account...");
              // Redirect to new page
             window.location.href = "successsignup.html";
          })
          .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              if (errorCode === 'auth/email-already-in-use') {
                alert("The email address is already in use by another account.");
            } else {
                alert(errorMessage);
            }
          });
  });
  