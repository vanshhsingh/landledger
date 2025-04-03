import { Link } from "wouter";

const Hero = () => {
  return (
    <section className="relative bg-secondary overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/90 to-secondary/70"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 sm:py-24 md:py-28 lg:py-32">
        <div className="max-w-2xl">
          <h1 className="text-white text-shadow-lg">
            Find Your Dream Property with Expert Guidance
          </h1>
          <p className="mt-4 text-lg text-white text-shadow-sm">
            Professional advisory services and property management solutions tailored to your needs.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/properties" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-blue-700 shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
              View Properties
            </Link>
            <Link href="/services" className="inline-flex items-center justify-center px-5 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:bg-opacity-10 shadow transition-all duration-300 hover:translate-y-[-2px]">
              Our Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
