"use client";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { auth } from "../firebaseConfig";

export default function preferencesPage() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log(user);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);
  const router = useRouter();

  return (
    <div className="container h-screen w-screen flex flex-row">
      <h1>Enter your preferences here</h1>
    </div>
  );
}
