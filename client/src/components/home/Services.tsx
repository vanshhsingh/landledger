import { Link } from "wouter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faChartLine, faKey } from "@fortawesome/free-solid-svg-icons";

const services = [
  {
    id: "property-management",
    icon: faHome,
    title: "Property Management",
    description: "Professional management services for property owners, handling everything from tenant screening to maintenance.",
    link: "/services#property-management"
  },
  {
    id: "investment-advisory",
    icon: faChartLine,
    title: "Investment Advisory",
    description: "Expert guidance on real estate investments, market analysis, and property valuation to maximize returns.",
    link: "/services#investment-advisory"
  },
  {
    id: "buying-selling",
    icon: faKey,
    title: "Buying & Selling",
    description: "Comprehensive support for buying or selling properties, from listing to closing the deal.",
    link: "/services#buying-selling"
  }
];

const Services = () => {
  return (
    <section className="py-12 bg-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-secondary">Our Services</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Comprehensive real estate solutions tailored to your needs.
          </p>
        </div>

        <div className="mt-10 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service.id} className="bg-white p-6 rounded-lg shadow-md service-card">
              <div className="h-12 w-12 flex items-center justify-center rounded-md bg-primary text-white mb-4 service-icon">
                <FontAwesomeIcon icon={service.icon} className="text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-secondary">{service.title}</h3>
              <p className="mt-2 text-gray-500">
                {service.description}
              </p>
              <Link href={service.link}>
                <a className="mt-4 inline-flex items-center text-primary hover:text-blue-700">
                  Learn More 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
