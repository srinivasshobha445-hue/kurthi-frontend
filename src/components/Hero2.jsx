import { useEffect, useState } from "react";
import { getHero2 } from "../api/hero2";
import { Link } from "react-router-dom";

const Hero2 = () => {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const data = await getHero2(); // ✅ already returns clean data

        console.log("Hero API 👉", data); // ✅ debug correct

        setHero(data); // ✅ FIXED
      } catch (err) {
        console.error("Hero fetch error:", err);
      }
    };

    fetchHero();
  }, []);

  // ✅ fallback UI
  if (!hero || Object.keys(hero).length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No Hero Data Found
      </div>
    );
  }

  return (
    <div className="px-6 md:px-12 py-12">
      <div className="grid md:grid-cols-2 gap-8 items-center bg-gray-50 rounded-2xl overflow-hidden shadow-sm">

        {/* IMAGE */}
        <div className="overflow-hidden">
          <img
            src={hero.image || "https://via.placeholder.com/500"}
            alt={hero.title || "hero"}
            className="w-full h-64 md:h-full object-cover hover:scale-105 transition duration-500"
          />
        </div>

        {/* CONTENT */}
        <div className="p-6 md:p-10 text-center md:text-left">

          <p className="text-sm text-pink-600 font-medium tracking-wide uppercase">
            {hero.subtitle || "Subtitle"}
          </p>

          <h2 className="text-2xl md:text-4xl font-bold mt-2 leading-tight">
            {hero.title || "Title"}
          </h2>

          <p className="text-gray-600 mt-4 text-sm md:text-base">
            {hero.description || "Description"}
          </p>

          {hero.buttonLink && (
            <Link to={hero.buttonLink}>
              <button className="mt-6 px-6 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition shadow-md">
                {hero.buttonText || "Shop Now"}
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero2;