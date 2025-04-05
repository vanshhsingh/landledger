import { useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Property } from "@shared/schema";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faMapMarkerAlt, 
  faBed, 
  faBath, 
  faRulerCombined, 
  faCheck, 
  faPhoneAlt,
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import ContactForm from "../components/common/ContactForm";

const PropertyDetails = () => {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/properties/:id");
  const id = match ? parseInt(params.id) : null;

  const { data: property, isLoading, error } = useQuery<Property>({
    queryKey: [`/api/properties/${id}`],
    enabled: !!id,
  });

  // Redirect to properties page if id is invalid
  useEffect(() => {
    if (error) {
      setLocation("/properties");
    }
  }, [error, setLocation]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 dark:bg-gray-900 transition-colors duration-200">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-4 transition-colors duration-200"></div>
          <div className="h-80 bg-gray-300 dark:bg-gray-700 rounded mb-6 transition-colors duration-200"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4 transition-colors duration-200"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4 transition-colors duration-200"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-4 transition-colors duration-200"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-4 transition-colors duration-200"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4 transition-colors duration-200"></div>
            </div>
            <div>
              <div className="h-40 bg-gray-300 dark:bg-gray-700 rounded mb-4 transition-colors duration-200"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 dark:bg-gray-900 transition-colors duration-200">
        <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded transition-colors duration-200">
          <p>Property not found or there was an error loading it.</p>
        </div>
        <button 
          onClick={() => setLocation("/properties")}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-blue-700"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Back to Properties
        </button>
      </div>
    );
  }

  const {
    title,
    location,
    price,
    image,
    images = [],
    bedrooms,
    bathrooms,
    area,
    description,
    features = []
  } = property;

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);

  // Combine main image with additional images
  const allImages = [image, ...(images || [])].filter(Boolean);

  return (
    <div className="bg-neutral-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button 
          onClick={() => setLocation("/properties")}
          className="mb-6 inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-700 shadow-sm text-sm font-medium rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Back to listings
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors duration-200">
          {/* Property hero image */}
          <div className="relative h-80 md:h-96">
            <img 
              src={allImages[0]} 
              alt={title} 
              className="w-full h-full object-cover" 
            />
          </div>

          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <h1 className="text-3xl font-bold text-secondary dark:text-white">{title}</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-primary" />
                  {location}
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <span className="text-3xl font-bold text-primary">{formattedPrice}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center mt-6 pb-6 border-b border-gray-200 dark:border-gray-700">
              <span className="flex items-center mr-6 mb-2">
                <FontAwesomeIcon icon={faBed} className="mr-2 text-primary" /> 
                <span className="text-gray-700 dark:text-gray-300">{bedrooms} Bedrooms</span>
              </span>
              <span className="flex items-center mr-6 mb-2">
                <FontAwesomeIcon icon={faBath} className="mr-2 text-primary" /> 
                <span className="text-gray-700 dark:text-gray-300">{bathrooms} Bathrooms</span>
              </span>
              <span className="flex items-center mb-2">
                <FontAwesomeIcon icon={faRulerCombined} className="mr-2 text-primary" /> 
                <span className="text-gray-700 dark:text-gray-300">{area} sq ft</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="md:col-span-2">
                <h2 className="text-xl font-semibold text-secondary dark:text-white">Property Description</h2>
                <p className="mt-4 text-gray-700 dark:text-gray-300 whitespace-pre-line">{description}</p>

                {features && features.length > 0 && (
                  <div className="mt-8">
                    <h2 className="text-xl font-semibold text-secondary dark:text-white">Property Features</h2>
                    <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                      {features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                          <FontAwesomeIcon icon={faCheck} className="mr-2 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {allImages.length > 1 && (
                  <div className="mt-8">
                    <h2 className="text-xl font-semibold text-secondary dark:text-white">Property Images</h2>
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                      {allImages.map((img, index) => (
                        <div key={index} className="relative pb-[75%] rounded-lg overflow-hidden">
                          <img 
                            src={img} 
                            alt={`${title} - image ${index + 1}`} 
                            className="absolute h-full w-full object-cover" 
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <div className="bg-neutral-50 dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors duration-200">
                  <h3 className="text-lg font-semibold text-secondary dark:text-white mb-4">Interested in this property?</h3>
                  <div className="space-y-4">
                    <button className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center justify-center">
                      <FontAwesomeIcon icon={faPhoneAlt} className="mr-2" /> 
                      Contact Agent
                    </button>
                    <button className="w-full border border-primary text-primary dark:text-blue-300 px-4 py-2 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200 flex items-center justify-center">
                      <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" /> 
                      Schedule Tour
                    </button>
                  </div>
                </div>

                <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors duration-200">
                  <h3 className="text-lg font-semibold text-secondary dark:text-white mb-4">Contact Us</h3>
                  <ContactForm 
                    propertyInquiry={true} 
                    propertyTitle={title} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
