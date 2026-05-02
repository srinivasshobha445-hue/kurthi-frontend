import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleProduct } from "../api/product";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import RelatedProducts from "../components/RelatedProducts";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("M");

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
  const fetchProduct = async () => {
    try {
      const data = await getSingleProduct(id);

      console.log("Product 👉", data); // debug

      setProduct(data || null);
    } catch (error) {
      console.error("Product fetch error:", error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  fetchProduct();
}, [id]);

  // ✅ Loading Skeleton
  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20 text-red-500">
        Product not found
      </div>
    );
  }

  // ✅ Fallback image
  const image =
    product.image || "https://via.placeholder.com/600x700?text=No+Image";

  // ✅ Discount %
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
  const handleAddToCart = () => {
    addToCart(product, qty, size);
    toast.success("Added to cart 🛒");
  };

  // ✅ Buy Now
  const handleBuyNow = () => {
    addToCart(product, qty, size);
    navigate("/checkout");
  };

  return (
    <div className="bg-white min-h-screen px-4 md:px-10 py-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">

        {/* 🔥 LEFT - IMAGE */}
        <div>
          <div className="overflow-hidden rounded-2xl border bg-gray-50">
            <img
              src={image}
              alt={product.name}
              className="w-full h-[420px] md:h-[520px] object-cover hover:scale-105 transition duration-500"
            />
          </div>
        </div>

        {/* 🔥 RIGHT - DETAILS */}
        <div className="flex flex-col gap-4">

          {/* CATEGORY */}
          {product.category?.name && (
            <p className="text-xs uppercase tracking-wide text-pink-600 font-medium">
              {product.category.name}
            </p>
          )}

          {/* TITLE */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            {product.name}
          </h1>

          {/* FABRIC */}
          {product.fabric && (
            <p className="text-sm text-gray-500">
              Fabric: {product.fabric}
            </p>
          )}

          {/* PRICE */}
          <div className="flex items-center gap-3 flex-wrap mt-2">
            <span className="text-3xl font-bold text-pink-600">
              ₹{product.price}
            </span>

            {product.oldPrice && (
              <span className="text-gray-400 line-through text-lg">
                ₹{product.oldPrice}
              </span>
            )}

            {discount > 0 && (
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                {discount}% OFF
              </span>
            )}
          </div>

          {/* SAVINGS */}
          {savings > 0 && (
            <p className="text-green-600 text-sm font-medium">
              🎉 You save ₹{savings}
            </p>
          )}

          {/* DESCRIPTION */}
          <p className="text-gray-600 leading-relaxed mt-2">
            {product.description || "No description available"}
          </p>

          {/* SIZE */}
          <div className="mt-4">
            <p className="font-medium mb-2">Select Size</p>
            <div className="flex gap-2 flex-wrap">
              {["S", "M", "L", "XL"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-4 py-2 border rounded-full text-sm transition ${
                    size === s
                      ? "bg-pink-600 text-white border-pink-600"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY */}
          <div className="mt-3">
            <p className="font-medium mb-2">Quantity</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                className="px-3 py-1 border rounded"
              >
                -
              </button>

              <span className="font-medium">{qty}</span>

              <button
                onClick={() => setQty(qty + 1)}
                className="px-3 py-1 border rounded"
              >
                +
              </button>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col gap-3 mt-5">
            <button
              onClick={handleAddToCart}
              className="w-full bg-pink-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-pink-700 transition shadow"
            >
              <FaShoppingCart />
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="w-full border border-gray-400 py-3 rounded-xl hover:bg-gray-100 transition"
            >
              Buy Now
            </button>
          </div>

          {/* TRUST BADGES */}
          <div className="text-sm text-gray-500 mt-4 space-y-1">
            <p>✔ 100% Original Product</p>
            <p>✔ Easy Returns & Exchange</p>
            <p>✔ Cash on Delivery Available</p>
          </div>
        </div>
      </div>

      {/* 🔥 RELATED PRODUCTS */}
      <div className="max-w-7xl mx-auto mt-16">
        <RelatedProducts
  category={product.category?._id || product.category} // ✅ SAFE
  currentId={product._id}
/>
      </div>
    </div>
  );
};

export default ProductDetails;