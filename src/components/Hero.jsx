import { useEffect, useState } from "react";
import { getActiveHero } from "../api/hero";

const Hero = () => {
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await getActiveHero();

        console.log("🔥 Hero Data:", res.data);

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
    <section className="w-full overflow-hidden">
      <picture>
        {/* Mobile */}
        <source
          media="(max-width: 768px)"
          srcSet={hero.mobileImage}
        />

        {/* Desktop */}
        <source
          media="(min-width: 769px)"
          srcSet={hero.desktopImage}
        />

        {/* Default fallback */}
        <img
          key={hero._id}
          src={hero.desktopImage}
          alt="Hero Banner"
          className="w-full h-[60vh] md:h-[80vh] object-cover object-center"
          loading="eager"
        />
      </picture>
    </section>
  );
};

export default Hero;