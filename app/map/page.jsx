"use client";

import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    // Load Google Maps and Places scripts
    const loadMap = () => {
      const mapScript = document.createElement("script");
      mapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDhn_rFuizz3NL5W8Ksv6LCLviYhKql9X0&libraries=places&callback=initMap`;
      mapScript.async = true;
      document.body.appendChild(mapScript);
    };

    // Initialize map
    window.initMap = function () {
      const mapOptions = {
        center: { lat: 29.9511, lng: -90.0715 }, // Example coordinates (New Orleans)
        zoom: 12,
      };
      const map = new window.google.maps.Map(document.getElementById("map"), mapOptions);

      // Add a search box
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = "Search for a location...";
      input.className = "mt-4 p-2 border border-gray-300 rounded-md shadow-md w-64"; // Tailwind styling
      document.getElementById("map").appendChild(input);

      const searchBox = new window.google.maps.places.SearchBox(input);
      map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(input);

      // Listen for the event when the user selects a prediction from the pick list
      searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();
        if (places.length === 0) return;

        // Clear out the old markers.
        const markers = [];
        places.forEach(place => {
          if (!place.geometry) return;

          // Create a marker for each place
          const marker = new window.google.maps.Marker({
            map,
            title: place.name,
            position: place.geometry.location,
          });
          markers.push(marker);

          // Adjust the map to fit the markers
          map.setCenter(place.geometry.location);
          map.setZoom(14);
        });
      });

      // Set current location button
      const locationButton = document.createElement("button");
      locationButton.textContent = "Use Current Location";
      locationButton.className = "mt-4 p-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600"; // Tailwind styling
      map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(locationButton);

      locationButton.addEventListener("click", () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            // Set the map's center to the user's current location
            map.setCenter(pos);
            new window.google.maps.Marker({
              position: pos,
              map,
              title: "You are here!",
            });
          }, () => {
            handleLocationError(true, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, map.getCenter());
        }
      });
    };

    loadMap();
  }, []);

  const handleLocationError = (browserHasGeolocation, pos) => {
    const infoWindow = new window.google.maps.InfoWindow({
      content: browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation.",
      position: pos,
    });
    infoWindow.open();
  };

  return (
    <div className="container h-screen w-screen text-center mt-6 mb-[150px]">
      <h1 className="h1 text-[30px]">Plan your next Adventure!</h1>
      <div id="map" className="h-full w-full mt-4"></div>
    </div>
  );
}
