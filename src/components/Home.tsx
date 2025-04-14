import '../../css/Home.css'
import { Link} from "react-router-dom";



export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">

      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">Your Dream Property, Just a Click Away</h1>
        <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">LandLedger helps you find verified properties, connect with sellers, and manage your real estate portfolio all in one place.</p>
        <Link to="/buy" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-xl transition-all text-lg">Browse Properties</Link>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-14 text-center">
          {[
            { src: 'img/verify.png', title: 'Verified Listings', desc: 'Only trusted listings from verified sellers.' },
            { src: 'img/deal.png', title: 'Best Deals', desc: 'Exclusive listings with competitive pricing.' },
            { src: 'img/luxury-home.png', title: 'Luxurious Options', desc: 'From cozy apartments to grand villas.' },
            { src: 'img/support.png', title: 'Expert Support', desc: '24/7 assistance from real estate professionals.' },
          ].map((feature, idx) => (
            <div key={idx} className="hover:shadow-xl transition p-6 rounded-xl border border-gray-100">
              <img src={feature.src} alt={feature.title} className="mx-auto mb-4 h-20 w-20 object-contain" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

    <section className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Explore Popular Cities</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad'].map(city => (
            <div key={city} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <img src={`https://source.unsplash.com/300x200/?${city},city`} alt={city} className="w-full h-32 object-cover rounded-md mb-4" />
              <h3 className="text-lg font-semibold text-gray-800">{city}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Join Thousands of Happy Homeowners</h2>
        <p className="text-gray-600 mb-6">LandLedger has helped over 10,000+ users buy and sell property with ease, trust, and satisfaction.</p>
        <Link to="/signup" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-all text-md">Get Started</Link>
      </div>
    </section>
  </main>
  )
}
