/** @format */
"use client";

import { useEffect, useState } from "react";
import { auth } from "@/app/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function RandomPage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return user ? <div>Welcome, {user.displayName}</div> : <div>Loading...</div>;
}
