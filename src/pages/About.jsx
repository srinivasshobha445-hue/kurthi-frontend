import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  FaTshirt,
  FaStore,
  FaHeart,
  FaShippingFast,
  FaAward,
  FaUsers,
} from "react-icons/fa";

const About = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>
          About Desire7 Clothing | Women's Fashion & Designer Kurtis Bangalore
        </title>

        <meta
          name="description"
          content="Learn about Desire7 Clothing, Bangalore's trusted destination for stylish kurtis, ethnic wear, and women's fashion. Premium quality, affordable prices, and latest collections."
        />

        <meta
          name="keywords"
          content="Desire7 Clothing, About Desire7, Kurti Shop Bangalore, Women's Fashion Bangalore, Ethnic Wear, Designer Kurtis, Cotton Kurtis, Kurti Store"
        />

        <link
          rel="canonical"
          href="https://www.desire7clothing.com/about"
        />

        <meta
          property="og:title"
          content="About Desire7 Clothing"
        />

        <meta
          property="og:description"
          content="Discover the story behind Desire7 Clothing and our commitment to quality fashion for women."
        />

        <meta
          property="og:url"
          content="https://www.desire7clothing.com/about"
        />

        <meta property="og:type" content="website" />
      </Helmet>

      <div className="bg-[#fffaf7] text-gray-800">

        {/* HERO */}
        <section className="bg-gradient-to-r from-pink-600 to-rose-500 text-white py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold">
              About Desire7 Clothing
            </h1>

            <p className="mt-6 max-w-3xl mx-auto text-lg opacity-95">
              Bringing style, comfort, and confidence together through
              beautifully crafted kurtis and women's fashion collections.
            </p>

            <button
              onClick={() => navigate("/collection")}
              className="mt-8 bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:scale-105 transition"
            >
              Explore Collection
            </button>
          </div>
        </section>

        {/* STORY */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-pink-700">
              Our Story
            </h2>
          </div>

          <div className="max-w-4xl mx-auto text-center space-y-6 text-gray-600 leading-relaxed">
            <p>
              Desire7 Clothing was founded with a simple vision: to make
              fashionable ethnic wear accessible to every woman. Our collections
              combine traditional craftsmanship with modern trends to create
              outfits that are elegant, comfortable, and affordable.
            </p>

            <p>
              From daily wear cotton kurtis to festive and designer collections,
              every piece is carefully selected to ensure premium quality,
              perfect fitting, and long-lasting comfort.
            </p>

            <p>
              Today, Desire7 proudly serves customers across Bangalore through
              multiple retail branches and our online fashion platform.
            </p>
          </div>
        </section>

        {/* STATS */}
        <section className="bg-pink-50 py-16">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">

            <div className="bg-white rounded-2xl p-6 text-center shadow">
              <FaStore className="mx-auto text-pink-600 text-3xl mb-3" />
              <h3 className="font-bold text-2xl">3+</h3>
              <p className="text-gray-500">Store Branches</p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow">
              <FaUsers className="mx-auto text-pink-600 text-3xl mb-3" />
              <h3 className="font-bold text-2xl">1000+</h3>
              <p className="text-gray-500">Happy Customers</p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow">
              <FaTshirt className="mx-auto text-pink-600 text-3xl mb-3" />
              <h3 className="font-bold text-2xl">500+</h3>
              <p className="text-gray-500">Fashion Styles</p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow">
              <FaAward className="mx-auto text-pink-600 text-3xl mb-3" />
              <h3 className="font-bold text-2xl">Premium</h3>
              <p className="text-gray-500">Quality Products</p>
            </div>

          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
          <h2 className="text-center text-3xl font-bold text-pink-700 mb-12">
            Why Choose Desire7?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white p-8 rounded-3xl shadow hover:shadow-lg transition">
              <FaAward className="text-pink-600 text-4xl mb-4" />
              <h3 className="font-bold text-xl mb-3">
                Premium Quality
              </h3>
              <p className="text-gray-600">
                Carefully selected fabrics and quality craftsmanship.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow hover:shadow-lg transition">
              <FaHeart className="text-pink-600 text-4xl mb-4" />
              <h3 className="font-bold text-xl mb-3">
                Trendy Designs
              </h3>
              <p className="text-gray-600">
                Latest fashion collections inspired by modern trends.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow hover:shadow-lg transition">
              <FaShippingFast className="text-pink-600 text-4xl mb-4" />
              <h3 className="font-bold text-xl mb-3">
                Customer First
              </h3>
              <p className="text-gray-600">
                Fast service, easy shopping experience, and trusted support.
              </p>
            </div>

          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-pink-600 to-rose-500 text-white py-20">
          <div className="max-w-5xl mx-auto text-center px-4">

            <h2 className="text-3xl md:text-4xl font-bold">
              Discover Your Perfect Style
            </h2>

            <p className="mt-4 opacity-90">
              Browse our latest collection of kurtis and ethnic fashion.
            </p>

            <button
              onClick={() => navigate("/collection")}
              className="mt-8 bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:scale-105 transition"
            >
              Shop Now
            </button>

          </div>
        </section>
      </div>
    </>
  );
};

export default About;