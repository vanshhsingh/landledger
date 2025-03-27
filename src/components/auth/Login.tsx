import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../css/Login.css";
import { login } from "../../services/authService";

export default function Login() {
  const [username, setUsername] = useState(""); // ✅ Changed from email to username
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // ✅ Prevent default form submission

    try {
      const response = await login({ username, password });

      if (response.authToken) {
        localStorage.setItem("token", response.authToken); // ✅ Store token before redirecting
        console.log("Login successful, token saved:", response.authToken);
        navigate("/"); // ✅ Redirect to home page
      } else {
        setError(response.error || "Login failed. Please check credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login to LandLedger</h2>
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}> {/* ✅ Fix onSubmit placement */}
          <div className="input-group">
            <label>Username</label> {/* ✅ Changed from Email to Username */}
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">Login</button> {/* ✅ Remove onSubmit from button */}
        </form>

        <p className="register-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
