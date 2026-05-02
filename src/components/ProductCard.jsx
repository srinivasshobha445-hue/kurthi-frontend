import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  // ✅ Safe fallback image
  const image =
    product.image || "https://via.placeholder.com/400x500?text=No+Image";

  // ✅ Discount logic
  const discount =
    product.discount > 0
      ? product.discount
      : product.oldPrice && product.price
      ? Math.round(
          ((product.oldPrice - product.price) / product.oldPrice) * 100
        )
      : 0;

  // ✅ Savings
  const savings =
    product.oldPrice && product.price
      ? product.oldPrice - product.price
      : 0;

  // ✅ Add to Cart
  const handleAddToCart = (e, redirect = false) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(product, 1, "M");

    toast.success("Added to cart 🛒");

    if (redirect) {
      navigate("/checkout", {
        state: { product, discount },
      });
    }
  };

  return (
    <div className="group bg-white rounded-2xl border hover:shadow-xl transition duration-300 overflow-hidden">

      {/* IMAGE */}
      <div className="relative overflow-hidden">
        <Link to={`/product/${product._id}`}>
          <img
            src={image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
          />
        </Link>

        {/* DISCOUNT BADGE */}
        {discount > 0 && (
          <div className="absolute top-3 left-3">
            <span className="bg-pink-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
              {discount}% OFF
            </span>
          </div>
        )}

        {/* QUICK BUY */}
        <button
          onClick={(e) => handleAddToCart(e, true)}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-1 text-xs rounded-full opacity-0 group-hover:opacity-100 transition"
        >
          Buy Now
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-4">

        {/* NAME */}
        <Link to={`/product/${product._id}`}>
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-1 group-hover:text-pink-600 transition">
            {product.name}
          </h3>
        </Link>

        {/* CATEGORY (FIXED) */}
        {product.category?.name && (
          <p className="text-xs text-gray-500 mt-1">
            {product.category.name}
          </p>
        )}

        {/* FABRIC */}
        {product.fabric && (
          <p className="text-xs text-gray-400 mt-1">
            Fabric: {product.fabric}
          </p>
        )}

        {/* PRICE */}
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <span className="text-lg font-bold text-pink-600">
            ₹{product.price}
          </span>

          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              ₹{product.oldPrice}
            </span>
          )}

          {discount > 0 && (
            <span className="text-xs text-green-600 font-medium">
              {discount}% off
            </span>
          )}
        </div>

        {/* SAVINGS */}
        {savings > 0 && (
          <p className="text-xs text-green-500 mt-1">
            You save ₹{savings}
          </p>
        )}

        {/* ADD TO CART */}
        <button
          onClick={(e) => handleAddToCart(e)}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-pink-600 text-white py-2 rounded-full hover:bg-pink-700 transition shadow"
        >
          <FaShoppingCart />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;