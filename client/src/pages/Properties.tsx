import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Property } from "@shared/schema";
import PropertyCard from "../components/properties/PropertyCard";
import { PropertyDetailsModal } from "../components/properties/PropertyDetailsModal";
import SearchFilters from "../components/home/SearchFilters";

const Properties = () => {
  const [location] = useLocation();
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Parse URL query parameters
  const urlParams = new URLSearchParams(location.split('?')[1] || '');
  const locationFilter = urlParams.get('location') || 'All Locations';
  const propertyTypeFilter = urlParams.get('propertyType') || 'All Types';
  const priceRangeFilter = urlParams.get('priceRange') || 'Any Price';
  const bedroomsFilter = urlParams.get('bedrooms') || 'Any';

  // Construct the query key with filters
  const queryKey = ['/api/properties', { 
    location: locationFilter, 
    propertyType: propertyTypeFilter, 
    priceRange: priceRangeFilter, 
    bedrooms: bedroomsFilter 
  }];

  const { data: properties, isLoading, error } = useQuery<Property[]>({
    queryKey,
  });

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">Properties</h1>
          <p className="mt-4 text-lg text-gray-300">
            Browse our curated selection of properties
          </p>
        </div>
      </div>

      {/* Include search filters at the top of the properties page */}
      <div className="transform translate-y-0 mt-6">
        <SearchFilters />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 dark:bg-gray-900 transition-colors duration-200">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-secondary dark:text-white">
            {isLoading ? 'Loading Properties...' : 
             error ? 'Error Loading Properties' : 
             properties?.length === 0 ? 'No Properties Found' : 
             `${properties?.length} Properties Found`}
          </h2>
          {!isLoading && !error && properties?.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your filters to see more results.</p>
          )}
        </div>

        {isLoading ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors duration-200">
                <div className="animate-pulse">
                  <div className="relative pb-[60%] bg-gray-300 dark:bg-gray-700 transition-colors duration-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4 transition-colors duration-200"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4 transition-colors duration-200"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-4 transition-colors duration-200"></div>
                    <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mt-4 transition-colors duration-200"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded transition-colors duration-200">
            <p>There was an error loading properties. Please try again later.</p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {properties?.map((property) => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                onClick={() => handlePropertyClick(property)}
                featured={property.featured}
              />
            ))}
          </div>
        )}
      </div>

      {selectedProperty && (
        <PropertyDetailsModal
          property={selectedProperty}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Properties;
