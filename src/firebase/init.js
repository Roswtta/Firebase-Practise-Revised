// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvTq6n-OLU1sDtTd3EF4zvrkfJnwEV_Is",
  authDomain: "fir-practise-2417d.firebaseapp.com",
  projectId: "fir-practise-2417d",
  storageBucket: "fir-practise-2417d.appspot.com",
  messagingSenderId: "174238532372",
  appId: "1:174238532372:web:0c1c4e2f5aef8c2854b801"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(); 
export const db = getFirestore();