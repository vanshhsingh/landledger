import Hero from "../components/home/Hero";
import SearchFilters from "../components/home/SearchFilters";
import FeaturedProperties from "../components/home/FeaturedProperties";
import Services from "../components/home/Services";
import Testimonials from "../components/home/Testimonials";
import CallToAction from "../components/home/CallToAction";

const Home = () => {
  return (
    <div>
      <Hero />
      <SearchFilters />
      <FeaturedProperties />
      <Services />
      <Testimonials />
      <CallToAction />
    </div>
  );
};

export default Home;
