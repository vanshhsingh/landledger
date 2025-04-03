import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faTimes, 
  faMapMarkerAlt, 
  faBed, 
  faBath, 
  faRulerCombined, 
  faCheck, 
  faPhoneAlt 
} from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import { Property } from "@shared/schema";
import ContactForm from "../common/ContactForm";
import { useState } from "react";

interface PropertyDetailsModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

export const PropertyDetailsModal = ({ property, isOpen, onClose }: PropertyDetailsModalProps) => {
  const [showContactForm, setShowContactForm] = useState(false);

  if (!isOpen) return null;

  const {
    title,
    location,
    price,
    image,
    images,
    bedrooms,
    bathrooms,
    area,
    description,
    features
  } = property;
  
  // Ensure images and features are arrays
  const propertyImages = images || [];
  const propertyFeatures = features || [];

  // Convert USD to INR (approximation - 1 USD = 75 INR)
  const inrPrice = price * 75;
  
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(inrPrice);

  const handleContactAgent = () => {
    setShowContactForm(true);
  };

  // Combine main image with additional images
  const allImages = [image, ...propertyImages].filter(Boolean);

  return (
    <div className="fixed inset-0 z-50">
      {/* Background overlay */}
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
      
      {/* Modal content */}
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:p-6">
            {/* Close button */}
            <div className="absolute right-0 top-0 pr-4 pt-4">
              <button 
                type="button" 
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={onClose}
              >
                <span className="sr-only">Close</span>
                <FontAwesomeIcon icon={faTimes} className="text-xl" />
              </button>
            </div>
            
            {showContactForm ? (
              <div>
                <h3 className="text-2xl font-semibold text-secondary mb-4">Contact Agent about {title}</h3>
                <ContactForm 
                  propertyInquiry={true} 
                  propertyTitle={title}
                  onCancel={() => setShowContactForm(false)}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <div className="relative pb-[75%] rounded-lg overflow-hidden">
                    <img 
                      src={allImages[0]} 
                      alt={title} 
                      className="absolute h-full w-full object-cover" 
                    />
                  </div>
                  {allImages.length > 1 && (
                    <div className="grid grid-cols-4 gap-2 mt-2">
                      {allImages.slice(1, 5).map((img, index) => (
                        <div key={index} className="relative pb-[75%] rounded-lg overflow-hidden">
                          <img 
                            src={img} 
                            alt={`${title} - image ${index + 2}`} 
                            className="absolute h-full w-full object-cover" 
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold text-secondary mb-2">{title}</h3>
                  <p className="text-primary text-xl font-bold mb-4">{formattedPrice}</p>
                  <p className="text-gray-500 mb-4">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-primary" />
                    {location}
                  </p>
                  
                  <div className="flex items-center mb-6 text-gray-600">
                    <span className="flex items-center mr-6">
                      <FontAwesomeIcon icon={faBed} className="mr-2 text-primary" /> {bedrooms} Beds
                    </span>
                    <span className="flex items-center mr-6">
                      <FontAwesomeIcon icon={faBath} className="mr-2 text-primary" /> {bathrooms} Baths
                    </span>
                    <span className="flex items-center">
                      <FontAwesomeIcon icon={faRulerCombined} className="mr-2 text-primary" /> {Math.round(area * 0.092903)} sq m
                    </span>
                  </div>
                  
                  <h4 className="text-lg font-medium text-secondary mb-2">Description</h4>
                  <p className="text-gray-600 mb-4">{description}</p>
                  
                  {propertyFeatures.length > 0 && (
                    <>
                      <h4 className="text-lg font-medium text-secondary mb-2">Features</h4>
                      <ul className="grid grid-cols-2 gap-2 text-gray-600 mb-6">
                        {propertyFeatures.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <FontAwesomeIcon icon={faCheck} className="text-primary mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  
                  <div className="mt-4 flex space-x-4">
                    <button 
                      className="flex-1 bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700"
                      onClick={handleContactAgent}
                    >
                      <FontAwesomeIcon icon={faPhoneAlt} className="mr-2" /> Contact Agent
                    </button>
                    <button className="flex-1 border border-primary text-primary px-4 py-2 rounded-md hover:bg-blue-50">
                      <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" /> Schedule Tour
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
