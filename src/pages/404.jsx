import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found">
      <h1>Ooooooooops...</h1>
      <p>The page you are looking for doesn't exists or there was a problem</p>
      <p>
        Back to <Link to="/">HomePage...</Link>
      </p>
    </div>
  );
}

export default NotFound;
