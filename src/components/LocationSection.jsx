import { FaMapMarkerAlt, FaDirections, FaStore } from "react-icons/fa";

const branches = [
{
name: "Desire7 - Hongasandra",
address:
"Garebhavipalya 81/1-1, 14th Main, Begur Rd, near Holy Family Church, Adarsha Layout, Hongasandra, Bengaluru, Karnataka 560114",
timing: "10:00 AM - 9:00 PM",
badge: "Main Branch",
},
{
name: "Desire7 - Vijaya Bank Layout",
address:
"Indian Oil Petroleum, 883 Perody Chamber, New, Vijaya Bank Layout, Bengaluru, Karnataka 560076",
timing: "10:00 AM - 9:00 PM",
badge: "Branch 2",
},
{
name: "New Look",
address:
"JC Nagar Main Rd, 2nd Phase, Royal Meridian Layout, Devarachikkana Halli, Bengaluru, Karnataka 560114",
timing: "Open • Closes 9 PM",
badge: "Premium Collection",
},
];

const LocationSection = () => {
return ( <section className="bg-gradient-to-b from-white to-pink-50 py-16 px-4 md:px-8"> <div className="max-w-7xl mx-auto">

    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-5xl font-bold text-gray-800">
        Our Store Locations
      </h2>

      <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
        Visit any of our branches and explore the latest collections,
        premium fabrics, and exclusive offers.
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

      {branches.map((branch, index) => {
        const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          branch.address
        )}`;

        return (
          <div
            key={index}
            className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100"
          >
            <div className="p-6">

              <span className="inline-block bg-pink-100 text-pink-600 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                {branch.badge}
              </span>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
                  <FaStore className="text-pink-600 text-lg" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {branch.name}
                  </h3>

                  <p className="text-green-600 text-sm font-medium">
                    {branch.timing}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <FaMapMarkerAlt className="text-pink-600 mt-1 flex-shrink-0" />

                <p className="text-gray-600 text-sm leading-relaxed">
                  {branch.address}
                </p>
              </div>

              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 bg-pink-600 text-white px-5 py-3 rounded-full hover:bg-pink-700 transition"
              >
                <FaDirections />
                Get Directions
              </a>
            </div>

            <div className="h-[260px]">
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  branch.address
                )}&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        );
      })}
    </div>
  </div>
</section>


);
};

export default LocationSection;
