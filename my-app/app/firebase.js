// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLfYh9ZNaTNItsCh1WssCljTU3zLA4KQw",
  authDomain: "expense-tracker-62fe0.firebaseapp.com",
  projectId: "expense-tracker-62fe0",
  storageBucket: "expense-tracker-62fe0.appspot.com",
  messagingSenderId: "1057785438624",
  appId: "1:1057785438624:web:b23417a68519e3fbce84c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)