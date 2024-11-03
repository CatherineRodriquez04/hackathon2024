"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, firestore } from "../firebaseConfig"; // Ensure the path is correct
import { doc, setDoc, getDoc } from "firebase/firestore";
import dayjs from "dayjs";
import { guideProfiles } from "@/utils/scripts/generateGuides"; // Import guide profiles

export default function PreferencesPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [matchedGuides, setMatchedGuides] = useState([]);
  const [preferences, setPreferences] = useState({});

  // Fields for the preferences form
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [personality, setPersonality] = useState("");
  const [preference, setPreference] = useState("");
  const [habits, setHabits] = useState("");
  const [beliefs, setBeliefs] = useState("");
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        try {
          const docRef = doc(firestore, "userPreferences", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            // read preferences from Firestore
            const data = docSnap.data();
            setPreferences(data);
            matchGuides(preferences);
            setFormSubmitted(true);
          }
        } catch (error) {
          console.error("Error checking user preferences: ", error);
        }
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const greeting = () => {
    let hour = dayjs().get("hour");
    if (hour < 12) {
      return "Good Morning, ";
    } else if (hour < 18) {
      return "Good Afternoon, ";
    } else {
      return "Good Evening, ";
    }
  };

  const handleSubmit = async () => {
    if (user) {
      const userPreferences = {
        gender,
        country,
        personality,
        preference,
        habits,
        beliefs,
        languages: languages,
      };

      try {
        await setDoc(
          doc(firestore, "userPreferences", user.uid),
          userPreferences
        );
      } catch (error) {
        console.error("Error saving preferences: ", error);
        alert("Failed to save preferences. Please try again.");
      }

      setPreferences(userPreferences);
      matchGuides(userPreferences);
      setFormSubmitted(true);
    }
  };

  const handleLanguageChange = (e) => {
    const { options } = e.target;
    const selectedLanguages = [];
    for (const option of options) {
      if (option.selected) {
        selectedLanguages.push(option.value);
      }
    }
    setLanguages(selectedLanguages);
  };

  // Function to find matching guides based on user preferences
  const matchGuides = (preferences) => {
    const matched = guideProfiles.filter((guide) => {
      return guide.country === preferences.country;
    });
    console.log(matched);
    setMatchedGuides(matched);
  };

  if (formSubmitted) {
    return (
      <div className="container mx-auto p-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Your Preferences</h2>
          <div className="flex flex-wrap gap-4 bg-gray-100 p-4 rounded-lg">
            <p>
              <strong>Gender:</strong> {preferences.gender}
            </p>
            <p>
              <strong>Country:</strong> {preferences.country}
            </p>
            <p>
              <strong>Personality:</strong> {preferences.personality}
            </p>
            <p>
              <strong>Preference:</strong> {preferences.preference}
            </p>
            <p>
              <strong>Habits:</strong> {preferences.habits}
            </p>
            <p>
              <strong>Beliefs:</strong> {preferences.beliefs}
            </p>
            <p>
              <strong>Languages:</strong> {preferences.languages?.join(", ")}
            </p>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4">Matched Guides</h2>
        {matchedGuides.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {matchedGuides.map((guide) => (
              <div key={guide.id} className="p-4 border rounded shadow-md">
                <img
                  src={guide.photo}
                  alt={guide.name}
                  className="mb-2 rounded-full"
                />
                <h3 className="text-lg font-semibold">{guide.name}</h3>
                <p>{guide.bio}</p>
                <p>
                  <strong>Location:</strong> {guide.location}
                </p>
                <p>
                  <strong>Languages:</strong> {guide.language.join(", ")}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No matching guides found based on your preferences.</p>
        )}
      </div>
    );
  } else {
    return (
      <div className="container h-screen w-screen flex flex-col lg:flex-row items-center justify-center p-4 gap-8">
        {/* Greeting and text section */}
        <div className="lg:w-1/2 mb-8 lg:mb-0 text-center lg:text-left">
          <h2 className="text-2xl font-bold mb-4">
            {greeting() + user?.displayName}
          </h2>
          <h4 className="text-lg mb-6">
            Please fill out our preferences form so we can better match you with
            a mentor that you care about:
          </h4>
        </div>

        {/* Form section */}
        <form
          className="lg:w-1/2 w-full max-w-lg bg-white p-8 rounded-lg shadow-md"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="gender"
            >
              Gender
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="country"
            >
              Country to Visit
            </label>
            <select
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Country</option>
              <option value="United States">United States</option>
              <option value="France">France</option>
              <option value="Italy">Italy</option>
              <option value="Norway">Norway</option>
              <option value="Sweden">Sweden</option>
              <option value="Germany">Germany</option>
              <option value="Switzerland">Switzerland</option>
              <option value="England">England</option>
              <option value="Canada">Canada</option>
              <option value="China">China</option>
              <option value="South Korea">South Korea</option>
              <option value="Japan">Japan</option>
              <option value="India">India</option>
              <option value="Nepal">Nepal</option>
              <option value="Vietnam">Vietnam</option>
              <option value="Thailand">Thailand</option>
              <option value="Greece">Greece</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="languages"
            >
              Languages
            </label>
            <select
              id="languages"
              multiple
              value={languages}
              onChange={handleLanguageChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
              <option value="german">German</option>
              <option value="italian">Italian</option>
              <option value="russian">Russian</option>
              <option value="chinese">Chinese</option>
              <option value="japanese">Japanese</option>
              <option value="korean">Korean</option>
              <option value="arabic">Arabic</option>
              <option value="hindi">Hindi</option>
              <option value="portuguese">Portuguese</option>
              <option value="dutch">Dutch</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="personality"
            >
              Extrovert/Introvert
            </label>
            <select
              id="personality"
              value={personality}
              onChange={(e) => setPersonality(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Personality</option>
              <option value="extrovert">Extrovert</option>
              <option value="introvert">Introvert</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="preference"
            >
              Outdoor/Indoor
            </label>
            <select
              id="preference"
              value={preference}
              onChange={(e) => setPreference(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Preference</option>
              <option value="outdoor">Outdoor</option>
              <option value="indoor">Indoor</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="habits"
            >
              Smoking/Drinking
            </label>
            <select
              id="habits"
              value={habits}
              onChange={(e) => setHabits(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Habits</option>
              <option value="smoking">Smoking</option>
              <option value="drinking">Drinking</option>
              <option value="both">Both</option>
              <option value="none">None</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="beliefs"
            >
              Religious Beliefs
            </label>
            <select
              id="beliefs"
              value={beliefs}
              onChange={(e) => setBeliefs(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Religious Beliefs</option>
              <option value="Christianity">Christianity</option>
              <option value="Islam">Islam</option>
              <option value="Hinduism">Hinduism</option>
              <option value="Buddhism">Buddhism</option>
              <option value="Judaism">Judaism</option>
              <option value="Sikhism">Sikhism</option>
              <option value="Jainism">Jainism</option>
              <option value="Bahá&apos;í">Bahá&apos;í</option>
              <option value="Taoism">Taoism</option>
              <option value="No Preference">No Preference</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}
