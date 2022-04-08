// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB9QnZW7KvQKelR3cM6GTHY1oY8iUAv7ds",
    authDomain: "email-password-auth-e44f3.firebaseapp.com",
    projectId: "email-password-auth-e44f3",
    storageBucket: "email-password-auth-e44f3.appspot.com",
    messagingSenderId: "215030210388",
    appId: "1:215030210388:web:a514fa733c32bc8dd7f2c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;