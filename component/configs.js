// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNsllxeVcG9zYj0YBE_zaax64ESTthgBs",
  authDomain: "caro-c3083.firebaseapp.com",
  projectId: "caro-c3083",
  storageBucket: "caro-c3083.appspot.com",
  messagingSenderId: "691165173325",
  appId: "1:691165173325:web:0e0a7b0889ba94dd886e04",
  measurementId: "G-48B17ZEZLC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);