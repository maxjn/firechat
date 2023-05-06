import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../firebase/config";

const Navbar = () => {
  return (
    <div className="navbar">
      <span className="logo">FiteChat</span>
      <div className="user">
        <img src="" alt="" />
        <span>Name</span>
        <button onClick={() => signOut(auth)}>logout</button>
      </div>
    </div>
  );
};

export default Navbar;
