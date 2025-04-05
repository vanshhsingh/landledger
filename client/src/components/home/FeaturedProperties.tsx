import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import PropertyCard from "../properties/PropertyCard";
import { PropertyDetailsModal } from "../properties/PropertyDetailsModal";
import { Property } from "@shared/schema";

const FeaturedProperties = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: properties, isLoading, error } = useQuery<Property[]>({
    queryKey: ['/api/properties/featured'],
  });

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <section className="py-12 bg-neutral-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-secondary dark:text-white">Featured Properties</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
              Loading featured properties...
            </p>
          </div>
          <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="animate-pulse">
                  <div className="relative pb-[60%] bg-gray-300 dark:bg-gray-700"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-4"></div>
                    <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mt-4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-neutral-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-secondary dark:text-white">Featured Properties</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-red-500">
              Error loading properties. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-neutral-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-secondary dark:text-white">Featured Properties</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
            Discover our hand-picked selection of premium properties.
          </p>
        </div>

        <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {properties && properties.map((property) => (
            <PropertyCard 
              key={property.id} 
              property={property} 
              onClick={() => handlePropertyClick(property)}
              featured={property.featured || false}
            />
          ))}

          {(!properties || properties.length === 0) && (
            <div className="col-span-3 text-center py-10">
              <p className="text-gray-500 dark:text-gray-400">No featured properties available at the moment.</p>
            </div>
          )}
        </div>

        <div className="mt-10 text-center">
          <Link href="/properties" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-blue-700">
            View All Properties
          </Link>
        </div>
      </div>

      {selectedProperty && (
        <PropertyDetailsModal
          property={selectedProperty}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </section>
  );
};

export default FeaturedProperties;
