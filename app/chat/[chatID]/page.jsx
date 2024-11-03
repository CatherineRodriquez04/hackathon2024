/** @format */

"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { auth, firestore } from "@/app/firebaseConfig";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import Link from "next/link";

export default function ChatIDPage() {
  const searchParams = useSearchParams();
  const chatID = searchParams.get("chatID");

  //   console.log("chatID ... ", chatID);

  const [chatMessages, setChatMessages] = useState([]);
  const [newChatMessage, setNewChatMessage] = useState("");

  // Sets messages every time the onSnapshot recognizes it needs to
  useEffect(() => {
    const chatRef = doc(firestore, "chats", chatID);

    const unsubscribe = onSnapshot(chatRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const chatData = docSnapshot.data();

        console.log("Chat data: ", chatData);

        // Sort chat messages by time
        const sortedMessages = chatData.chatMessages.sort(
          (a, b) => a.time.toMillis() - b.time.toMillis()
        );

        setChatMessages(sortedMessages); // Update state with sorted messages
      } else {
        console.log("No such document!");
      }
    });

    // Notice unsubscribe cleans everything here when the component is unmounted (and the callback useEffect returns is actually called)
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log("Updated messages: ", chatMessages);
  }, [chatMessages]);

  const sendMessage = async () => {
    if (newChatMessage.trim()) {
      const chatRef = doc(firestore, "chats", chatID); // Reference to the specific chat document

      // Create a new message object
      const newMessage = {
        message: newChatMessage,
        sender: "traveler", // e.g., "traveler" or "guide"
        time: new Date(), // Timestamp
      };

      // Update the chat document by adding the new message object to `chatMessages` array
      await updateDoc(chatRef, {
        chatMessages: arrayUnion(newMessage),
      });

      // Clear the input field after sending the message
      setNewChatMessage("");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col h-1/2">
        <div className="flex-grow overflow-y-auto p-4 flex flex-col">
          {chatMessages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "traveler"
                  ? "justify-self-end flex-row-reverse"
                  : "justify-self-start"
              } mb-2`}
            >
              <div
                className={`p-2 rounded-lg ${
                  msg.sender === "traveler"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                }`}
              >
                {msg.message}
              </div>
              {/* TODO: Put time of message in there */}
              {/* <div className="">{msg.time.toISOString()}</div> */}
            </div>
          ))}
        </div>
        <div className="flex p-4">
          <input
            type="text"
            value={newChatMessage}
            onChange={(e) => setNewChatMessage(e.target.value)}
            className="flex-grow p-2 border rounded-l-lg"
            placeholder="Type your message..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white p-2 rounded-r-lg"
          >
            Send
          </button>
        </div>
      </div>
      <div className="">
        <h1>Chat IDs</h1>
        <p>Click any to go to dynamic route with chat...</p>
        <ul>
          {chatMessages.map((msg, index) => (
            <li key={index}>
              <Link href={"@/app/"}>{msg.id}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
