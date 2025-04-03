import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faMapMarkerAlt, 
  faBed, 
  faBath, 
  faRulerCombined, 
  faArrowRight 
} from "@fortawesome/free-solid-svg-icons";
import { Property } from "@shared/schema";

interface PropertyCardProps {
  property: Property;
  onClick: () => void;
  featured?: boolean | null;
}

const PropertyCard = ({ property, onClick, featured }: PropertyCardProps) => {
  const {
    title,
    location,
    price,
    image,
    bedrooms,
    bathrooms,
    area,
    isNew,
  } = property;

  // Convert USD to INR (approximation - 1 USD = 75 INR)
  const inrPrice = price * 75;
  
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(inrPrice);

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg property-card cursor-pointer" 
      onClick={onClick}
    >
      <div className="relative pb-[60%]">
        <img 
          src={image} 
          alt={title} 
          className="absolute h-full w-full object-cover" 
        />
        {(featured || isNew) && (
          <div className="absolute top-0 right-0 p-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium ${
              featured ? 'bg-primary text-white' : 'bg-green-500 text-white'
            }`}>
              {featured ? 'Featured' : 'New'}
            </span>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-secondary">{title}</h3>
            <p className="text-gray-500">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-primary" />
              {location}
            </p>
          </div>
          <p className="text-lg font-bold text-primary">{formattedPrice}</p>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="flex items-center">
            <span className="flex items-center text-gray-500 mr-4">
              <FontAwesomeIcon icon={faBed} className="mr-2" /> {bedrooms}
            </span>
            <span className="flex items-center text-gray-500 mr-4">
              <FontAwesomeIcon icon={faBath} className="mr-2" /> {bathrooms}
            </span>
            <span className="flex items-center text-gray-500">
              <FontAwesomeIcon icon={faRulerCombined} className="mr-2" /> {Math.round(area * 0.092903)} sq m
            </span>
          </div>
        </div>
        <div className="mt-4">
          <button className="text-primary font-medium hover:text-blue-700 border-0 bg-transparent cursor-pointer p-0 flex items-center">
            View Details <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
