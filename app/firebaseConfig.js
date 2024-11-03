/** @format */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAg5FncLbDkgxiFInbSf26L4-p1PKY2kps",
  authDomain: "beyondboundaries-12132.firebaseapp.com",
  projectId: "beyondboundaries-12132",
  storageBucket: "beyondboundaries-12132.firebasestorage.app",
  messagingSenderId: "110484596654",
  appId: "1:110484596654:web:efd30745717cd3d0b90a3f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { app, auth, firestore };
