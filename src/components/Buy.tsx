import { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import propertyData from './Dummy data/data.json';
import {addwishlist} from '../services/wishlistService';


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
  interface WishlistItem {
    _id: string;
    userId: string;
    property: Property;
  }

  const handleAdd = async (propertyid : number) => {
    try {
      console.log(propertyid);
      console.log(properties[propertyid]);
      const wishlistItem: WishlistItem = {
        _id: "", // placeholder; backend should generate the real id
        userId: "", // set current user id here
        property: properties[propertyid],
      };
      const result = await addwishlist(wishlistItem);
      console.log("Added to wishlist", result);
    } catch (error) {
      console.error("Error adding to wishlist", error);
    }
  };
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    setProperties(propertyData);
  }, []);

  return (
    <main className="mt-10 min-h-screen bg-gradient-to-br from-gray-50 to-white">

      <section className=" max-w-7xl mx-auto px-6 pb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 ">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-gray-100 group"
            >
              <img
                src={"/img/houseimage.jpg"}
                alt={property.name}
                className="w-full h-60 object-cover rounded-t-3xl group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-1 h-16">{property.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{property.location}</p>
                <p className="text-indigo-600 font-bold text-xl mb-2">{property.price}</p>
                <p className="text-gray-600 text-sm mb-4">{property.size} · {property.bedrooms} BHK · {property.bathrooms} Bath</p>
                <button
                  onClick={() => navigate(`/property/${property.id}`)}
                  className="w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all"
                >
                  View Details
                </button>
                <button
                  key={property.id}
                  onClick={() => handleAdd(property.id)}
                  className="w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all mt-4"
                >
                  add Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}