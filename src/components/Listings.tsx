
import "../../css/Listings.css";

export default function Listings() {
  return (
    <div className="Listings">
      <h1>My Listings</h1>
      <p>Manage your listed properties.</p>
      <div className="listings-grid">
        <div className="listing-card">
          <img src="img/houseimage.jpg" alt="My Property" />
          <h3>Cozy Cottage</h3>
          <p>₹60 Lakh • 2 BHK • Pune</p>
          <button className="edit-listing">Edit</button>
          <button className="delete-listing">Delete</button>
        </div>
      </div>
    </div>
  );
}
