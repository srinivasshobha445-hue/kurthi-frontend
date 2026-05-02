import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#fffaf7] text-gray-800">

      {/* 🌸 HERO */}
      <div className="py-16 md:py-24 text-center px-4 bg-gradient-to-r from-pink-600 to-rose-500 text-white">
        <h1 className="text-3xl md:text-5xl font-bold">
          Elegance in Every Thread
        </h1>
        <p className="mt-4 text-sm md:text-base max-w-xl mx-auto opacity-90">
          Timeless kurthi styles crafted with tradition, comfort & modern fashion.
        </p>

        <button
          onClick={() => navigate("/collection")}
          className="mt-6 px-6 py-3 bg-white text-pink-600 rounded-full font-medium hover:scale-105 transition"
        >
          Explore Collection
        </button>
      </div>

      {/* 🌿 STORY */}
      <div className="max-w-6xl mx-auto px-4 md:px-10 py-14">

        <h2 className="text-2xl md:text-3xl font-semibold text-center text-pink-700">
          Our Story
        </h2>

        <div className="mt-8 space-y-5 text-gray-600 text-center max-w-3xl mx-auto leading-relaxed">
          <p>
            Our journey began with a simple idea — to create kurthis that feel
            as beautiful as they look. We blend traditional Indian craftsmanship
            with modern design to bring you styles that suit every moment.
          </p>

          <p>
            From breathable cotton for everyday wear to elegant festive styles,
            each piece is thoughtfully designed for comfort, quality, and
            timeless appeal.
          </p>

          <p>
            We believe fashion should be effortless, affordable, and expressive —
            made for real women, real occasions, and real confidence.
          </p>
        </div>
      </div>

      {/* 🌼 FEATURES */}
      <div className="bg-[#fff0f5] py-12">
        <div className="max-w-6xl mx-auto px-4">

          <h2 className="text-center text-2xl md:text-3xl font-semibold text-pink-700 mb-10">
            Why Choose Us
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            <div className="bg-white p-6 rounded-2xl shadow-sm text-center hover:shadow-md transition">
              <h3 className="text-pink-600 font-semibold text-lg">Premium</h3>
              <p className="text-sm text-gray-500 mt-1">High-quality fabrics</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm text-center hover:shadow-md transition">
              <h3 className="text-pink-600 font-semibold text-lg">Elegant</h3>
              <p className="text-sm text-gray-500 mt-1">Modern designs</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm text-center hover:shadow-md transition">
              <h3 className="text-pink-600 font-semibold text-lg">Affordable</h3>
              <p className="text-sm text-gray-500 mt-1">Best pricing</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm text-center hover:shadow-md transition">
              <h3 className="text-pink-600 font-semibold text-lg">Comfort</h3>
              <p className="text-sm text-gray-500 mt-1">All-day wear</p>
            </div>

          </div>
        </div>
      </div>

      {/* 🌺 BRAND VALUES */}
      <div className="max-w-6xl mx-auto px-4 md:px-10 py-14">

        <h2 className="text-center text-2xl md:text-3xl font-semibold text-pink-700">
          Our Promise
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mt-10 text-center">

          <div className="border rounded-2xl p-6 hover:shadow-md transition">
            <h3 className="font-semibold text-lg text-gray-800">Quality First</h3>
            <p className="text-sm text-gray-500 mt-2">
              Every product goes through strict quality checks before reaching you.
            </p>
          </div>

          <div className="border rounded-2xl p-6 hover:shadow-md transition">
            <h3 className="font-semibold text-lg text-gray-800">Customer Focus</h3>
            <p className="text-sm text-gray-500 mt-2">
              Your satisfaction is our priority — easy returns & support always.
            </p>
          </div>

          <div className="border rounded-2xl p-6 hover:shadow-md transition">
            <h3 className="font-semibold text-lg text-gray-800">Style & Comfort</h3>
            <p className="text-sm text-gray-500 mt-2">
              Designed to look stylish while keeping you comfortable all day.
            </p>
          </div>

        </div>
      </div>

      {/* 🌸 CTA */}
      <div className="py-16 text-center px-4 bg-white">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Discover Your Style
        </h2>

        <p className="text-gray-600 mt-3 max-w-xl mx-auto">
          Explore a collection made for every mood, occasion, and personality.
        </p>

        <button
          onClick={() => navigate("/collection")}
          className="mt-6 bg-gradient-to-r from-pink-600 to-rose-500 text-white px-6 py-3 rounded-full hover:scale-105 transition"
        >
          Shop Now
        </button>
      </div>

    </div>
  );
};

export default About;