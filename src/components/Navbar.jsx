import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { auth } from "../firebase/config";
import { AuthContext } from "./../context/AuthContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="navbar">
      <span className="logo">
        <img src="/favicon.ico" alt="Logo" width={30} /> FireChat
      </span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>logout</button>
      </div>
    </div>
  );
};

export default Navbar;
