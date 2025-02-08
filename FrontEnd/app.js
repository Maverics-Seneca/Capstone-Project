##java


// Firebase configuration (replace with your Firebase project config- nothing is fixed for this , this is just a plcae holder  )
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Login form submission
document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Sign in with Firebase
  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Redirect to dashboard or home page
      window.location.href = "/dashboard.html";
    })
    .catch((error) => {
      alert("Login failed: " + error.message);
    });
});

// Forgot password link
document.getElementById("forgot-password").addEventListener("click", (e) => {
  e.preventDefault();
  const email = prompt("Please enter your email to reset your password:");
  if (email) {
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        alert("Password reset email sent. Check your inbox.");
      })
      .catch((error) => {
        alert("Error sending password reset email: " + error.message);
      });
  }
});

// Sign up link
document.getElementById("sign-up").addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "/signup.html"; // Redirect to sign-up page
});
