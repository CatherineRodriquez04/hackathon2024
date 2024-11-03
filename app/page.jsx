"use client";
import ImageTransition from "@/components/ImageTransition";

export default function Home() {
  return (
    <div className="relative h-screen w-screen overflow-hidden mt-8">
      <div className="flex xl:flex-row xl:gap-[200px] gap-[50px]">
          <div className="bg-blue-200 w-full xl:w-1/2 h-[80vh] transform -translate-y-8"> {/* Blue Box with 80% height shifted up */}
              {/* Content for the blue box goes here */}
          </div>
          <div className="bg-green-100 w-full xl:w-1/2 h-[80vh] transform translate-y-8"> {/* Green Box with 80% height shifted down */}
              {/* Content for the green box goes here */}
          </div>
      </div>
    </div>
  );
}
