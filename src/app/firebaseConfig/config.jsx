// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGWUBm5UbgMQOPjr-k4XeMg5ZKglZSYIM",
  authDomain: "vivalocalvegas-d126d.firebaseapp.com",
  projectId: "vivalocalvegas-d126d",
  storageBucket: "vivalocalvegas-d126d.firebasestorage.app",
  messagingSenderId: "1027600312126",
  appId: "1:1027600312126:web:04770dc7607ca3aa0fae6f",
  measurementId: "G-6X31P2EEQD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
