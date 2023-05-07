import React from "react";

function CopyRight() {
  return (
    <div className="copyright">
      {" "}
      <p>
        {" "}
        {new Date().getFullYear()} &copy; By{" "}
        <a href="https://github.com/maxjn"> Mohamad Haqnegahdar (maxjn) </a>
      </p>
    </div>
  );
}

export default CopyRight;
