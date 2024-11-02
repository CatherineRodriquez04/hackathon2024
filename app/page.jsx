"use client";
import ImageTransition from "@/components/ImageTransition";

export default function Home() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Background image component */}
      <div className="flex xl:flex-row gap-3 justify-center relative z-10 mt-6">
        

        {/* Foreground Image with overlap effect */}
        <div className="flex-1 my-[100px] mx-[100px] relative -ml-40">
          <ImageTransition />
        </div>
      </div>
    </div>
  );
}