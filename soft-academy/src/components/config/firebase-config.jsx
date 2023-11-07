// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from'firebase/auth'
import {getDatabase} from'firebase/database'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCjU1RnSKDAzAd6jV8d3CCdEXZtEzPo6CE",
  authDomain: "softacadamy-a0183.firebaseapp.com",
  projectId: "softacadamy-a0183",
  databaseURL:"https://softacadamy-a0183.firebaseio.com/",
  storageBucket: "softacadamy-a0183.appspot.com",
  messagingSenderId: "302951774385",
  appId: "1:302951774385:web:58e7c97656d3a87037ca90",
  measurementId: "G-WHSS52Q1D7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export  const auth = getAuth(app)
export const database = getDatabase(app)
// const analytics = getAnalytics(app);