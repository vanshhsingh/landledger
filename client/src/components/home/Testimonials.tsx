import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar, faStarHalfAlt } from "@fortawesome/free-regular-svg-icons";

const testimonials = [
  {
    id: 1,
    rating: 5,
    text: "LandLedger helped me find the perfect investment property. Their market knowledge and guidance throughout the process was invaluable.",
    name: "Rajesh Patel",
    title: "Property Investor",
    initials: "RP"
  },
  {
    id: 2,
    rating: 5,
    text: "Their property management services are top-notch. I no longer worry about my rental properties as they handle everything professionally.",
    name: "Priya Sharma",
    title: "Property Owner",
    initials: "PS"
  },
  {
    id: 3,
    rating: 4.5,
    text: "As a first-time homebuyer, I was nervous about the process. The team at LandLedger made it smooth and stress-free.",
    name: "Vikram Mehta",
    title: "Homeowner",
    initials: "VM"
  }
];

const RatingStars = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return (
    <div className="text-amber-400 flex">
      {[...Array(fullStars)].map((_, i) => (
        <FontAwesomeIcon key={`full-${i}`} icon={solidStar} />
      ))}
      
      {hasHalfStar && <FontAwesomeIcon icon={faStarHalfAlt} />}
      
      {[...Array(emptyStars)].map((_, i) => (
        <FontAwesomeIcon key={`empty-${i}`} icon={regularStar} />
      ))}
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className="py-12 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-secondary dark:text-white">What Our Clients Say</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
            Don't just take our word for it — hear from some of our satisfied clients.
          </p>
        </div>

        <div className="mt-10 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-neutral-50 dark:bg-gray-800 p-6 rounded-lg border border-neutral-200 dark:border-gray-700 testimonial-card">
              <div className="flex items-center mb-4">
                <RatingStars rating={testimonial.rating} />
              </div>
              <blockquote className="text-gray-700 dark:text-gray-300 italic">
                "{testimonial.text}"
              </blockquote>
              <div className="mt-4 flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                  <span className="text-gray-600 dark:text-gray-200 font-medium">{testimonial.initials}</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-secondary dark:text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
