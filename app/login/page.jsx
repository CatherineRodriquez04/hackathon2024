"use client";
import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import Image from "next/image";
import { auth } from "../firebaseConfig";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc"; // Import Google icon
import { Button } from "@/components/ui/button";

export default function Login() {
  const router = useRouter();
  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = async () => {
    let user, token;
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      token = credential.accessToken;
      user = result.user;
      // Redirect to a different page after successful login
      router.push("/preferences");
    } catch (error) {
      console.log(error);
      const errorMessage = error.message;
      // Handle error
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex flex-col items-center justify-center w-full md:w-2/4 p-4">
        <h1 className="text-3xl font-bold mb-6">Login</h1>
        <div className="flex flex-col gap-2 border border-gray-300 p-5 w-full max-w-sm rounded-lg shadow-lg">
          <Button
            className="flex items-center justify-center gap-2"
            onClick={handleGoogleSignIn}
          >
            <FcGoogle size={20} /> Continue with Google
          </Button>
        </div>
      </div>
      <div className="w-full md:w-3/5 h-64 md:h-full bg-cover">
        <div className="relative h-full">
          <Image
            src="/assets/KarlTemp.jpg"
            alt="Login Image"
            layout="fill"
            objectFit="contain"
            className="rounded-t-lg md:rounded-none"
          />
        </div>
      </div>
    </div>
  );
}
