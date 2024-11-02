"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image";



export default function login() {
  return (
    <div className="container h-screen w-screen flex flex-row">
      <div className="container text-center w-2/5 mt-40 mr-10">
        <h1 className="h1">Login</h1>
        <div className="flex flex-col gap-5 mt-5 border border-black border-1 rounded-md p-5">
        <Button>Continue with Google</Button>
        <Button>Continue with email</Button>
        <text className="">Trouble logging in?</text>
        </div>
      </div>
      <div className="w-3/5 bg-cover">
        <Image src="/assets/login-img.jpg" alt="Image" width="500" height="500"/>
      </div>
    </div>
    
    
  );
}
