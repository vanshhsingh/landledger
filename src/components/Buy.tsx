import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import propertyData from './Dummy data/data.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import '../../css/Buy.css';

export default function Buy() {
  const navigate = useNavigate();
  interface Property {
    id: number;
    name: string;
    location: string;
    price: string;
    type: string;
    size: string;
    bedrooms: number;
    bathrooms: number;
  }

  const [properties, setProperties] = useState<Property[]>([]);
  const [priceDropdown, setPriceDropdown] = useState(false);
  const [bedsDropdown, setBedsDropdown] = useState(false);
  const [homeTypeDropdown, setHomeTypeDropdown] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setProperties(propertyData);
  const timer = setTimeout(() => {
      setLoaded(true); // Set loaded to true after a delay
    }, 300); // Adjust the delay as needed

    return () => clearTimeout(timer); // Clear timeout on unmount
  }, []);

  return (
    <>
      <section className={`Buy ${loaded ? 'loaded' : ''}`}>
        <section className="nav">
          <section className="search-buy">
            <div className="searchBar-buy">
              <input type="text" placeholder="Enter Address, Neighbourhood, ZIP code" />
              <button><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
            </div>
            <nav>
              <ul className="Navbar-buy">
                {/* Price Dropdown */}
                <div className="dropdown">
                  <button className="dropbtn" onMouseDown ={() => setPriceDropdown(!priceDropdown)}>
                    Price <FontAwesomeIcon icon={faChevronDown} />
                  </button>
                  {priceDropdown && (
                    <div className="dropdown-content">
                      <button>Under ₹50 Lakh</button>
                      <button>₹50L - ₹1 Cr</button>
                      <button>₹1 Cr - ₹2 Cr</button>
                      <button>Above ₹2 Cr</button>
                    </div>
                  )}
                </div>

                {/* Beds & Baths Dropdown */}
                <div className="dropdown">
                  <button className="dropbtn" onClick={() => setBedsDropdown(!bedsDropdown)}>
                    Beds & Baths <FontAwesomeIcon icon={faChevronDown} />
                  </button>
                  {bedsDropdown && (
                    <div className="dropdown-content">
                      <button>1 BHK</button>
                      <button>2 BHK</button>
                      <button>3 BHK</button>
                      <button>4+ BHK</button>
                    </div>
                  )}
                </div>

                {/* Home Type Dropdown */}
                <div className="dropdown">
                  <button className="dropbtn" onClick={() => setHomeTypeDropdown(!homeTypeDropdown)}>
                    Home Type <FontAwesomeIcon icon={faChevronDown} />
                  </button>
                  {homeTypeDropdown && (
                    <div className="dropdown-content">
                      <button>Apartment</button>
                      <button>Villa</button>
                      <button>Independent House</button>
                      <button>Penthouse</button>
                    </div>
                  )}
                </div>
              </ul>
            </nav>
          </section>

          {/* Property Grid Section */}
          <section className="Gridbuy">
            <div className="PropertyGrid">
              {properties.map((property) => (
                // <div key={property.id} className="PropertyCard">
                  
                  <div key={property.id} className="listing-card">
                  <img 
                    src="img\houseimage.jpg" 
                    alt={property.name} 
                    className="PropertyImage" 
                  />
                      <h3>{property.name}</h3>
                      <p>{property.location}</p>
                      <p className="price">{property.price}</p>
                      <p>{property.size} | {property.bedrooms} BHK | {property.bathrooms} Bath</p>
                      <button className="view-details" onClick={() => navigate(`/property/${property.id}`)}>
                        View Details
                      </button>
                  </div>
                // </div>
              ))}
            </div>
          </section>
        </section>
      </section>
    </>
  );
}