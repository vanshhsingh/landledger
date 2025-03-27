import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getUser, logout } from "../services/authService";
import "../../css/Navbar.css";


export default function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation(); // ✅ Detects route changes
  
    // ✅ Check if user is logged in on every route change
    useEffect(() => {
      const checkAuth = async () => {
        const user = await getUser();
        setIsAuthenticated(!!user); // ✅ Convert user object to boolean (true if exists)
        console.log(isAuthenticated);
      };
      checkAuth();
    }, [location]); // ✅ Re-run effect when location changes
  
    // ✅ Handle Logout
    const handleLogout = () => {
      logout();
      setIsAuthenticated(false); // ✅ Update state to trigger re-render
      navigate("/login"); // ✅ Redirect to login page
    };
  return (
    <div className="container">
      <div className="navbar">
        <a href="/" id="homebutt">LandLedger</a>
        <nav>
          <ul>
            <li><Link to="/buy">Buy</Link></li>
            <li><Link to="/sell">Sell</Link></li>
            <li><Link to="/loans">Marketplace</Link></li>
            <li><Link to="/wishlist">Wishlist</Link></li>
            <li><Link to="/listings">My Listings</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </nav>
        <div className="auth-buttons">
        {!isAuthenticated ? (
              <>
                <li><Link to="/login" className="login-btn">Login</Link></li>
                <li><Link to="/signup" className="signup-btn">Signup</Link></li>
              </>
            ) : (
              // Show Logout if logged in
              <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
            )}
        </div>
      </div>
    </div>
  );
}