/** @format */

"use client";

import React, { useEffect, useState } from "react";
import { firestore } from "@/app/firebaseConfig";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  getDocs,
} from "firebase/firestore";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  let chatRef = undefined;

  // TODO: Don't know if this is best way to do it. Initializing ref to the docs in messages of collection
  useEffect(() => {
    const chatRef = collection(firestore, "chats");

    const q = query(chatRef, orderBy("times", "asc"));

    // onSnapshot attaches listener, but returns the unsubscribe function which cleans everything up
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = [];
      querySnapshot.forEach((doc) => {
        console.log("from onSnapshot listener... ", doc.id, " => ", doc.data());

        msgs.push(doc.data());
      });
      setMessages(msgs);
    });

    // Notice unsubscribe cleans everything here when the component is unmounted (and the callback useEffect returns is actually called)
    return () => unsubscribe();
  }, []);

  const getChat = async () => {
    const chatRef = collection(firestore, "chat");

    const q = query(chatRef, orderBy("times", "asc"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  };

  // TODO: Test that this conforms to Firestore specs and its rules
  const sendMessage = async () => {
    if (newMessage.trim()) {
      await addDoc(collection(firestore, "chats"), {
        messages: newMessage,
        // TODO:  Change based on the logged-in user
        sender: "traveler",
        times: new Date(),
      });
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-1/2">
      <div className="flex-grow overflow-y-auto p-4 flex flex-col-reverse">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "traveler" ? "justify-end" : "justify-start"
            } mb-2`}
          >
            <div
              className={`p-2 rounded-lg ${
                msg.sender === "traveler"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
              }`}
            >
              {msg.messages}
            </div>
          </div>
        ))}
      </div>
      <div className="flex p-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow p-2 border rounded-l-lg"
          placeholder="Type your message..."
        />
        <button
          //              JUST CAME TO MIND: You should probably contact a mentor early to get some help...
          // TODO: Testing... I just want to pull all the documents from messages collection in our Firestore database (accessed by the Firebase console)
          //                ... Problem is that I'm missing permissions for whatever reason. You update permissions by changing the rules (see rules tab)
          // My goal with this file is to create a simple chat interface. Either user sees a list of the previous messages in the conversation
          //    ... currently the goal is to have most recent messages towards the bottom above the input bar. The input bar is used to update the Firestore DB
          //    ... with new message, which when changed should (I don't know how we implement, maybe with useEffect) populate the list items above the input bar.
          //    ... That way, we simulate messaging interface.
          onClick={() => {
            getChat();
          }}
          // TODO: Actually use this one when the input is used to send messages to Firestore DB instead of just reading them. Firestore DB messages
          //        ... ideally should populate the list items automatically so users have a nice, seamless messaging experience.
          // onClick={sendMessage}
          className="bg-blue-500 text-white p-2 rounded-r-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
