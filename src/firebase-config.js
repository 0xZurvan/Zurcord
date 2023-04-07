// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6KpOFSsQqiCO81tx7a81aNPbCufN5JPg",
  authDomain: "zurcord-c379f.firebaseapp.com",
  projectId: "zurcord-c379f",
  storageBucket: "zurcord-c379f.appspot.com",
  messagingSenderId: "80433797682",
  appId: "1:80433797682:web:996ae28f3b8c964b997a2b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);