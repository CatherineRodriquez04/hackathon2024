// components/ImageTransition.jsx
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import EAfrica from "../public/assets/Regions/Africa/East Africa/east-africa.jpg";
import CAfrica from "../public/assets/Regions/Africa/Central Africa/centralafrica.jpg";
import NAfrica from "../public/assets/Regions/Africa/Northern Africa/north-africa.jpg";
import WAfrica from "../public/assets/Regions/Africa/West Africa/west-africa.jpg";
import Italy from "../public/assets/Regions/Europe/Italy/Vatican City/vatican-City.jpg";
import Swedan from "../public/assets/Regions/Europe/Nordic Region/swedan.jpg";
import WEurope from "../public/assets/Regions/Europe/West Europe/west-europe.jpg";
import Greece from "../public/assets/Regions/Mediterranean/greece.jpg";
import Canada from "../public/assets/Regions/North America/Canada/canada.jpg";
import EAsia from "../public/assets/Regions/Asia/East Asia/east-asia.jpg";
import EAsia2 from "../public/assets/Regions/Asia/East Asia/east-asia-2.jpg";
import MEast from "../public/assets/Regions/Asia/Middle East/middle-east.jpg";
import SAsia from "../public/assets/Regions/Asia/South Asia/south-asia.jpg";
import SAsia2 from "../public/assets/Regions/Asia/South Asia/south-asia-2.jpg";
import SEastAsia from "../public/assets/Regions/Asia/Southeast Asia/southeast.jpg";

const images = [EAfrica, EAsia2, CAfrica, NAfrica, MEast, WAfrica, Italy, Swedan, SAsia, WEurope, SEastAsia, Greece, SAsia2, Canada, EAsia]; // Add more images as needed

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
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out rounded-lg`}
        style={{ opacity }}
      />
    </div>
  );
}
