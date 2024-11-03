/** @format */

"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { HiOutlineChevronRight } from "react-icons/hi"; // Import an arrow icon

export default function Home() {
  useEffect(() => {
    // save guide data to firestore
    // saveGuidesToFirestore();
  }, []);

  const [isGuidePopupOpen, setIsGuidePopupOpen] = useState(false);
  const [isMapPopupOpen, setIsMapPopupOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const aboutRef = useRef(null); // Create a ref for the About section

  const handleGuidePopupToggle = () => {
    setIsGuidePopupOpen(!isGuidePopupOpen);
  };

  const handleMapPopupToggle = () => {
    setIsMapPopupOpen(!isMapPopupOpen);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Set visibility based on intersection state
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // Trigger when 10% of the section is visible
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current); // Observe the About section
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current); // Cleanup observer on unmount
      }
    };
  }, [aboutRef]);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Main Section with Background Video */}
      <div className="relative w-full h-[calc(100vh-4rem)] overflow-hidden">
        {/* Background Video */}
        <video
          className="rounded-lg absolute inset-0 w-screen h-full object-cover z-0"
          autoPlay
          loop
          muted
          style={{ margin: 0 }} // Ensure no margins
        >
          <source src="/assets/Cover-Video.mp4" type="video/mp4" />{" "}
          {/* Reference the video path */}
          Your browser does not support the video tag.
        </video>

        {/* Dimming Overlay */}
        <div className="absolute inset-0 w-full h-full bg-white bg-opacity-50 z-10"></div>

        {/* Main Content Overlay */}
        <div className="flex flex-col items-center justify-center h-full relative z-20">
          {/* White Overlay Box */}
          <div className="relative bg-white bg-opacity-75 border-[3px] p-10 rounded-xl shadow-2xl text-center max-w-xl mx-auto border-accent transition-transform duration-300 ease-in-out hover:scale-105">
            {/* Traveler Icon in Circular Orange Background */}
            <div className="absolute -top-[30px] -left-[40px] w-[100px] h-[100px] bg-accent opacity-100 rounded-full flex items-center justify-center">
              <Image
                src="/assets/traveler-icon.webp"
                alt="Traveler Icon"
                width={80}
                height={80}
                className="rounded-full"
              />
            </div>

            <h2 className="text-4xl font-semibold mb-6 text-gray-800">
              Plan Your Dream Vacation
            </h2>
            <p className="text-gray-600 text-xl">
              Connect with your perfect guide and discover expert tips and
              tricks to elevate your travel experience. Your adventure awaits!
            </p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div
        ref={aboutRef} // Attach the ref to the About section
        id="about"
        className={`flex flex-col lg:flex-row justify-start items-start p-10 mt-10 bg-white bg-opacity-90 z-20 transition-opacity duration-700 ease-in-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Left Side Content */}
        <div className="flex-1 mb-4 lg:mb-0 pr-16 flex items-start relative">
          {" "}
          {/* Flex container to align items */}
          <div className="absolute left-0 top-0 border-l-4 border-accent h-full"></div>{" "}
          {/* Vertical orange line */}
          <div className="pl-6">
            {" "}
            {/* Content container with left padding */}
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Tailored Travel Guided by Locals
            </h2>
            <p className="text-gray-700 mb-2">
              Our platform connects you with passionate individuals living in
              the countries you wish to explore. They bring personal experiences
              and insights to make your journey truly unique.
            </p>
            <p className="text-gray-700">
              With our hands-on approach, world-class volunteers are genuinely
              dedicated to ensuring your satisfaction. We strive to provide
              exceptional value and unmatched service, crafting singular
              experiences for travelers and creating a vibrant social platform
              where every user has the opportunity to become a guide.
            </p>
          </div>
        </div>

        {/* Right Side - Personalized Guide Matching Box */}
        <div className="flex-1">
          {/* Personalized Guide Matching Box */}
          <div
            className="relative p-6 rounded-xl shadow-2xl transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer flex justify-between items-center"
            onClick={handleGuidePopupToggle}
          >
            <h3 className="text-xl font-semibold text-gray-800">
              Personalized Guide Matching
            </h3>
            {/* Arrow centered on the right */}
            <HiOutlineChevronRight className="text-accent w-8 h-8" />
          </div>

          {/* Interactive Map Feature Box */}
          <div
            className="relative p-6 mt-4 rounded-xl shadow-2xl transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer flex justify-between items-center"
            onClick={handleMapPopupToggle}
          >
            <h3 className="text-xl font-semibold text-gray-800">
              Interactive Map
            </h3>
            {/* Arrow centered on the right */}
            <HiOutlineChevronRight className="text-accent w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Popup for Personalized Guide Matching */}
      {isGuidePopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto relative">
            <button
              className="absolute top-2 right-2 text-orange-500 hover:text-gray-800 text-3xl" // Change color to orange
              onClick={handleGuidePopupToggle}
            >
              &times;
            </button>
            <h3 className="text-2xl font-semibold mb-4">
              Personalized Guide Matching
            </h3>
            <p className="text-gray-700 mb-4">
              We match you with guides based on your personal preferences for
              traveling. Whether you seek adventure, relaxation, cultural
              immersion, or culinary exploration, our system ensures that you
              connect with a local guide who shares your interests.
            </p>
            <p className="text-gray-700 mb-4">
              Enjoy a curated travel experience tailored just for you, and
              discover hidden gems that only locals know about. Your journey is
              personal, and so should be your guide!
            </p>
          </div>
        </div>
      )}

      {/* Popup for Interactive Map Feature */}
      {isMapPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto relative">
            <button
              className="absolute top-2 right-2 text-orange-500 hover:text-gray-800 text-3xl" // Change color to orange
              onClick={handleMapPopupToggle}
            >
              &times;
            </button>
            <h3 className="text-2xl font-semibold mb-4">Interactive Map</h3>
            <p className="text-gray-700 mb-4">
              Explore our interactive map that showcases the countries where our
              dedicated guides are currently volunteering. Select a country to
              view interesting facts and highlights, along with one popular
              tourist spot to enrich your travel planning.
            </p>
            <p className="text-gray-700 mb-4">
              This feature allows you to visualize the opportunities available
              to you, ensuring that your travel experience is not just
              informative but also enjoyable and engaging.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
