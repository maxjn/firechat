import React from "react";

const Navbar = () => {
  return (
    <div className="navbar">
      <span className="logo">Lama Chat</span>
      <div className="user">
        <img src="" alt="" />
        <span>Name</span>
        <button>logout</button>
      </div>
    </div>
  );
};

export default Navbar;
