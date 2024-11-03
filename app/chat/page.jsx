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
import Link from "next/link";

export default function ChatPage() {
  const [chatIDs, setChatIDs] = useState([]);

  // Sets messages every time the onSnapshot recognizes it needs to
  useEffect(() => {
    const chatRef = collection(firestore, "chats");

    const q = query(chatRef, orderBy("times", "asc"));

    // onSnapshot attaches listener, but returns the unsubscribe function which cleans everything up
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let ids = [];
      querySnapshot.forEach((doc, index) => {
        ids.push(doc.id);
      });

      setChatIDs(ids);
    });

    // Notice unsubscribe cleans everything here when the component is unmounted (and the callback useEffect returns is actually called)
    return () => unsubscribe();
  }, []);

  // useEffect(() => {
  //   console.log("Updated chat IDs: ", chatIDs);
  // }, [chatIDs]);

  const getChat = async () => {
    const chatRef = collection(firestore, "chat");

    const q = query(chatRef, orderBy("times", "asc"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  };

  return (
    <ul>
      {chatIDs.map((id, index) => (
        <li key={index}>
          <Link href={`chat/params?chatID=${id}`}>{id}</Link>
        </li>
      ))}
    </ul>
  );
}
