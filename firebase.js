// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAR5EXj0MmZW8iPtSXwAXbwiuw-IvD4OSo",
  authDomain: "expoapp-47256.firebaseapp.com",
  databaseURL: "https://expoapp-47256-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "expoapp-47256",
  storageBucket: "expoapp-47256.appspot.com",
  messagingSenderId: "356315005924",
  appId: "1:356315005924:web:e8f139c38455297167fdf1",
  measurementId: "G-2ZTNJP5WLX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);