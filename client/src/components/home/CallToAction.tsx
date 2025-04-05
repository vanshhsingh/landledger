import { Link } from "wouter";

const CallToAction = () => {
  return (
    <section className="py-12 bg-primary dark:bg-blue-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white text-shadow-lg dark:text-shadow-lg-dark">Ready to Get Started?</h2>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-blue-100 dark:text-blue-50 text-shadow-sm dark:text-shadow-sm-dark">
          Contact our team of experts to discuss your real estate needs today.
        </p>
        <div className="mt-8 flex justify-center">
          <Link href="/contact" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary dark:text-blue-800 bg-white hover:bg-blue-50 dark:hover:bg-blue-50">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
