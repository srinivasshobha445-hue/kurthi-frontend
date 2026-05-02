import { FaMapMarkerAlt, FaDirections } from "react-icons/fa";

const LocationSection = () => {
  const address = `GMR TOWERS, #81/1, 14TH MAIN, HONGASANDRA, BEGUR MAIN ROAD, BANGALORE 560068`;

  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <section className="bg-gray-50 py-12 px-4 md:px-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">

        {/* LEFT - INFO */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Visit Our Store 📍
          </h2>

          <div className="flex items-start gap-3 text-gray-600">
            <FaMapMarkerAlt className="text-pink-600 mt-1" />
            <p className="leading-relaxed">
              GMR TOWERS <br />
              #81/1, 14TH MAIN, HONGASANDRA <br />
              BEGUR MAIN ROAD <br />
              BANGALORE – 560068
            </p>
          </div>

          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 px-5 py-2 bg-pink-600 text-white rounded-full shadow hover:bg-pink-700 transition"
          >
            <FaDirections />
            Get Directions
          </a>
        </div>

        {/* RIGHT - MAP */}
        <div className="w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow">
          <iframe
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              address
            )}&output=embed`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

      </div>
    </section>
  );
};

export default LocationSection;