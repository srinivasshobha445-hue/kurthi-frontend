import { useEffect, useState } from "react";
import { getActiveHero } from "../api/hero";

const Hero = () => {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await getActiveHero();
        setHero(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchHero();
  }, []);

  if (!hero) return null;

  return (
    <div className="w-full h-[60vh] md:h-[80vh] relative">
      <picture>
        <source media="(max-width: 768px)" srcSet={hero.mobile} />
        <img
          src={hero.desktopImage}
          alt="hero"
          className="w-full h-full object-cover"
        />
      </picture>
    </div>
  );
};

export default Hero;