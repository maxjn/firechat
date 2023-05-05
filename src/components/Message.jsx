import React from "react";

const Message = ({ message }) => {
  return (
    <div className={`message owner`}>
      <div className="messageInfo">
        <img src="" alt="" />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>message text</p>
      </div>
    </div>
  );
};

export default Message;
