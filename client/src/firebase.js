// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "anajwala-developement.firebaseapp.com",
  projectId: "anajwala-developement",
  storageBucket: "anajwala-developement.firebasestorage.app",
  messagingSenderId: "845283237481",
  appId: "1:845283237481:web:cf907354b478fcd4008cf8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);