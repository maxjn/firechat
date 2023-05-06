import React, { useContext, useEffect, useRef } from "react";
import { DateTime } from "luxon";
import { AuthContext } from "./../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { selectedUser } = useContext(ChatContext);
  const owner = message.senderId === currentUser.uid ? true : false;
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div className={`message ${owner && "owner"} `} ref={ref}>
      <div className="messageInfo">
        <img
          src={owner ? currentUser.photoURL : selectedUser.user.photoURL}
          alt="Profile"
        />
        <span>
          {DateTime.fromSeconds(message.date.seconds).toFormat("hh:mm a")}
        </span>
      </div>
      <div className="messageContent">
        {message.img && <img src={message.img} alt="" />}
        <p>{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
