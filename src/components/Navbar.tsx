import { useEffect, useState } from "react";
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
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">LandLedger</Link>
        <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
          <Link to="/buy" className="hover:text-blue-600 transition">Buy</Link>
          <Link to="/sell" className="hover:text-blue-600 transition">Sell</Link>
          <Link to="/marketplace" className="hover:text-blue-600 transition">Marketplace</Link>
          <Link to="/wishlist" className="hover:text-blue-600 transition">Wishlist</Link>
          <Link to="/listings" className="hover:text-blue-600 transition">My Listings</Link>
          <Link to="/profile" className="hover:text-blue-600 transition">Profile</Link>
        </nav>
        <div className="flex gap-4 items-center">
          {isAuthenticated ? (
            <button onClick={handleLogout} className="text-sm px-4 py-2 rounded-md border border-red-500 text-red-500 hover:bg-red-50">Logout</button>
          ):(
            <>
            <Link to="/login" className="text-sm px-4 py-2 rounded-md border border-blue-500 text-blue-500 hover:bg-blue-50">Login</Link>
            <Link to="/signup" className="text-sm px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">Signup</Link>
            </>
            
          )}
        </div>
      </div>
    </header>
  );
}