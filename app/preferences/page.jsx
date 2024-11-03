"use client";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { auth } from "../firebaseConfig";
import { useState } from "react";
import dayjs from "dayjs";

export default function preferencesPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log(user);
      } else {
        // User is signed out
        router.push("/login");
      }
    });
  }, []);

  const greeting = () => {
    let hour = dayjs().get("hour");
    if (hour < 12) {
      return "Good Morning, ";
    } else if (hour < 18) {
      return "Good Afternoon, ";
    } else {
      return "Good Evening, ";
    }
  };

  return (
    <>
      <div className="container h-screen w-screen flex flex-row">
        <h2 className="h2">{greeting() + user?.displayName}</h2>
        <h4 className="h4">
          Please fill out our preferences form so we can better match you with a
          mentor that you care about:
        </h4>
      </div>
    </>
  );
}
