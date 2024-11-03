/** @format */

"use client";
import ImageTransition from "@/components/ImageTransition";

export default function Home() {
  return (
    <div className="relative mt-8">
      <div className="flex xl:flex-row xl:gap-[200px] gap-[50px]">
        <div className="bg-blue-200 w-full xl:w-1/2 h-[80vh] transform -translate-y-8">
          {" "}
          {/* Blue Box with 80% height shifted up */}
          {/* Content for the blue box goes here */}
        </div>
        <div className="bg-green-100 w-full xl:w-1/2 h-[80vh] transform translate-y-8">
          {" "}
          {/* Green Box with 80% height shifted down */}
          {/* Content for the green box goes here */}
        </div>

        {/* Overlay Box */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-90 border border-gray-300 p-10 rounded-xl shadow-2xl text-center z-10">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            Plan Your Dream Vacation
          </h2>
          <p className="text-gray-600 text-lg">
            Connect with your perfect guide and discover expert tips and tricks
            to elevate your travel experience. Your adventure awaits!
          </p>
        </div>
      </div>
    </div>
  );
}
