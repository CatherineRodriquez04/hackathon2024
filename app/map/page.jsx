"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

//images
import GrandCanyon from "@/public/touristSpot/grand-canyon.jpg"
import EiffelTower from "@/public/touristSpot/eiffel-tower.webp"
import Colosseum from "@/public/touristSpot/colosseum.jpg"
import Fjords from "@/public/touristSpot/fjords.jpg"
import Vasa from "@/public/touristSpot/vasa.webp"
import Brandenburg from "@/public/touristSpot/brandenburg.jpg"
import Matterhorn from "@/public/touristSpot/matterhorn.jpg"
import BigBen from "@/public/touristSpot/big-ben.jpg"
import Niagara from "@/public/touristSpot/niagara.jpg"
import GreatWalls from "@/public/touristSpot/great-wall-of-china.webp"
import Gyeongbokgung from "@/public/touristSpot/gyeongbokgung.webp"
import MountFuji from "@/public/touristSpot/mount-fuji.webp"
import Taj from "@/public/touristSpot/taj.jpg"
import Everest from "@/public/touristSpot/everest.jpg"
import HaLong from "@/public/touristSpot/ha-long.jpg"
import Phi from "@/public/touristSpot/phi.jpg"
import Acropolis from "@/public/touristSpot/acropolis.jpg"

