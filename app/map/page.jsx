/** @format */

"use client";

import { useEffect, useState } from "react";
import { countries, countries_list } from "@/constants/country-data";
import { guideProfiles } from "@/utils/scripts/generateGuides";

import Image from "next/image";

export default function About() {
  const [countryInfo, setCountryInfo] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    const loadMap = () => {
      if (!document.getElementById("google-maps-script")) {
        const mapScript = document.createElement("script");
        mapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDhn_rFuizz3NL5W8Ksv6LCLviYhKql9X0`; // Replace with your Google Maps API key
        mapScript.async = true;
        mapScript.defer = true;
        mapScript.onload = initMap; // Call initMap once the script is loaded
        document.body.appendChild(mapScript);
      }
    };

    const initMap = () => {
      const mapOptions = {
        center: { lat: 20.5937, lng: 78.9629 }, // Default to India
        zoom: 2,
      };
      const initializedMap = new window.google.maps.Map(
        document.getElementById("map"),
        mapOptions
      );
      setMap(initializedMap); // Store the map instance in state
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
    setCountryInfo(countries[selected]);

    // Update map center and add marker for the selected country
    if (map && selected) {
      const { lat, lng } = countries[selected].coordinates;
      map.setCenter({ lat, lng });
      map.setZoom(5); // Adjust zoom level as needed

      // If a marker already exists, remove it before adding a new one
      if (marker) {
        marker.setMap(null);
      }

      // Create a new marker at the selected country's coordinates
      const newMarker = new window.google.maps.Marker({
        position: { lat, lng },
        map: map,
        title: selected,
      });

      setMarker(newMarker); // Store the marker in state
    }
  };

  return (
    <div className="mt-6 mb-[150px]">
      <h1 className="h1 text-[30px]">Plan your next Adventure!</h1>

      {/* Country Selector */}
      <div className="relative z-10 mt-3">
        <select
          value={selectedCountry}
          onChange={handleCountrySelect}
          className="p-3 border border-gray-300 rounded-md shadow-md"
        >
          <option value="">Select a Country...</option>
          {countries_list.map(({ name: countryName }) => {
            return (
              <option
                key={countryName}
                value={countryName}
              >
                {countryName}
              </option>
            );
          })}
        </select>
      </div>

      {/* Map will be rendered here (attaches here) */}
      <div
        id="map"
        className="h-[400px] w-full mt-4 relative z-0"
      />

      {countryInfo && (
        <div className="flex flex-col items-center justify-center mt-6 space-x-4">
          <div className="flex flex-row">
            {/* Flag */}
            <Image
              src={countryInfo.flags}
              alt={`${countryInfo.capital} flag`}
              width={80}
              height={80}
            />

            {/* Country Info */}
            <div className="text-left">
              <h2 className="text-xl font-bold">{countryInfo.touristSpot}</h2>
              <p>
                <strong>Capital:</strong> {countryInfo.capital}
              </p>
              <p>
                <strong>Population:</strong> {countryInfo.population}
              </p>
              <p>
                <strong>Area:</strong> {countryInfo.area}
              </p>
              <p>
                <strong>Region:</strong> {countryInfo.region}
              </p>
            </div>

            {/* Tourist Spot Image */}
            <div className="-mb-10">
              <Image
                src={countryInfo.touristImage}
                alt={countryInfo.touristSpot}
                height={200}
                width={275}
                className=""
              />
              <p className="text-accent font-semibold">
                {countryInfo.touristSpot.name}
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold">Guides</h2>

            <div className="flex flex-col flex-grow">
              {guideProfiles.map((profile) => {
                if (profile.country === selectedCountry) {
                  return (
                    <div
                      key={profile.id}
                      className="flex flex-row items-center mb-2 border border-gray-300 shadow-sm p-2 rounded"
                    >
                      <Image
                        src={profile.photo}
                        width={40}
                        height={40}
                        alt="Profile Picture"
                      />
                      <div className="flex flex-col ml-2">
                        <h1 className="font-semibold">{profile.name}</h1>
                        <p className="text-gray-600">{profile.bio}</p>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
