import { useState } from "react";
import { Link, useLocation } from "wouter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faBars } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActive = (path: string) => location === path;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center">
                <FontAwesomeIcon icon={faBuilding} className="text-primary text-2xl mr-2" />
                <span className="text-xl font-bold text-secondary">LandLedger</span>
            </Link>
            
            {/* Main Navigation */}
            <nav className="hidden md:ml-8 md:flex md:space-x-8">
              <Link href="/" className={`${isActive('/') ? 'text-secondary font-medium border-b-2 border-primary' : 'text-gray-500 hover:text-secondary'} px-1 py-2 text-sm font-medium`}>
                Home
              </Link>
              <Link href="/properties" className={`${isActive('/properties') ? 'text-secondary font-medium border-b-2 border-primary' : 'text-gray-500 hover:text-secondary'} px-1 py-2 text-sm font-medium`}>
                Properties
              </Link>
              <Link href="/services" className={`${isActive('/services') ? 'text-secondary font-medium border-b-2 border-primary' : 'text-gray-500 hover:text-secondary'} px-1 py-2 text-sm font-medium`}>
                Services
              </Link>
              <Link href="/about" className={`${isActive('/about') ? 'text-secondary font-medium border-b-2 border-primary' : 'text-gray-500 hover:text-secondary'} px-1 py-2 text-sm font-medium`}>
                About
              </Link>
              <Link href="/contact" className={`${isActive('/contact') ? 'text-secondary font-medium border-b-2 border-primary' : 'text-gray-500 hover:text-secondary'} px-1 py-2 text-sm font-medium`}>
                Contact
              </Link>
            </nav>
          </div>
          
          {/* Right side elements */}
          <div className="flex items-center">
            <Link href="/contact" className="hidden md:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                Get Started
            </Link>
            
            {/* Mobile menu button */}
            <button 
              type="button" 
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-secondary hover:bg-gray-100"
              onClick={toggleMobileMenu}
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/" className={`${isActive('/') ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-100 hover:text-secondary'} block px-3 py-2 rounded-md text-base font-medium`}>
              Home
          </Link>
          <Link href="/properties" className={`${isActive('/properties') ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-100 hover:text-secondary'} block px-3 py-2 rounded-md text-base font-medium`}>
              Properties
          </Link>
          <Link href="/services" className={`${isActive('/services') ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-100 hover:text-secondary'} block px-3 py-2 rounded-md text-base font-medium`}>
              Services
          </Link>
          <Link href="/about" className={`${isActive('/about') ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-100 hover:text-secondary'} block px-3 py-2 rounded-md text-base font-medium`}>
              About
          </Link>
          <Link href="/contact" className={`${isActive('/contact') ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-100 hover:text-secondary'} block px-3 py-2 rounded-md text-base font-medium`}>
              Contact
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
