import { useEffect, useState } from "react";
import { getActiveHero } from "../api/hero";

const Hero = () => {
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await getActiveHero();
        setHero(res.data || null);
      } catch (error) {
        console.error("Hero fetch error:", error);
        setHero(null);
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[60vh] md:h-[80vh] bg-gray-100 animate-pulse" />
    );
  }

  if (!hero) return null;

  return (
    <section className="w-full">
      <picture>
        <source media="(max-width: 768px)" srcSet={hero.mobileImage} />
        <source media="(min-width: 769px)" srcSet={hero.desktopImage} />
        <img
          src={hero.desktopImage}
          alt="Hero banner"
          className="w-full h-[60vh] md:h-[80vh] object-cover"
          loading="eager"
          decoding="async"
        />
      </picture>
    </section>
  );
};

export default Hero;