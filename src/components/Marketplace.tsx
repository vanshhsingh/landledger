
import "../../css/Marketplace.css";

export default function Marketplace() {
  return (
    <div className="Marketplace">
      <h1>Real Estate Marketplace</h1>
      <p>Browse properties from different sellers.</p>
      <div className="marketplace-list">
        <div className="listing-card">
          <img src="img/houseimage.jpg" alt="Property" />
          <h3>Modern Apartment</h3>
          <p>₹80 Lakh • 3 BHK • Mumbai</p>
          <button className="view-details">View Details</button>
        </div>
      </div>
    </div>
  );
}
