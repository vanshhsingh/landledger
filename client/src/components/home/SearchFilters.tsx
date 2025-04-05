import { useState, FormEvent } from "react";
import { useLocation } from "wouter";

const SearchFilters = () => {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    location: "All Locations",
    propertyType: "All Types",
    priceRange: "Any Price",
    bedrooms: "Any"
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Build query parameters based on filter values
    const params = new URLSearchParams();
    
    if (formData.location !== "All Locations") {
      params.append("location", formData.location);
    }
    
    if (formData.propertyType !== "All Types") {
      params.append("propertyType", formData.propertyType);
    }
    
    if (formData.priceRange !== "Any Price") {
      params.append("priceRange", formData.priceRange);
    }
    
    if (formData.bedrooms !== "Any") {
      params.append("bedrooms", formData.bedrooms);
    }
    
    // Navigate to properties page with filters
    const queryString = params.toString();
    const path = `/properties${queryString ? `?${queryString}` : ""}`;
    setLocation(path);
  };

  return (
    <section className="bg-white dark:bg-gray-800 shadow-md rounded-lg max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 transition-colors duration-200">
      <div className="py-6">
        <h2 className="text-lg font-medium text-secondary dark:text-white mb-4">Find Your Perfect Property</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
            <select 
              id="location" 
              name="location" 
              value={formData.location}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
            >
              <option>All Locations</option>
              <option>New York</option>
              <option>Los Angeles</option>
              <option>Chicago</option>
              <option>Miami</option>
            </select>
          </div>
          <div>
            <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Property Type</label>
            <select 
              id="propertyType" 
              name="propertyType" 
              value={formData.propertyType}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
            >
              <option>All Types</option>
              <option>Apartment</option>
              <option>House</option>
              <option>Villa</option>
              <option>Commercial</option>
            </select>
          </div>
          <div>
            <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price Range</label>
            <select 
              id="priceRange" 
              name="priceRange" 
              value={formData.priceRange}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
            >
              <option>Any Price</option>
              <option>$100k - $200k</option>
              <option>$200k - $500k</option>
              <option>$500k - $1M</option>
              <option>$1M+</option>
            </select>
          </div>
          <div>
            <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bedrooms</label>
            <select 
              id="bedrooms" 
              name="bedrooms" 
              value={formData.bedrooms}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
            >
              <option>Any</option>
              <option>1+</option>
              <option>2+</option>
              <option>3+</option>
              <option>4+</option>
            </select>
          </div>
          <div className="flex items-end">
            <button 
              type="submit" 
              className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              Search
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SearchFilters;
