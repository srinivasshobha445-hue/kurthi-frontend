import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-gray-100 mt-16">
      
      <div className="px-6 md:px-12 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold text-pink-600">
            Desire<span className="text-black">7</span>
          </h2>
          <p className="text-sm text-gray-600 mt-4">
            Discover elegant and trendy kurtis for every occasion.
            Style meets comfort with our premium collection.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <div className="flex flex-col gap-2 text-sm text-gray-600">
            <Link to="/">Home</Link>
            <Link to="/collection">Collection</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        {/* CATEGORIES */}
        <div>
          <h3 className="font-semibold mb-4">Categories</h3>
          <div className="flex flex-col gap-2 text-sm text-gray-600">
            <Link to="/collection">Cotton Kurti</Link>
            <Link to="/collection">Party Wear</Link>
            <Link to="/collection">Casual Wear</Link>
            <Link to="/collection">Festive Collection</Link>
          </div>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold mb-4">Contact</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p>Email: support@kurtistore.com</p>
            <p>Phone: +91 9876543210</p>
            <p>Bangalore, India</p>
          </div>

          {/* SOCIAL */}
          <div className="flex gap-4 mt-4 text-xl">
            <FaInstagram className="cursor-pointer hover:text-pink-500" />
            <FaFacebook className="cursor-pointer hover:text-blue-500" />
            <FaTwitter className="cursor-pointer hover:text-blue-400" />
          </div>
        </div>

      </div>

      {/* BOTTOM */}
      
      <div className="border-t text-center py-4 text-sm text-gray-500 flex flex-col md:flex-row items-center justify-center gap-2">
  <p>© 2026 Desire7. All rights reserved.</p>
  
  <p>
    Developed by{" "}
    <span className="text-pink-600 font-medium hover:underline cursor-pointer">
      SLB Tech
    </span>
  </p>
</div>

    </div>
  );
};

export default Footer;