import { useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { Timestamp, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { selectedUser } = useContext(ChatContext);

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      if (img) {
        const storageRef = ref(storage, uuid());
        // Uploading image to storage
        await uploadBytesResumable(storageRef, img).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            // sending message
            await updateDoc(doc(db, "chats", selectedUser.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        });
      } else if (text) {
        // Sending message
        await updateDoc(doc(db, "chats", selectedUser.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
      }

      // Updating Last messages

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [selectedUser.chatId + ".lastMessage"]: {
          text,
        },
        [selectedUser.chatId + ".date"]: Timestamp.now(),
      });
      await updateDoc(doc(db, "userChats", selectedUser.user.uid), {
        [selectedUser.chatId + ".lastMessage"]: {
          text,
        },
        [selectedUser.chatId + ".date"]: Timestamp.now(),
      });
    } catch (err) {
      toast.error("Problem sending message!");
    }
    setText("");
    setImg(null);
  };
  const disabled = selectedUser.chatId == "null";
  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
        disabled={disabled}
        onKeyDown={(e) => e.code === "Enter" && handleSend(e)}
      />
      <div className="send">
        <img src={Attach} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
          disabled={disabled}
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSend} disabled={disabled}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Input;
