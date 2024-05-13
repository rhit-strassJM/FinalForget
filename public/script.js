import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDzY5iuxQuSOBH33ek5RsF0AEIS_vl2CJ4",
    authDomain: "forget-me-not-74a74.firebaseapp.com",
    databaseURL: "https://forget-me-not-74a74-default-rtdb.firebaseio.com/",
    projectId: "forget-me-not-74a74",
    storageBucket: "forget-me-not-74a74.appspot.com",
    messagingSenderId: "214952191183",
    appId: "1:214952191183:web:84d5d9a3b75bea6f1043ba",
    measurementId: "G-LNF4FK3XM1"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const submitButton = document.getElementById("submit");
const signupButton = document.getElementById("sign-up");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const main = document.getElementById("main");
const createacct = document.getElementById("create-acct")

const signupEmailIn = document.getElementById("email-signup");
const confirmSignupEmailIn = document.getElementById("confirm-email-signup");
const signupPasswordIn = document.getElementById("password-signup");
const confirmSignUpPasswordIn = document.getElementById("confirm-password-signup");
const createacctbtn = document.getElementById("create-acct-btn");

const returnBtn = document.getElementById("return-btn");

var email, password, signupEmail, signupPassword, confirmSignupEmail, confirmSignUpPassword;

createacctbtn.addEventListener("click", function() {
    var isVerified = true;
  
    signupEmail = signupEmailIn.value;
    confirmSignupEmail = confirmSignupEmailIn.value;
    if(signupEmail != confirmSignupEmail) {
        window.alert("Email fields do not match. Try again.")
        isVerified = false;
    }
  
    signupPassword = signupPasswordIn.value;
    confirmSignUpPassword = confirmSignUpPasswordIn.value;
    if(signupPassword != confirmSignUpPassword) {
        window.alert("Password fields do not match. Try again.")
        isVerified = false;
    }
    
    if(signupEmail == null || confirmSignupEmail == null || signupPassword == null || confirmSignUpPassword == null) {
      window.alert("Please fill out all required fields.");
      isVerified = false;
    }
    
    if(isVerified) {
      createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // Add the user to Firebase Authentication
          const uid = user.uid;
          // Here you can store additional user information if needed
          // firestore.collection("users").doc(uid).set({
          //     email: signupEmail,
          //     // other user data...
          // });
          // Redirect to homescreen.html
          window.location.href = "homescreen.html";
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          window.alert("Error occurred. Try again.");
        });
    }
  });
  

submitButton.addEventListener("click", function() {
  email = emailInput.value;
  console.log(email);
  password = passwordInput.value;
  console.log(password);

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      window.location.href = "homescreen.html";
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Incorrect Login Credentials");
      window.alert("Incorrect Login Credentials");
    });
});

signupButton.addEventListener("click", function() {
    main.style.display = "none";
    createacct.style.display = "block";
});

returnBtn.addEventListener("click", function() {
    main.style.display = "block";
    createacct.style.display = "none";
});
