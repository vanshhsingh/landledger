import React from "react";
import { Link } from "react-router-dom";
import "../../css/Navbar.css";

export default function Navbar() {
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
      </div>
    </div>
  );
}
