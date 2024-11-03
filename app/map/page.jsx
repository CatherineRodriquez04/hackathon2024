"use client";

import { useEffect, useState } from "react";

export default function About() {
  const [countryInfo, setCountryInfo] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  const countryData = {
    "United States": {
      flags: "https://flagcdn.com/us.svg",
      capital: "Washington, D.C.",
      population: "331 million",
      area: "9.834 million km²",
      region: "Americas",
      touristSpot: "Statue of Liberty",
      touristImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Statue_of_Liberty_%28cropped%29.jpg/800px-Statue_of_Liberty_%28cropped%29.jpg",
      coordinates: { lat: 37.0902, lng: -95.7129 }
    },
    "France": {
      flags: "https://flagcdn.com/fr.svg",
      capital: "Paris",
      population: "67 million",
      area: "551,695 km²",
      region: "Europe",
      touristSpot: "Eiffel Tower",
      touristImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Tour_Eiffel_Wikimedia_Commons.jpg/800px-Tour_Eiffel_Wikimedia_Commons.jpg",
      coordinates: { lat: 48.8566, lng: 2.3522 }
    },
    "Italy": {
      flags: "https://flagcdn.com/it.svg",
      capital: "Rome",
      population: "60 million",
      area: "301,340 km²",
      region: "Europe",
      touristSpot: "Colosseum",
      touristImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Colosseo_2021.jpg/800px-Colosseo_2021.jpg",
      coordinates: { lat: 41.9028, lng: 12.4964 }
    },
    "Norway": {
      flags: "https://flagcdn.com/no.svg",
      capital: "Oslo",
      population: "5.4 million",
      area: "323,802 km²",
      region: "Europe",
      touristSpot: "Fjord of Norway",
      touristImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Norway_Fjord.jpg/800px-Norway_Fjord.jpg",
      coordinates: { lat: 60.4720, lng: 8.4689 }
    },
    "Sweden": {
      flags: "https://flagcdn.com/se.svg",
      capital: "Stockholm",
      population: "10.3 million",
      area: "450,295 km²",
      region: "Europe",
      touristSpot: "Vasa Museum",
      touristImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Vasa_Museum%2C_Stockholm_%2811416971982%29.jpg/800px-Vasa_Museum%2C_Stockholm_%2811416971982%29.jpg",
      coordinates: { lat: 60.1282, lng: 18.6435 }
    },
    "Germany": {
      flags: "https://flagcdn.com/de.svg",
      capital: "Berlin",
      population: "83 million",
      area: "357,022 km²",
      region: "Europe",
      touristSpot: "Brandenburg Gate",
      touristImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Brandenburg_Gate_at_night.jpg/800px-Brandenburg_Gate_at_night.jpg",
      coordinates: { lat: 51.1657, lng: 10.4515 }
    },
    "Switzerland": {
      flags: "https://flagcdn.com/ch.svg",
      capital: "Bern",
      population: "8.5 million",
      area: "41,290 km²",
      region: "Europe",
      touristSpot: "Matterhorn",
      touristImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Matterhorn%2C_Val_Tournenche%2C_Italy_-_by_R_M_A.jpg/800px-Matterhorn%2C_Val_Tournenche%2C_Italy_-_by_R_M_A.jpg",
      coordinates: { lat: 46.8182, lng: 8.2275 }
    },
    "England": {
      flags: "https://flagcdn.com/gb-eng.svg",
      capital: "London",
      population: "56 million",
      area: "130,395 km²",
      region: "Europe",
      touristSpot: "Big Ben",
      touristImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Big_Ben%2C_London%2C_England_%28cropped%29.jpg/800px-Big_Ben%2C_London%2C_England_%28cropped%29.jpg",
      coordinates: { lat: 51.509865, lng: -0.118092 }
    },
    "Canada": {
      flags: "https://flagcdn.com/ca.svg",
      capital: "Ottawa",
      population: "38 million",
      area: "9.985 million km²",
      region: "Americas",
      touristSpot: "CN Tower",
      touristImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/CN_Tower_%28cropped%29.jpg/800px-CN_Tower_%28cropped%29.jpg",
      coordinates: { lat: 56.1304, lng: -106.3468 }
    },
    "China": {
      flags: "https://flagcdn.com/cn.svg",
      capital: "Beijing",
      population: "1.4 billion",
      area: "9.597 million km²",
      region: "Asia",
      touristSpot: "Great Wall of China",
      touristImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Great_Wall_of_China_%28cropped%29.jpg/800px-Great_Wall_of_China_%28cropped%29.jpg",
      coordinates: { lat: 35.8617, lng: 104.1954 }
    },
    "South Korea": {
      flags: "https://flagcdn.com/kr.svg",
      capital: "Seoul",
      population: "51 million",
      area: "100,210 km²",
      region: "Asia",
      touristSpot: "Gyeongbokgung Palace",
      touristImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Gyeongbokgung%2C_Seoul_%2819455256857%29.jpg/800px-Gyeongbokgung%2C_Seoul_%2819455256857%29.jpg",
      coordinates: { lat: 35.9078, lng: 127.7669 }
    },
    "Japan": {
      flags: "https://flagcdn.com/jp.svg",
      capital: "Tokyo",
      population: "126 million",
      area: "377,975 km²",
      region: "Asia",
      touristSpot: "Mount Fuji",
      touristImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Mount_Fuji_%28cropped%29.jpg/800px-Mount_Fuji_%28cropped%29.jpg",
      coordinates: { lat: 36.2048, lng: 138.2529 }
    },
    "India": {
      flags: "https://flagcdn.com/in.svg",
      capital: "New Delhi",
      population: "1.366 billion",
      area: "3.287 million km²",
      region: "Asia",
      touristSpot: "Taj Mahal",
      touristImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Taj_Mahal_%28cropped%29.jpg/800px-Taj_Mahal_%28cropped%29.jpg",
      coordinates: { lat: 20.5937, lng: 78.9629 }
    },
    "Nepal": {
      flags: "https://flagcdn.com/np.svg",
      capital: "Kathmandu",
      population: "30 million",
      area: "147,516 km²",
      region: "Asia",
      touristSpot: "Mount Everest",
      touristImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Mount_Everest_%28cropped%29.jpg/800px-Mount_Everest_%28cropped%29.jpg",
      coordinates: { lat: 28.3949, lng: 84.1240 }
    },
    "Vietnam": {
      flags: "https://flagcdn.com/vn.svg",
      capital: "Hanoi",
      population: "97 million",
      area: "331,210 km²",
      region: "Asia",
      touristSpot: "Halong Bay",
      touristImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Halong_Bay_%28cropped%29.jpg/800px-Halong_Bay_%28cropped%29.jpg",
      coordinates: { lat: 14.0583, lng: 108.2772 }
    },
    "Thailand": {
      flags: "https://flagcdn.com/th.svg",
      capital: "Bangkok",
      population: "69 million",
      area: "513,120 km²",
      region: "Asia",
      touristSpot: "Grand Palace",
      touristImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Grand_Palace_Bangkok_%28cropped%29.jpg/800px-Grand_Palace_Bangkok_%28cropped%29.jpg",
      coordinates: { lat: 15.8700, lng: 100.9925 }
    },
    "Greece": {
      flags: "https://flagcdn.com/gr.svg",
      capital: "Athens",
      population: "10.4 million",
      area: "131,957 km²",
      region: "Europe",
      touristSpot: "Acropolis of Athens",
      touristImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Acropolis_of_Athens_%28cropped%29.jpg/800px-Acropolis_of_Athens_%28cropped%29.jpg",
      coordinates: { lat: 37.9838, lng: 23.7275 }
    }
  };

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
      const initializedMap = new window.google.maps.Map(document.getElementById("map"), mapOptions);
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
    setCountryInfo(countryData[selected]);

    // Update map center and add marker for the selected country
    if (map && selected) {
      const { lat, lng } = countryData[selected].coordinates;
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
    <div className="container h-screen w-screen text-center mt-6 mb-[150px]">
      <h1 className="h1 text-[30px]">Plan your next Adventure!</h1>
      
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
        <div className="flex items-center justify-center mt-6 space-x-4">
          {/* Flag */}
          <img src={countryInfo.flags} alt={`${countryInfo.capital} flag`} className="h-20 w-20 object-cover" />

          {/* Country Info */}
          <div className="text-left">
            <h2 className="text-xl font-bold">{countryInfo.touristSpot}</h2>
            <p><strong>Capital:</strong> {countryInfo.capital}</p>
            <p><strong>Population:</strong> {countryInfo.population}</p>
            <p><strong>Area:</strong> {countryInfo.area}</p>
            <p><strong>Region:</strong> {countryInfo.region}</p>
          </div>

          {/* Tourist Spot Image */}
          <img
            src={countryInfo.touristImage}
            alt={`${countryInfo.touristSpot}`}
            className="h-24 w-36 object-cover rounded-lg shadow-md"
          />
        </div>
      )}
    </div>
  );
}