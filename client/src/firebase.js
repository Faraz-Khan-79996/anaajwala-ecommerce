// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "anajwala-99d67.firebaseapp.com",
  projectId: "anajwala-99d67",
  storageBucket: "anajwala-99d67.firebasestorage.app",
  messagingSenderId: "232601522631",
  appId: "1:232601522631:web:3a5beca45138fc2aca89e2",
  measurementId: "G-H1DJVSFFLW"
};

// apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);