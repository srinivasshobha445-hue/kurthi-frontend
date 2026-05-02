import { FaExchangeAlt, FaShippingFast, FaHeadset } from "react-icons/fa";

const features = [
  {
    title: "Easy Exchange",
    desc: "Hassle-free exchange within 7 days",
    icon: <FaExchangeAlt />,
  },
  {
    title: "Fast Delivery",
    desc: "Get your orders delivered quickly",
    icon: <FaShippingFast />,
  },
  {
    title: "24/7 Support",
    desc: "We are here to help anytime",
    icon: <FaHeadset />,
  },
];

const Features = () => {
  return (
    <div className="px-6 md:px-12 py-12 bg-gray-50">

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">

        {features.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition duration-300 group"
          >
            {/* ICON */}
            <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-pink-50 text-pink-600 text-xl group-hover:scale-110 transition">
              {item.icon}
            </div>

            {/* TITLE */}
            <h3 className="mt-4 text-lg font-semibold text-gray-800">
              {item.title}
            </h3>

            {/* DESC */}
            <p className="text-sm text-gray-500 mt-2">
              {item.desc}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Features;