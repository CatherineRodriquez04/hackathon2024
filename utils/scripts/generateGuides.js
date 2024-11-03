/** @format */

import { faker } from "@faker-js/faker";
import { countries_list } from "@/constants/country-data";
import { firestore } from "@/app/firebaseConfig";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

// Further Expanded Bio Generator
function generateEnglishBio() {
  const intros = [
    "Passionate traveler and experienced guide.",
    "Lover of cultural exchanges and unique experiences.",
    "Explorer with a deep love for history and nature.",
    "Adventurous spirit with a love for the unknown.",
    "Dedicated to sharing unforgettable moments.",
    "A storyteller who brings local culture to life.",
    "Skilled traveler with a passion for new places.",
    "An explorer at heart with knowledge of local secrets.",
    "Friendly face ready to show you the hidden gems.",
    "Committed to turning your trip into an adventure.",
    "Experienced in crafting memorable travel experiences.",
    "Always excited to share my love for this place.",
    "A guide who believes in the magic of new journeys.",
    "Local expert ready to introduce you to real culture.",
    "Travel enthusiast and local ambassador.",
  ];

  const expertises = [
    "Specializes in historical tours and cultural experiences.",
    "Experienced in guiding adventure and nature tours.",
    "Focused on providing authentic local experiences.",
    "Skilled in creating personalized travel itineraries.",
    "Expert in outdoor adventures and cultural highlights.",
    "Brings a deep knowledge of local customs and cuisine.",
    "An expert in art, history, and breathtaking landmarks.",
    "Passionate about offering a glimpse into local life.",
    "Helps travelers discover both iconic and hidden spots.",
    "Excels in outdoor, wildlife, and nature-focused tours.",
    "Customizes each tour to suit different interests.",
    "A go-to guide for family-friendly travel experiences.",
    "Experienced with solo travelers, families, and groups.",
    "Ensures every journey is educational and exciting.",
    "Tailors experiences to reveal the unique charms of each place.",
  ];

  const personalities = [
    "Friendly, knowledgeable, and always eager to help.",
    "Dedicated to making every tour memorable.",
    "Fun-loving, adaptable, and detail-oriented.",
    "Enjoys meeting new people and exploring new places.",
    "Loves creating meaningful connections with travelers.",
    "Warm, approachable, and enthusiastic about new experiences.",
    "Committed to ensuring an unforgettable journey for every guest.",
    "Energetic, insightful, and passionate about guiding.",
    "Known for a great sense of humor and patience.",
    "Thoughtful, professional, and attentive to guest needs.",
    "Enjoys sharing personal stories and local insights.",
    "Excels in making everyone feel like a local.",
    "Friendly and approachable, creating a welcoming atmosphere.",
    "Devoted to creating a comfortable, relaxed experience.",
    "Motivated to make each tour as unique as its travelers.",
  ];

  // Combine random selections from each category to create a full bio
  return `${faker.helpers.arrayElement(intros)} ${faker.helpers.arrayElement(
    expertises
  )} ${faker.helpers.arrayElement(personalities)}`;
}

// Function to generate a random travel guide profile
export function generateGuideProfile(country) {
  const languages = country.languages.includes("English")
    ? country.languages
    : ["English", ...country.languages];

  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    bio: generateEnglishBio(), // Uses the expanded English bio generator
    country: country.name,
    location: `${faker.helpers.arrayElement(country.cities)}, ${country.name}`,
    language: languages,
    photo: faker.image.avatar(),
  };
}

// Generate profiles for each country
const numberOfGuidesPerCountry = 5;

export const guideProfiles = countries_list.flatMap((country) => {
  const profiles = [];
  for (let i = 0; i < numberOfGuidesPerCountry; i++) {
    profiles.push(generateGuideProfile(country));
  }
  return profiles;
});

// Function to query guides based on a specific country
export const getGuidesByCountry = async (countryName) => {
  try {
    const guidesCollection = collection(firestore, "guides");
    const q = query(guidesCollection, where("country", "==", countryName));
    const querySnapshot = await getDocs(q);
    const guides = querySnapshot.docs.map((doc) => doc.data());

    console.log("getGuidesByCountry (/chat)... ", guides);

    return guides; // Return the list of guides
  } catch (error) {
    console.error("Error querying guides: ", error);
    return []; // Return an empty array in case of error
  }
};

// Function to add a new guide to Firestore
export const addGuideAndChat = async (guideData) => {
  try {
    // guide
    const guidesRef = await addDoc(collection(firestore, "guides"), guideData);
    // console.log("Guide added with ID: ", guidesRef.id);

    // chat (made with same ID as guides)
    const initChats = [
      {
        message: guideData.bio,
        sender: "guide",
        timestamp: Date.now(),
      },
    ];

    // Add chat document with the same ID as the guide
    const chatRef = doc(firestore, "chats", guidesRef.id);
    await setDoc(chatRef, {
      chatMessages: initChats,
      guide_name: guideData.name,
    });
    // console.log("Chat Messages added with ID: ", guidesRef.id);
  } catch (error) {
    console.error("Error adding guide: ", error);
  }
};

// Only run one time to not bloat firestore
// guideProfiles.map((guideData) => addGuideAndChat(guideData));
//
