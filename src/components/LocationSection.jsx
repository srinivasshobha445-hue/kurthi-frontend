import {
  FaMapMarkerAlt,
  FaDirections,
  FaStore,
  FaPhoneAlt,
  FaClock,
} from "react-icons/fa";

const branches = [
  {
    name: "Desire7",
    badge: "Main Branch",
    address:
      "Garebhavipalya 81/1-1, 14th Main, Begur Rd, near Holy Family Church, Adarsha Layout, Hongasandra, Bengaluru, Karnataka 560114",
    timing: "10:00 AM - 9:00 PM",
    phone: "9620802026",
  },
  {
    name: "Desire7",
    badge: "Branch 2",
    address:
      "Indian Oil Petroleum, 883 Perody Chamber, New, Vijaya Bank Layout, Bengaluru, Karnataka 560076",
    timing: "10:00 AM - 9:00 PM",
    phone: "9620802026",
  },
  {
    name: "New Look",
    badge: "Premium Collection",
    address:
      "JC Nagar Main Rd, 2nd Phase, Royal Meridian Layout, Devarachikkana Halli, Bengaluru, Karnataka 560114",
    timing: "Open • Closes 9 PM",
    phone: "9620802026",
  },
];

const LocationSection = () => {
  return (
    <section className="bg-gradient-to-b from-white via-pink-50 to-white py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1 bg-pink-100 text-pink-600 rounded-full text-sm font-semibold mb-4">
            Visit Our Stores
          </span>

          <h2 className="text-3xl md:text-5xl font-bold text-gray-800">
            Our Store Locations
          </h2>

          <p className="text-gray-500 mt-4 max-w-3xl mx-auto">
            Visit any of our branches and discover premium fashion
            collections, latest arrivals, and exclusive offers.
          </p>
        </div>

        {/* Branches */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {branches.map((branch, index) => {
            const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              branch.address
            )}`;

            return (
              <div
                key={index}
                className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                {/* Card Content */}
                <div className="p-6">
                  <span className="inline-block bg-pink-100 text-pink-600 text-xs font-semibold px-3 py-1 rounded-full mb-5">
                    {branch.badge}
                  </span>

                  {/* Store Header */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 rounded-full bg-pink-100 flex items-center justify-center">
                      <FaStore className="text-pink-600 text-xl" />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {branch.name}
                      </h3>

                      <div className="flex items-center gap-2 text-green-600 text-sm mt-1">
                        <FaClock />
                        <span>{branch.timing}</span>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex gap-3 mb-4">
                    <FaMapMarkerAlt className="text-pink-600 mt-1 flex-shrink-0" />

                    <p className="text-gray-600 text-sm leading-relaxed">
                      {branch.address}
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-wrap gap-3 mt-6">
                    <a
                      href={mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-pink-600 text-white px-5 py-3 rounded-full hover:bg-pink-700 transition"
                    >
                      <FaDirections />
                      Directions
                    </a>

                    <a
                      href={`tel:${branch.phone}`}
                      className="flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-full hover:bg-green-700 transition"
                    >
                      <FaPhoneAlt />
                      Call
                    </a>
                  </div>
                </div>

                {/* Google Map */}
                <div className="h-[220px] md:h-[260px]">
                  <iframe
                    src={`https://www.google.com/maps?q=${encodeURIComponent(
                      branch.address
                    )}&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={branch.name}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 bg-gradient-to-r from-pink-600 to-pink-500 text-white rounded-3xl p-8 md:p-10 text-center shadow-xl">
          <h3 className="text-2xl md:text-3xl font-bold mb-3">
            Find Your Perfect Style Today ✨
          </h3>

          <p className="max-w-2xl mx-auto text-pink-100">
            Visit our stores and explore exclusive collections, trendy
            outfits, and premium quality fashion at the best prices.
          </p>

          <a
            href="tel:9620802026"
            className="inline-block mt-6 bg-white text-pink-600 font-semibold px-8 py-3 rounded-full hover:scale-105 transition"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;