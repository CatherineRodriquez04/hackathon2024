"use client";
import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { auth } from "../firebaseConfig";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc"; // Import Google icon
import { Button } from "@/components/ui/button";
import ImageTransition from "@/components/ImageTransition"; // Import ImageTransition component

export default function Login() {
  const router = useRouter();
  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken; // Get the access token
      const user = result.user; // Get the user information
      // Redirect to a different page after successful login
      router.push("/preferences");
    } catch (error) {
      console.error(error); // Log any errors
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-screen">
      {/* Title Section */}
      <div className="mt-[50px] relative bg-opacity-75 border-[2px] p-10 rounded-xl shadow-lg text-center mx-auto border-accent transition-transform duration-300 ease-in-out hover:scale-105">
        <h2 className="text-4xl font-bold mb-5 text-center]">
          Welcome to Your Travel Experience!
        </h2>
        <p className="text-xl text-center mb-3 text-accent">
          Log in to unlock amazing adventures and explore new destinations.
        </p>
      </div>

      {/* Split Layout for Login and Image */}
      <div className="flex w-full h-full">
        {/* Login Section */}
        <div className="flex flex-col justify-center items-center w-1/2 h-full px-4 -mt-[80px] z-5">
          <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
          <div className="flex flex-col gap-2 p-5 w-full max-w-sm rounded-lg shadow-lg">
            <Button
              className="flex items-center justify-center gap-2"
              onClick={handleGoogleSignIn}
            >
              <FcGoogle size={20} /> Continue with Google
            </Button>
          </div>
        </div>

        {/* Image Section */}
        <div className="absolute w-[500px] flex items-center justify-end left-[750px] mt-[100px] z-2"> {/* Adjust the right padding as needed */}
          <ImageTransition className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}
