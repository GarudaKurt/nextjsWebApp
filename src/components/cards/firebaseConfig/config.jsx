// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; // Import Realtime Database

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByrFuIiQIxroKV1muSxiLFd4sZiMEfAr4",
  authDomain: "uc-shs-smart-mirror.firebaseapp.com",
  databaseURL: "https://uc-shs-smart-mirror-default-rtdb.firebaseio.com", 
  projectId: "uc-shs-smart-mirror",
  storageBucket: "uc-shs-smart-mirror.appspot.com",
  messagingSenderId: "112020072431",
  appId: "1:112020072431:web:af41d0c24dd27b8353f81a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const database = getDatabase(app); // Initialize Realtime Database