export default function About() {
  const [countryInfo, setCountryInfo] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  const countryData = {
    "United States": {
      country: "United States",
      flags: "https://flagcdn.com/us.svg",
      capital: "Washington, D.C.",
      population: "331 million",
      area: "9.834 million km²",
      region: "Americas",
      languages: ["English"],
      coordinates: { lat: 38.8951, lng: -77.0364 },
      touristSpot: {
        name: "Grand Canyon",
        imageURL: GrandCanyon,
      },
    },
    "France": {
      country: "France",
      flags: "https://flagcdn.com/fr.svg",
      capital: "Paris",
      population: "67 million",
      area: "551,695 km²",
      region: "Europe",
      languages: ["French"],
      coordinates: { lat: 48.8566, lng: 2.3522 },
      touristSpot: {
        name: "Eiffel Tower",
        imageURL: EiffelTower,
      },
    },
    "Italy": {
      country: "Italy",
      flags: "https://flagcdn.com/it.svg",
      capital: "Rome",
      population: "60 million",
      area: "301,340 km²",
      region: "Europe",
      languages: ["Italian"],
      coordinates: { lat: 41.9028, lng: 12.4964 },
      touristSpot: {
        name: "Colosseum",
        imageURL: Colosseum,
      },
    },
    "Norway": {
      country: "Norway",
      flags: "https://flagcdn.com/no.svg",
      capital: "Oslo",
      population: "5.4 million",
      area: "323,802 km²",
      region: "Europe",
      languages: ["Norwegian"],
      coordinates: { lat: 59.9139, lng: 10.7522 },
      touristSpot: {
        name: "Fjords of Norway",
        imageURL: Fjords,
      },
    },
    "Sweden": {
      country: "Sweden",
      flags: "https://flagcdn.com/se.svg",
      capital: "Stockholm",
      population: "10.3 million",
      area: "450,295 km²",
      region: "Europe",
      languages: ["Swedish"],
      coordinates: { lat: 59.3293, lng: 18.0686 },
      touristSpot: {
        name: "Vasa Museum",
        imageURL: Vasa,
      },
    },
    "Germany": {
      country: "Germany",
      flags: "https://flagcdn.com/de.svg",
      capital: "Berlin",
      population: "83 million",
      area: "357,022 km²",
      region: "Europe",
      languages: ["German"],
      coordinates: { lat: 52.5200, lng: 13.4050 },
      touristSpot: {
        name: "Brandenburg Gate",
        imageURL: Brandenburg,
      },
    },
    "Switzerland": {
      country: "Switzerland",
      flags: "https://flagcdn.com/ch.svg",
      capital: "Bern",
      population: "8.5 million",
      area: "41,290 km²",
      region: "Europe",
      languages: ["German", "French", "Italian", "Romansh"],
      coordinates: { lat: 46.9480, lng: 7.4474 },
      touristSpot: {
        name: "Matterhorn",
        imageURL: Matterhorn,
      },
    },
    "England": {
      country: "England",
      flags: "https://flagcdn.com/gb-eng.svg",
      capital: "London",
      population: "56 million",
      area: "130,395 km²",
      region: "Europe",
      languages: ["English"],
      coordinates: { lat: 51.5074, lng: -0.1278 },
      touristSpot: {
        name: "Big Ben",
        imageURL: BigBen,
      },
    },
    "Canada": {
      country: "Canada",
      flags: "https://flagcdn.com/ca.svg",
      capital: "Ottawa",
      population: "38 million",
      area: "9.985 million km²",
      region: "Americas",
      languages: ["English", "French"],
      coordinates: { lat: 45.4215, lng: -75.6972 },
      touristSpot: {
        name: "Niagara Falls",
        imageURL: Niagara,
      },
    },
    "China": {
      country: "China",
      flags: "https://flagcdn.com/cn.svg",
      capital: "Beijing",
      population: "1.4 billion",
      area: "9.597 million km²",
      region: "Asia",
      languages: ["Mandarin"],
      coordinates: { lat: 39.9042, lng: 116.4074 },
      touristSpot: {
        name: "Great Wall of China",
        imageURL: GreatWalls,
      },
    },
    "South Korea": {
      country: "South Korea",
      flags: "https://flagcdn.com/kr.svg",
      capital: "Seoul",
      population: "51 million",
      area: "100,210 km²",
      region: "Asia",
      languages: ["Korean"],
      coordinates: { lat: 37.5665, lng: 126.9780 },
      touristSpot: {
        name: "Gyeongbokgung Palace",
        imageURL: Gyeongbokgung,
      },
    },
    "Japan": {
      country: "Japan",
      flags: "https://flagcdn.com/jp.svg",
      capital: "Tokyo",
      population: "126 million",
      area: "377,975 km²",
      region: "Asia",
      languages: ["Japanese"],
      coordinates: { lat: 35.6895, lng: 139.6917 },
      touristSpot: {
        name: "Mount Fuji",
        imageURL: MountFuji,
      },
    },
    "India": {
      country: "India",
      flags: "https://flagcdn.com/in.svg",
      capital: "New Delhi",
      population: "1.366 billion",
      area: "3.287 million km²",
      region: "Asia",
      languages: ["Hindi", "English"],
      coordinates: { lat: 28.6139, lng: 77.2090 },
      touristSpot: {
        name: "Taj Mahal",
        imageURL: Taj,
      },
    },
    "Nepal": {
      country: "Nepal",
      flags: "https://flagcdn.com/np.svg",
      capital: "Kathmandu",
      population: "30 million",
      area: "147,516 km²",
      region: "Asia",
      languages: ["Nepali"],
      coordinates: { lat: 27.7172, lng: 85.3240 },
      touristSpot: {
        name: "Mount Everest",
        imageURL: Everest,
      },
    },
    "Vietnam": {
      country: "Vietnam",
      flags: "https://flagcdn.com/vn.svg",
      capital: "Hanoi",
      population: "97 million",
      area: "331,210 km²",
      region: "Asia",
      languages: ["Vietnamese"],
      coordinates: { lat: 21.0285, lng: 105.8542 },
      touristSpot: {
        name: "Ha Long Bay",
        imageURL: HaLong,
      },
    },
    "Thailand": {
      country: "Thailand",
      flags: "https://flagcdn.com/th.svg",
      capital: "Bangkok",
      population: "69 million",
      area: "513,120 km²",
      region: "Asia",
      languages: ["Thai"],
      coordinates: { lat: 13.7563, lng: 100.5018 },
      touristSpot: {
        name: "Phi Phi Islands",
        imageURL: Phi,
      },
    },
    "Greece": {
      country: "Greece",
      flags: "https://flagcdn.com/gr.svg",
      capital: "Athens",
      population: "10 million",
      area: "131,957 km²",
      region: "Europe",
      languages: ["Greek"],
      coordinates: { lat: 37.9838, lng: 23.7275 },
      touristSpot: {
        name: "Acropolis",
        imageURL: Acropolis,
      },
    },
  };
  

  useEffect(() => {
    const loadMap = () => {
      if (!document.getElementById("google-maps-script")) {
        const mapScript = document.createElement("script");
        mapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDhn_rFuizz3NL5W8Ksv6LCLviYhKql9X0`; // Replace with your Google Maps API key
        mapScript.async = true;
        mapScript.defer = true;
        mapScript.onload = initMap;
        document.body.appendChild(mapScript);
      }
    };

    const initMap = () => {
      const mapOptions = {
        center: { lat: 20.5937, lng: 78.9629 },
        zoom: 2,
      };
      const initializedMap = new window.google.maps.Map(document.getElementById("map"), mapOptions);
      setMap(initializedMap);
    };

    loadMap();

    return () => {
      const script = document.getElementById("google-maps-script");
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleCountrySelect = (e) => {
    const selected = e.target.value;
    setSelectedCountry(selected);
    setCountryInfo(countryData[selected]);

    if (map && selected) {
      const { lat, lng } = countryData[selected].coordinates;
      map.setCenter({ lat, lng });
      map.setZoom(5);

      if (marker) {
        marker.setMap(null);
      }

      const newMarker = new window.google.maps.Marker({
        position: { lat, lng },
        map: map,
        title: selected,
      });

      setMarker(newMarker);
    }
  };

  return (
    <div className="container h-screen w-screen text-center mt-6">
      <h1 className="h1 text-[30px]">Choose you location to </h1>
      
      {/* Country Selector */}
      <div className="relative z-10 mt-3">
        <select
          value={selectedCountry}
          onChange={handleCountrySelect}
          className="p-3 border border-gray-300 rounded-md shadow-md"
        >
          <option value="">Select a Country...</option>
          {Object.keys(countryData).map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      
      <div id="map" className="h-[400px] w-full mt-4 relative z-0">
        {/* Map will be rendered here */}
      </div>

      {countryInfo && (
        <div className="flex items-center gap-[60px] justify-center mt-6 space-x-4">
          {/* Flag */}
          <img src={countryInfo.flags} alt={`${countryInfo.country} flag`} className="h-[175px] w-[300px] object-cover border border-gray-500" />

          {/* Country Info */}
          <div className="text-center">
            <h2 className="text-2xl text-accent2 font-semibold">{countryInfo.country}</h2>
            <p><strong>Capital:</strong> {countryInfo.capital}</p>
            <p><strong>Population:</strong> {countryInfo.population}</p>
            <p><strong>Area:</strong> {countryInfo.area}</p>
            <p><strong>Region:</strong> {countryInfo.region}</p>
            <p><strong>Languages:</strong> {countryInfo.languages.join(", ")}</p>
          </div>

          {/* Tourist Spot Image */}
          <div className="-mb-10">
            <Image
              src={countryInfo.touristSpot.imageURL}
              alt={countryInfo.touristSpot.name}
              height={200}
              width={275}
              className=""
            />
            <p className="text-accent font-semibold">{countryInfo.touristSpot.name}</p>
          </div>
        </div>
      )}
    </div>
  );
}