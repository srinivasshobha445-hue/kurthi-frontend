import { memo, useCallback, useContext, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";

const FALLBACK_IMAGE = "https://via.placeholder.com/600x800?text=No+Image";

const ProductCard = memo(({ product }) => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  const image = useMemo(() => {
    return imgError || !product?.image ? FALLBACK_IMAGE : product.image;
  }, [imgError, product?.image]);

  const discount = useMemo(() => {
    if (!product) return 0;
    if (Number(product.discount) > 0) return Number(product.discount);

    const oldPrice = Number(product.oldPrice);
    const price = Number(product.price);

    if (oldPrice > 0 && price > 0 && oldPrice > price) {
      return Math.round(((oldPrice - price) / oldPrice) * 100);
    }
    return 0;
  }, [product]);

  const savings = useMemo(() => {
    const oldPrice = Number(product?.oldPrice);
    const price = Number(product?.price);
    return oldPrice > price ? oldPrice - price : 0;
  }, [product?.oldPrice, product?.price]);

  const handleAddToCart = useCallback(
    (e, redirect = false) => {
      e.preventDefault();
      e.stopPropagation();

      addToCart(product, 1, "M");
      toast.success("Added to cart 🛒");

      if (redirect) {
        navigate("/checkout", { state: { product, discount } });
      }
    },
    [addToCart, product, navigate, discount]
  );

  return (
    <article className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 will-change-transform">
      <Link to={`/product/${product?._id}`} className="block relative bg-gray-50">
        <img
          src={image}
          alt={product?.name || "Product"}
          loading="lazy"
          decoding="async"
          onError={() => setImgError(true)}
          className="w-full h-[220px] sm:h-[260px] md:h-[300px] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />

        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-pink-600 text-white text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full shadow">
            {discount}% OFF
          </span>
        )}

        <button
          onClick={(e) => handleAddToCart(e, true)}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/90 text-white px-4 py-2 text-xs sm:text-sm rounded-full opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300"
        >
          Buy Now
        </button>
      </Link>

      <div className="p-3 sm:p-4">
        <Link to={`/product/${product?._id}`}>
          <h3 className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-1 group-hover:text-pink-600 transition-colors">
            {product?.name}
          </h3>
        </Link>

        {product?.category?.name && (
          <p className="text-xs text-gray-500 mt-1 line-clamp-1">
            {product.category.name}
          </p>
        )}

        {product?.fabric && (
          <p className="text-xs text-gray-400 mt-1 line-clamp-1">
            Fabric: {product.fabric}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-2 mt-3">
          <span className="text-lg sm:text-xl font-bold text-pink-600">
            ₹{product?.price}
          </span>

          {product?.oldPrice ? (
            <span className="text-sm text-gray-400 line-through">
              ₹{product.oldPrice}
            </span>
          ) : null}

          {discount > 0 && (
            <span className="text-xs font-medium text-green-600">
              {discount}% off
            </span>
          )}
        </div>

        {savings > 0 && (
          <p className="text-xs text-green-500 mt-1">You save ₹{savings}</p>
        )}

        <button
          onClick={handleAddToCart}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-pink-600 text-white py-2.5 rounded-xl hover:bg-pink-700 active:scale-[0.98] transition-all duration-200 shadow-sm text-sm font-medium"
        >
          <FaShoppingCart />
          Add to Cart
        </button>
      </div>
    </article>
  );
});

export default ProductCard;