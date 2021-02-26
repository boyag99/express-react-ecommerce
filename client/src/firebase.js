import firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBT_BbnN3jABEIpStaERLJZQp49xZhdoMA",
    authDomain: "react-redux-ecommerce-74c6c.firebaseapp.com",
    projectId: "react-redux-ecommerce-74c6c",
    storageBucket: "react-redux-ecommerce-74c6c.appspot.com",
    messagingSenderId: "1081102585277",
    appId: "1:1081102585277:web:02a52f6391ca45a9a1d6d4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const googleAuthProvider = firebase.auth.GoogleAuthProvider;