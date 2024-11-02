// components/ImageTransition.jsx
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Beach from "../public/assets/beach.webp";
import TempK from "../public/assets/KarlTemp.jpg";

const images = [Beach, TempK]; // Add more images as needed

export default function ImageTransition() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setOpacity(0); // Fade out

      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setOpacity(1); // Fade in
      }, 750); // Duration of the fade out transition
    }, 7500); // Change every 15 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full">
      <Image
        src={images[currentImageIndex]}
        alt="Transitioning Background"
        width={700}
        height={700}
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out`}
        style={{ opacity }}
      />
    </div>
  );
}
