import Hero from "../components/Hero";
import TrendingProducts from "../components/TrendingProducts";
import Categories from "../components/Categories";
import Hero2 from "../components/Hero2";
import Features from "../components/Features";
import LocationSection from "../components/LocationSection";

const Home = () => {
  return (
    <div>
      <Hero />
       <Categories limit={7} />
       <TrendingProducts />
       <Hero2 />
       <Features />
        <LocationSection />
    </div>
  );
};

export default Home;