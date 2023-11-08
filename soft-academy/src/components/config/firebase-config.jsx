
import { initializeApp } from "firebase/app";
import {getStorage} from'firebase/storage'

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyCjU1RnSKDAzAd6jV8d3CCdEXZtEzPo6CE",
  authDomain: "softacadamy-a0183.firebaseapp.com",
  databaseURL: "https://softacadamy-a0183-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "softacadamy-a0183",
  storageBucket: "softacadamy-a0183.appspot.com",
  messagingSenderId: "302951774385",
  appId: "1:302951774385:web:58e7c97656d3a87037ca90",
  measurementId: "G-WHSS52Q1D7"
};


const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)
// const analytics = getAnalytics(app);