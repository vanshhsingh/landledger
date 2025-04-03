import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faMapMarkerAlt, 
  faPhone, 
  faEnvelope, 
  faClock 
} from "@fortawesome/free-solid-svg-icons";
import ContactForm from "../components/common/ContactForm";

const Contact = () => {
  return (
    <div>
      <div className="bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">Contact Us</h1>
          <p className="mt-4 text-lg text-gray-300">
            Reach out to our team for any inquiries or assistance
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-secondary mb-6">Get in Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-md bg-primary flex items-center justify-center">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-white" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-secondary">Our Office</h3>
                  <p className="mt-1 text-gray-600">
                    765 Park Avenue<br />
                    Mumbai, Maharashtra 400001<br />
                    India
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-md bg-primary flex items-center justify-center">
                    <FontAwesomeIcon icon={faPhone} className="text-white" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-secondary">Phone</h3>
                  <p className="mt-1 text-gray-600">
                    Main: +91 98765 43210<br />
                    Toll-free: 1800 102 4567
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-md bg-primary flex items-center justify-center">
                    <FontAwesomeIcon icon={faEnvelope} className="text-white" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-secondary">Email</h3>
                  <p className="mt-1 text-gray-600">
                    General: info@landledger.com<br />
                    Support: support@landledger.com
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-md bg-primary flex items-center justify-center">
                    <FontAwesomeIcon icon={faClock} className="text-white" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-secondary">Business Hours</h3>
                  <p className="mt-1 text-gray-600">
                    Monday to Friday: 10:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 2:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-medium text-secondary mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="h-10 w-10 rounded-full bg-[#3b5998] flex items-center justify-center text-white">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-[#1da1f2] flex items-center justify-center text-white">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-[#0077b5] flex items-center justify-center text-white">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-[#c13584] flex items-center justify-center text-white">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-3 bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-secondary mb-6">Send Us a Message</h2>
            <ContactForm />
          </div>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-secondary mb-6">Visit Our Office</h2>
          <div className="h-96 bg-gray-200 rounded-lg overflow-hidden">
            {/* Embed a map here */}
            <div className="w-full h-full">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.71790485953395!3d19.08250392397147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sin!4v1712160669148!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Mumbai Office Location Map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
