// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-4fccb.firebaseapp.com",
  projectId: "mern-blog-4fccb",
  storageBucket: "mern-blog-4fccb.appspot.com",
  messagingSenderId: "516595076634",
  appId: "1:516595076634:web:19b651b3f85f8c7a838ba3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

