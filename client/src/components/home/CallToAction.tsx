import { Link } from "wouter";

const CallToAction = () => {
  return (
    <section className="py-12 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white">Ready to Get Started?</h2>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-blue-100">
          Contact our team of experts to discuss your real estate needs today.
        </p>
        <div className="mt-8 flex justify-center">
          <Link href="/contact" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-blue-50">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
