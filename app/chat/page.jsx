/** @format */

"use client";

import React, { useEffect, useState } from "react";
import { firestore } from "@/app/firebaseConfig";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";
import Link from "next/link";
import Chat from "@/components/Chat";

export default function ChatPage() {
  const [chatIDs, setChatIDs] = useState([]);
  const [guideNames, setGuideNames] = useState([]);

  const [selectedChatID, setSelectedChatID] = useState(null);

  // const fetchChatMessages = async () => {
  //   const chatRef = collection(firestore, "chats"); // Use collection reference directly
  //   const chatSnapshot = await getDocs(chatRef); // Fetch all documents in the "chats" collection

  //   const chatData = [];
  //   chatSnapshot.forEach((doc) => {
  //     chatData.push({
  //       id: doc.id,
  //       ...doc.data(),
  //     });
  //   });

  //   console.log("fetchChatMessages (/chat)... ", chatData);

  //   setChatMessages(chatData);
  // };

  useEffect(() => {
    const chatRef = collection(firestore, "chats");

    const unsubscribe = onSnapshot(chatRef, (querySnapshot) => {
      const idsWithTimes = [];
      const gNames = [];

      querySnapshot.forEach((doc) => {
        const messages = doc.data().messages;
        const latestTime =
          messages && messages.length > 0
            ? messages[messages.length - 1].time
            : null; // Get latest time from messages array

        idsWithTimes.push({
          id: doc.id,
          latestTime: latestTime || 0, // Default to 0 if no time exists
        });

        gNames.push(doc.data().guide_name);
      });

      // Sort by `latestTime` and extract only the IDs
      idsWithTimes.sort((a, b) => a.latestTime - b.latestTime);
      const sortedIds = idsWithTimes.map((item) => item.id);

      setChatIDs(sortedIds); // Set sorted IDs
      setGuideNames(gNames); // Set guide names
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log("Updated chat IDs: ", guideNames);
  }, [guideNames]);

  return (
    <div className="flex flex-row">
      <div className="flex flex-col flex-1 min-h-screen mx-4 border border-gray-300 p-4">
        <ul className="flex flex-col">
          {chatIDs.map((id, index) => (
            <li
              key={index}
              className="p-4 border rounded-sm shadow-sm border-gray-200 bg-white"
            >
              <div
                onClick={() => {
                  console.log(id);
                  return setSelectedChatID(id);
                }}
              >
                {guideNames[index]}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col flex-[5] rounded-sm shadow-sm border border-gray-300 bg-white">
        {selectedChatID ? (
          <div className="">
            <Chat chatID={selectedChatID} />
          </div>
        ) : (
          <div className="flex flex-col flex-5 min-h-screen border border-gray-300 bg-white rounded-sm shadow-sm">
            <h1 className="self-center">Select a chat to view</h1>
          </div>
        )}
      </div>
    </div>
  );
}
