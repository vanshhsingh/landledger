import React, { useEffect, useState } from 'react';
import { fetchwishlist } from '../services/wishlistService';
import { useNavigate } from 'react-router-dom';



export interface WishlistItem {
  _id: string;
  userId: string;
  property: {
    name: string;
    location: string;
    price: string;
    type: string;
    size: string;
    bedrooms: number;
    bathrooms: number;
  };
}


const Wishlist: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    
    const getWishlist = async () => {
      try {
        const items = await fetchwishlist();
        setWishlistItems(items); // Keep the full object, including property
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch wishlist');
        setLoading(false);
      }
    };

    getWishlist();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Loading your wishlist...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-lg font-semibold">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <div className="text-lg text-gray-500">You have no items in your wishlist.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
            >
              <img
                src="https://via.placeholder.com/400x250" // Placeholder image
                alt={item.property.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {item.property.name}
                </h2>
                <p className="text-gray-600 mt-1">
                  {item.property.location} • {item.property.type} • {item.property.size}
                </p>
                <p className="text-gray-600">
                  {item.property.bedrooms} Beds • {item.property.bathrooms} Baths
                </p>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-lg font-semibold text-gray-900">
                    {item.property.price}
                  </p>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition duration-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
