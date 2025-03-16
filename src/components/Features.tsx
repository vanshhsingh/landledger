import '../../css/Features.css'
const features = [
    {
      id: 1,
      title: "AI-Powered Property Valuation",
      description: "Accurate price predictions using machine learning and real-time market data.",
      image: "img/artificial-intelligence_4616809.png" 
    },
    {
      id: 2,
      title: "Decentralized Ownership with Web3",
      description: "Secure your property transactions using blockchain and smart contracts.",
      image: "img/web-3-icon.png"
    },
    {
      id: 3,
      title: "Advanced Search & Filters",
      description: "Easily find properties based on price, location, home type, and more.",
      image: "img/filter.png"
    }
  ];
  
  export default function Features() {
    return (
      <section className="features">
        {/* <h2 className="section-title">Why Choose LandLedger?</h2> */}
        <div className="feature-grid">
          {features.map((feature) => (
            <div key={feature.id} className="feature-card">
              <img src={feature.image} alt={feature.title} className="feature-image" />
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  