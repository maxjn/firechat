import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

function Login() {
  // State
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    const { email, password } = formData;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      navigate("/");
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">FiteChat</span>
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
          {error && <span>Somthing went wrong!</span>}
          {loading && <span>Authenticating user...</span>}
        </form>
        <p>
          You don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
