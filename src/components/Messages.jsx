import React, { useContext, useState, useEffect } from "react";
import Message from "./Message";
import { ChatContext } from "./../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { selectedUser } = useContext(ChatContext);

  // Returning messages based on chatId from the selected user
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", selectedUser.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [selectedUser.chatId]);

  return (
    <div className="messages">
      {messages.map((message) => (
        <Message message={message} key={message.id} />
      ))}
    </div>
  );
};

export default Messages;
