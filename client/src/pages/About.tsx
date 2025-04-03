import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBullseye, 
  faEye, 
  faHandshake, 
  faUserTie, 
  faAward,
  faUsers
} from "@fortawesome/free-solid-svg-icons";
import CallToAction from "../components/home/CallToAction";

const About = () => {
  const teamMembers = [
    {
      name: "John Smith",
      title: "Founder & CEO",
      bio: "With over 20 years of experience in real estate, John has helped hundreds of clients find their dream homes and make smart investment decisions.",
      initial: "JS"
    },
    {
      name: "Emily Johnson",
      title: "Head of Property Management",
      bio: "Emily specializes in property management and has a proven track record of maximizing returns for property owners while ensuring tenant satisfaction.",
      initial: "EJ"
    },
    {
      name: "Michael Davis",
      title: "Investment Advisor",
      bio: "Michael's background in finance and real estate allows him to provide expert guidance on investment opportunities and portfolio diversification.",
      initial: "MD"
    },
    {
      name: "Sarah Thompson",
      title: "Senior Property Agent",
      bio: "Sarah has a keen eye for property values and market trends, helping clients buy and sell properties at optimal prices.",
      initial: "ST"
    }
  ];

  return (
    <div>
      <div className="bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">About Us</h1>
          <p className="mt-4 text-lg text-gray-300">
            Learn more about our company and our mission
          </p>
        </div>
      </div>

      {/* Company Story */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-secondary">Our Story</h2>
              <div className="mt-6 space-y-4 text-gray-600">
                <p>
                  Founded in 2005, EstateAdvisor began with a simple mission: to provide honest, personalized real estate services that put clients' needs first. What started as a small team of passionate real estate professionals has grown into a trusted advisory firm serving hundreds of clients across the country.
                </p>
                <p>
                  Our founder, John Smith, recognized a gap in the market for truly client-focused real estate services. Too often, he saw clients receiving generic advice that didn't account for their unique circumstances and goals. EstateAdvisor was created to change that paradigm.
                </p>
                <p>
                  Today, we continue to uphold our founding principles while expanding our services to meet the evolving needs of our clients. Our team of experienced professionals is dedicated to providing expert guidance and personalized solutions for all your real estate needs.
                </p>
              </div>
            </div>
            <div className="bg-neutral-100 rounded-lg p-8">
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-md bg-primary flex items-center justify-center">
                      <FontAwesomeIcon icon={faBullseye} className="text-white text-lg" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-medium text-secondary">Our Mission</h3>
                    <p className="mt-2 text-gray-600">
                      To empower our clients to make informed real estate decisions through expert advice, personalized service, and unwavering integrity.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-md bg-primary flex items-center justify-center">
                      <FontAwesomeIcon icon={faEye} className="text-white text-lg" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-medium text-secondary">Our Vision</h3>
                    <p className="mt-2 text-gray-600">
                      To be the most trusted name in real estate advisory, known for our expertise, integrity, and client-centered approach.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-md bg-primary flex items-center justify-center">
                      <FontAwesomeIcon icon={faHandshake} className="text-white text-lg" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-medium text-secondary">Our Values</h3>
                    <p className="mt-2 text-gray-600">
                      Integrity, Excellence, Client Focus, Innovation, and Community Engagement guide everything we do.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-secondary">Why Choose EstateAdvisor</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              We stand out from the competition with our unique approach and commitment to excellence.
            </p>
          </div>

          <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <FontAwesomeIcon icon={faUserTie} className="text-primary text-3xl mb-4" />
              <h3 className="text-xl font-semibold text-secondary">Expert Team</h3>
              <p className="mt-2 text-gray-600">
                Our team consists of seasoned professionals with decades of combined experience in all aspects of real estate.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <FontAwesomeIcon icon={faAward} className="text-primary text-3xl mb-4" />
              <h3 className="text-xl font-semibold text-secondary">Proven Track Record</h3>
              <p className="mt-2 text-gray-600">
                We've helped hundreds of clients achieve their real estate goals with a high rate of satisfaction.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <FontAwesomeIcon icon={faHandshake} className="text-primary text-3xl mb-4" />
              <h3 className="text-xl font-semibold text-secondary">Personalized Approach</h3>
              <p className="mt-2 text-gray-600">
                We take the time to understand your unique needs and tailor our services accordingly.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <FontAwesomeIcon icon={faChartLine} className="text-primary text-3xl mb-4" />
              <h3 className="text-xl font-semibold text-secondary">Market Insight</h3>
              <p className="mt-2 text-gray-600">
                Our deep understanding of market trends allows us to provide timely and valuable advice.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <FontAwesomeIcon icon={faUsers} className="text-primary text-3xl mb-4" />
              <h3 className="text-xl font-semibold text-secondary">Client-First Mentality</h3>
              <p className="mt-2 text-gray-600">
                Your best interests always come first – we measure our success by your satisfaction.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <FontAwesomeIcon icon={faKey} className="text-primary text-3xl mb-4" />
              <h3 className="text-xl font-semibold text-secondary">End-to-End Service</h3>
              <p className="mt-2 text-gray-600">
                From initial consultation to closing the deal, we support you at every step of your real estate journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-secondary">Meet Our Team</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Our experienced professionals are dedicated to helping you achieve your real estate goals.
            </p>
          </div>

          <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-neutral-50 rounded-lg overflow-hidden shadow-sm">
                <div className="h-48 bg-primary flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">{member.initial}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-secondary">{member.name}</h3>
                  <p className="text-primary font-medium">{member.title}</p>
                  <p className="mt-3 text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
    </div>
  );
};

export default About;
