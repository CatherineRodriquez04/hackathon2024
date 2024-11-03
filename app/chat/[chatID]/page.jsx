/** @format */

"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { firestore } from "@/app/firebaseConfig";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  getDocs,
} from "firebase/firestore";
import Link from "next/link";

export default function ChatIDPage() {
  const searchParams = useSearchParams();
  const chatID = searchParams.get("chatID");

  console.log("chatID ... ", chatID);

  const [chatMessages, setChatMessages] = useState([]);
  const [newChatMessage, setNewChatMessage] = useState("");

  // Sets messages every time the onSnapshot recognizes it needs to
  useEffect(() => {
    const chatRef = collection(firestore, "chats");
    const q = query(chatRef, orderBy("times", "asc"));

    // onSnapshot attaches listener, but returns the unsubscribe function which cleans everything up
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc, index) => {
        if (doc.id === chatID) {
          let chatData = doc.data(); // Get messages from the specific chat

          for (let i = 0; i < chatData.messages.length; i++) {
            console.log("from onSnapshot listener... ", chatData[i]);

            msgs.push({
              message: chatData.messages[i],
              sender: chatData.sender[i],
              time: chatData.times[i],
            });
          }
        }
      });

      // Update state only once after processing all docs
      setChatMessages(msgs);
    });

    // Notice unsubscribe cleans everything here when the component is unmounted (and the callback useEffect returns is actually called)
    return () => unsubscribe();
  }, []);

  //   useEffect(() => {
  //     console.log("Updated messages: ", chatMessages);
  //   }, [chatMessages]);

  const getChat = async () => {
    const chatRef = collection(firestore, "chat");

    const q = query(chatRef, orderBy("times", "asc"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  };

  const getListOfChatIDs = async () => {
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
    if (newChatMessage.trim()) {
      // TODO: If Firestore write needs to be pure, then we need to addDoc (probably pure because it's entire doc), then the entire state change needs to be pure.
      await addDoc(collection(firestore, "chats"), {
        messages: newChatMessage,
        // TODO:  Change based on the logged-in user
        sender: "traveler",
        times: new Date(),
      });
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
