// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAJr1nTg5uA7MLULrXQh9SpVkkRPvAm_WM",
    authDomain: "social-media-app-1-158d4.firebaseapp.com",
    projectId: "social-media-app-1-158d4",
    storageBucket: "social-media-app-1-158d4.appspot.com",
    messagingSenderId: "200081364805",
    appId: "1:200081364805:web:2a7466ece61524d3e3902c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);