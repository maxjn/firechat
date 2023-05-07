import React from "react";
import { Link } from "react-router-dom";

function CopyRight() {
  return (
    <div className="copyright">
      {" "}
      <p>
        {" "}
        {new Date().getFullYear()} &copy; By{" "}
        <Link to="https://github.com/maxjn"> Mohamad Haqnegahdar (maxjn) </Link>
      </p>
    </div>
  );
}

export default CopyRight;
