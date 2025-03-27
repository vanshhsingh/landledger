import React from "react";
import "../../css/Wishlist.css";

export default function Wishlist() {
  return (
    <div className="Wishlist">
      <h1>Your Wishlist</h1>
      <p>Save your favorite properties for later.</p>
      <div className="wishlist-list">
        <div className="listing-card">
          <img src="img/houseimage.jpg" alt="Saved Property" />
          <h3>Luxury Villa</h3>
          <p>₹1.5 Cr • 4 BHK • Delhi</p>
          <button className="view-details">View Details</button>
        </div>
      </div>
    </div>
  );
}
