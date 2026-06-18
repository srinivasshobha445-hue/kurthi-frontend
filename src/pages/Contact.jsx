import {
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Contact = () => {
  return (
    <div className="bg-gradient-to-b from-white via-pink-50 to-white min-h-screen">
      {/* HERO */}
      <div className="text-center py-16 px-4">
        <span className="bg-pink-100 text-pink-600 px-4 py-1 rounded-full text-sm font-semibold">
          Contact Desire7
        </span>

        <h1 className="text-4xl md:text-5xl font-bold mt-5 text-gray-800">
          We're Here To Help
        </h1>

        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
          Visit our stores, call us directly, or connect with us on WhatsApp
          for product enquiries, orders, and support.
        </p>
      </div>

      {/* CONTACT CARDS */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
        <div className="grid md:grid-cols-3 gap-6">

          {/* PHONE */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 text-center hover:-translate-y-2 transition-all">
            <div className="w-16 h-16 mx-auto rounded-full bg-pink-100 flex items-center justify-center">
              <FaPhoneAlt className="text-pink-600 text-2xl" />
            </div>

            <h3 className="text-xl font-bold mt-5">
              Call Us
            </h3>

            <p className="text-gray-500 mt-2">
              Speak directly with our team
            </p>

            <a
              href="tel:9620802026"
              className="inline-block mt-5 text-pink-600 font-semibold"
            >
              +91 9620802026
            </a>
          </div>

          {/* EMAIL */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 text-center hover:-translate-y-2 transition-all">
            <div className="w-16 h-16 mx-auto rounded-full bg-pink-100 flex items-center justify-center">
              <FaEnvelope className="text-pink-600 text-2xl" />
            </div>

            <h3 className="text-xl font-bold mt-5">
              Email Us
            </h3>

            <p className="text-gray-500 mt-2">
              Send us your enquiries
            </p>

            <a
              href="mailto:desire7clothing@gmail.com"
              className="inline-block mt-5 text-pink-600 font-semibold break-all"
            >
              desire7clothing@gmail.com
            </a>
          </div>

          {/* HOURS */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 text-center hover:-translate-y-2 transition-all">
            <div className="w-16 h-16 mx-auto rounded-full bg-pink-100 flex items-center justify-center">
              <FaClock className="text-pink-600 text-2xl" />
            </div>

            <h3 className="text-xl font-bold mt-5">
              Store Hours
            </h3>

            <p className="text-gray-500 mt-2">
              Open every day
            </p>

            <p className="mt-5 text-pink-600 font-semibold">
              10:00 AM - 9:00 PM
            </p>
          </div>
        </div>

        {/* MAIN CONTACT SECTION */}
        <div className="mt-12 bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-12">

          <div className="flex items-center gap-3 mb-6">
            <FaMapMarkerAlt className="text-pink-600 text-xl" />
            <h2 className="text-2xl font-bold text-gray-800">
              Visit Our Stores
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-pink-50 rounded-2xl p-5">
              <h3 className="font-bold text-lg text-gray-800">
                Desire7
              </h3>

              <p className="text-gray-600 text-sm mt-2">
                Garebhavipalya 81/1-1, 14th Main, Begur Rd,
                near Holy Family Church, Adarsha Layout,
                Hongasandra, Bengaluru, Karnataka 560114
              </p>
            </div>

            <div className="bg-pink-50 rounded-2xl p-5">
              <h3 className="font-bold text-lg text-gray-800">
                Desire7
              </h3>

              <p className="text-gray-600 text-sm mt-2">
                Indian Oil Petroleum, 883 Perody Chamber,
                New, Vijaya Bank Layout,
                Bengaluru, Karnataka 560076
              </p>
            </div>

            <div className="bg-pink-50 rounded-2xl p-5">
              <h3 className="font-bold text-lg text-gray-800">
                New Look
              </h3>

              <p className="text-gray-600 text-sm mt-2">
                JC Nagar Main Rd, 2nd Phase,
                Royal Meridian Layout,
                Devarachikkana Halli,
                Bengaluru, Karnataka 560114
              </p>
            </div>

          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap justify-center gap-4 mt-10">

            <a
              href="tel:9620802026"
              className="bg-pink-600 text-white px-8 py-3 rounded-full hover:bg-pink-700 transition"
            >
              Call Now
            </a>

            <a
              href="https://wa.me/919620802026"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition flex items-center gap-2"
            >
              <FaWhatsapp />
              WhatsApp
            </a>

          </div>
        </div>

        {/* FOOTER */}
        <div className="text-center mt-10 text-gray-500 text-sm">
          Thank you for choosing Desire7 & New Look ❤️
        </div>
      </div>
    </div>
  );
};

export default Contact;