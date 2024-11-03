/** @format */

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { firestore } from "@/app/firebaseConfig";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
} from "firebase/firestore";

export default function ChatPage() {
  const router = useRouter();
  const { chatID } = router.query; // Get chatID from URL
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (chatID) {
      const chatRef = collection(firestore, "chats", chatID, "messages");
      const q = query(chatRef, orderBy("times", "asc"));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const msgs = [];
        querySnapshot.forEach((doc) => {
          msgs.push(doc.data());
        });
        setMessages(msgs);
      });

      return () => unsubscribe();
    }
  }, [chatID]);

  const sendMessage = async () => {
    if (newMessage.trim() && chatID) {
      await addDoc(collection(firestore, "chats", chatID, "messages"), {
        messages: newMessage,
        sender: "traveler", // Change based on logged-in user
        times: new Date(),
      });
      setNewMessage("");
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.sender}: {msg.messages}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
