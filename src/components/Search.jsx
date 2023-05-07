import React, { useState, useContext } from "react";
import {
  collection,
  query,
  where,
  getDoc,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Search = () => {
  const { currentUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);

  // Handle Search
  const handleSearch = async () => {
    const usersColRef = collection(db, "users");
    // query
    const q = query(usersColRef, where("displayName", "==", username));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      toast.error("Couldn't find the user!");
    }
  };

  // Handle Select
  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //Create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //Create user chats
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: Timestamp.fromDate(new Date()),
        });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: Timestamp.fromDate(new Date()),
        });
      }
    } catch (err) {
      toast.error("Couldn't find the user!");
    }

    setUser(null);
    setUsername("");
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => e.code === "Enter" && handleSearch()}
          value={username}
        />
      </div>
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
