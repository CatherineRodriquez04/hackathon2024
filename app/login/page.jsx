"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "@firebase/auth";
import Image from "next/image";
import { auth } from "../firebaseConfig";
import { tree } from "next/dist/build/templates/app-page";

export default function login() {
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState(false);
  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error(
        "Error during sign in: ",
        errorCode,
        errorMessage,
        email,
        credential
      );
      alert("Error during sign in! Try again later.");
    }
  };

  return (
    <div className="container h-screen w-screen flex flex-row">
      <div className="container text-center w-2/5 mt-40 mr-10">
        <h1 className="h1">Login</h1>
        <div className="flex flex-col gap-5 mt-5 border border-black border-1 rounded-md p-5">
          <Button onClick={handleGoogleSignIn}>Continue with Google</Button>
          <Button onClick={() => setShowEmailDialog(true)}>
            Sign in email
          </Button>
          <Button onClick={() => setShowEmailDialog}>Sign up with email</Button>
          <p className="">Trouble logging in?</p>
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
      {showEmailDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-5 rounded-md">
            <h2 className="text-xl mb-4">Sign in with Email</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 mb-4 w-full"
            />
            {isExistingUser && (
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 mb-4 w-full"
              />
            )}
            <Button onClick={handleEmailCheck}>Next</Button>
            <Button onClick={() => setShowEmailDialog(false)} className="ml-2">
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
