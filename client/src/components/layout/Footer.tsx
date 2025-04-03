import { Link } from "wouter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBuilding, 
  faMapMarkerAlt, 
  faPhone, 
  faEnvelope, 
  faClock 
} from "@fortawesome/free-solid-svg-icons";
import { 
  faFacebookF, 
  faTwitter, 
  faInstagram, 
  faLinkedinIn 
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <FontAwesomeIcon icon={faBuilding} className="text-primary text-2xl mr-2" />
              <span className="text-xl font-bold">LandLedger</span>
            </div>
            <p className="text-gray-400 mb-4">
              Professional real estate advisory and management services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link href="/properties" className="text-gray-400 hover:text-white">Properties</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white">Services</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link href="/services#property-management" className="text-gray-400 hover:text-white">Property Management</Link></li>
              <li><Link href="/services#investment-advisory" className="text-gray-400 hover:text-white">Investment Advisory</Link></li>
              <li><Link href="/services#buying-selling" className="text-gray-400 hover:text-white">Buying & Selling</Link></li>
              <li><Link href="/services#market-analysis" className="text-gray-400 hover:text-white">Market Analysis</Link></li>
              <li><Link href="/services#consultation" className="text-gray-400 hover:text-white">Consultation</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mt-1 mr-3 text-primary" />
                <span>765 Park Avenue, Mumbai, Maharashtra 400001</span>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon icon={faPhone} className="mr-3 text-primary" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="mr-3 text-primary" />
                <span>info@landledger.com</span>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon icon={faClock} className="mr-3 text-primary" />
                <span>Mon-Fri: 10AM - 6PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} LandLedger. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
