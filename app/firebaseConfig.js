// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAg5FncLbDkgxiFInbSf26L4-p1PKY2kps",
  authDomain: "beyondboundaries-12132.firebaseapp.com",
  projectId: "beyondboundaries-12132",
  storageBucket: "beyondboundaries-12132.firebasestorage.app",
  messagingSenderId: "110484596654",
  appId: "1:110484596654:web:efd30745717cd3d0b90a3f",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
