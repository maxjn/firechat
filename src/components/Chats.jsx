import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import { ChatContext } from "../context/ChatContext";

const Chats = () => {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const [chats, setChats] = useState([]);

  // RealeTime Chats
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  //Handle Chat Click
  const handleChatSelect = (userInfo) => {
    dispatch({ type: "CHANGE_USER", payload: userInfo });
  };

  return (
    <div className="chats">
      {Object.entries(chats)?.map((chat) => (
        <div
          className="userChat"
          key={chat[0]}
          onClick={() => handleChatSelect(chat[1].userInfo)}
        >
          <img src={chat[1].userInfo.photoURL} alt="Profile" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].userInfo.lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
