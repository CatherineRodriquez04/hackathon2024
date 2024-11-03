"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import Image from "next/image";
import { auth } from "../firebaseConfig";

export default function login() {
  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = async () => {
    let user, token;
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      token = credential.accessToken;
      user = result.user;

      // Check to see if they have registered for has made it passed the credential page
    } catch (error) {
      console.log(error);
      const errorMessage = error.message;
      alert("Error during sign in: ", errorMessage);
    }

    if (token && user) {
      console.log("User signed in with Google: ", user);
    }
  };

  return (
    <div className="container h-screen w-screen flex flex-row">
      <div className="container text-center w-2/5 mt-40 mr-10">
        <h1 className="h1">Login</h1>
        <div className="flex flex-col gap-5 mt-5 border border-black border-1 p-5">
          <Button onClick={handleGoogleSignIn}>Continue with Google</Button>
        </div>
      </div>
      <div className="w-3/5 bg-cover">
        <Image
          src="/assets/login-img.jpg"
          alt="Image"
          width="500"
          height="500"
        />
      </div>
    </div>
  );
}
