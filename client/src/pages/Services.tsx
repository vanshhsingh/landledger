import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faHome, 
  faChartLine, 
  faKey, 
  faChartBar, 
  faUserTie, 
  faSearchDollar,
  faCheck
} from "@fortawesome/free-solid-svg-icons";
import CallToAction from "../components/home/CallToAction";

const services = [
  {
    id: "property-management",
    icon: faHome,
    title: "Property Management",
    description: "Our comprehensive property management services take the stress out of being a landlord. We handle everything from tenant screening and rent collection to maintenance coordination and property inspections. With our team of experienced professionals, you can rest assured that your investment is in good hands.",
    features: [
      "Tenant screening and selection",
      "Rent collection and disbursement",
      "Property maintenance and repairs",
      "Regular property inspections",
      "Financial reporting",
      "Legal compliance assistance"
    ]
  },
  {
    id: "investment-advisory",
    icon: faChartLine,
    title: "Investment Advisory",
    description: "Make informed investment decisions with our expert guidance. Our real estate investment advisors analyze market trends, evaluate properties, and provide tailored recommendations to help you maximize returns. Whether you're a first-time investor or looking to expand your portfolio, we're here to help you achieve your financial goals.",
    features: [
      "Market analysis and trend forecasting",
      "Investment property identification",
      "Return on investment calculations",
      "Risk assessment and management",
      "Portfolio diversification strategies",
      "Investment exit strategies"
    ]
  },
  {
    id: "buying-selling",
    icon: faKey,
    title: "Buying & Selling",
    description: "Whether you're buying your dream home or selling your property, our experienced agents will guide you through every step of the process. We leverage our market knowledge, negotiation skills, and extensive network to ensure a smooth and successful transaction.",
    features: [
      "Personalized property search",
      "Property valuation and pricing strategy",
      "Professional photography and marketing",
      "Open house coordination",
      "Negotiation and offer management",
      "Closing assistance and follow-up"
    ]
  },
  {
    id: "market-analysis",
    icon: faChartBar,
    title: "Market Analysis",
    description: "Stay ahead of market trends with our detailed analysis and insights. Our research team continuously monitors the real estate market to provide you with up-to-date information on property values, rental rates, and investment opportunities.",
    features: [
      "Neighborhood analysis and reports",
      "Comparative market analysis",
      "Rental market research",
      "Price trend forecasting",
      "Investment opportunity identification",
      "Market condition reports"
    ]
  },
  {
    id: "consultation",
    icon: faUserTie,
    title: "Consultation Services",
    description: "Our consultation services address your specific real estate needs. Whether you're considering a property purchase, renovation, or investment, our experts provide personalized advice to help you make the right decisions.",
    features: [
      "One-on-one consultation sessions",
      "Property improvement recommendations",
      "Renovation cost-benefit analysis",
      "Rental income optimization",
      "Tax and legal considerations",
      "Long-term property strategy"
    ]
  },
  {
    id: "property-valuation",
    icon: faSearchDollar,
    title: "Property Valuation",
    description: "Get an accurate assessment of your property's worth with our valuation services. Our experts use a combination of market data, property features, and local factors to determine a fair and competitive value for your property.",
    features: [
      "Comprehensive property assessment",
      "Market comparison analysis",
      "Historical price trend evaluation",
      "Improvement value calculations",
      "Detailed valuation reports",
      "Selling price recommendations"
    ]
  }
];

const Services = () => {
  return (
    <div>
      <div className="bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">Our Services</h1>
          <p className="mt-4 text-lg text-gray-300">
            Comprehensive real estate solutions tailored to your needs
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary">How We Can Help You</h2>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-500">
            We offer a wide range of professional services to meet all your real estate needs, from property management to investment advisory.
          </p>
        </div>

        <div className="space-y-16">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              id={service.id}
              className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8`}
            >
              <div className="md:w-1/3 flex justify-center">
                <div className="h-48 w-48 rounded-full bg-blue-100 flex items-center justify-center">
                  <FontAwesomeIcon icon={service.icon} className="text-primary text-6xl" />
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold text-secondary mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <h4 className="text-lg font-semibold text-secondary mb-3">What We Offer:</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <FontAwesomeIcon icon={faCheck} className="text-primary mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CallToAction />
    </div>
  );
};

export default Services;
