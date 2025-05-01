// src/components/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Suppose you have an AuthContext or just localStorage for simplicity
const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const handleLogin = (e) => {
    e.preventDefault();
    // Very basic check: 
    if (username === "admin" && password === "1234") {
      localStorage.setItem("isAdmin", "true");
      navigate("/"); // or wherever you want
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>{" "}
          <input 
            type="text"
            value={username}
            onChange={(e)=> setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>{" "}
          <input 
            type="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
