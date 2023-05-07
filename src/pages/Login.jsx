import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

function Login() {
  // State
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // Handle Form Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Login with Email and Password
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    toast.promise(signInWithEmailAndPassword(auth, email, password), {
      pending: "Authenticating... ",
      success: {
        render({ data }) {
          navigate("/");
          return `${data.user.displayName} Welcome to Firecaht 🔥`;
        },
      },
      error: {
        render({ data }) {
          return `Authentication failed with error code: ${data.code}`;
        },
      },
    });
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">
          <img src="/favicon.ico" alt="Logo" width={30} /> FireChat
        </span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="email"
          />
          <input
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="password"
          />
          <button>Sign in</button>
        </form>
        <p>
          You don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
