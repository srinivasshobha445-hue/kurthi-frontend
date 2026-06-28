import { useEffect, useState, useContext, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleProduct } from "../api/product";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import RelatedProducts from "../components/RelatedProducts";

const FALLBACK_IMAGE = "https://via.placeholder.com/800x1000?text=No+Image";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
  if (product?.sizes?.length > 0) {
    setSize(product.sizes[0]);
  }
}, [product]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getSingleProduct(id);
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


  const productImages = useMemo(() => {
    if (!product) return [];
    const imgs = Array.isArray(product.images) ? product.images : [];
    return imgs.length > 0 ? imgs.slice(0, 4) : [FALLBACK_IMAGE];
  }, [product]);

  useEffect(() => {
    if (productImages.length > 0) {
      setSelectedImage(productImages[0]);
    } else {
      setSelectedImage(FALLBACK_IMAGE);
    }
  }, [productImages]);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">Loading product...</div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20 text-red-500">Product not found</div>
    );
  }

  const discount =
    product.discount > 0
      ? product.discount
      : product.oldPrice && product.price
        ? Math.round(
            ((product.oldPrice - product.price) / product.oldPrice) * 100,
          )
        : 0;

  const savings =
    product.oldPrice && product.price ? product.oldPrice - product.price : 0;

  const handleAddToCart = () => {
    addToCart(product, qty, size);
    toast.success("Added to cart 🛒");
  };

  const handleBuyNow = () => {
    addToCart(product, qty, size);
    navigate("/checkout");
  };

  return (
    <div className="bg-white min-h-screen px-4 md:px-10 py-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
        {/* LEFT SIDE - IMAGES */}
        <div className="flex flex-col gap-4">
          <div className="overflow-hidden rounded-2xl border bg-gray-50">
            <img
              src={selectedImage || FALLBACK_IMAGE}
              alt={product.name}
              className="w-full h-[420px] md:h-[520px] object-cover transition duration-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {productImages.slice(1, 4).map((img, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedImage(img)}
                className={`rounded-xl overflow-hidden border-2 transition ${
                  selectedImage === img
                    ? "border-pink-600"
                    : "border-transparent"
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} ${index + 2}`}
                  className="w-full h-28 object-cover"
                />
              </button>
            ))}

            {productImages.length < 4 &&
              Array.from({ length: 4 - productImages.length }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="h-28 rounded-xl border border-dashed border-gray-200 bg-gray-50"
                />
              ))}
          </div>
        </div>

        {/* RIGHT SIDE - DETAILS */}
        <div className="flex flex-col gap-4">
          {product.category?.name && (
            <p className="text-xs uppercase tracking-wide text-pink-600 font-medium">
              {product.category.name}
            </p>
          )}

          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            {product.name}
          </h1>

          {product.fabric && (
            <p className="text-sm text-gray-500">Fabric: {product.fabric}</p>
          )}

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

          {savings > 0 && (
            <p className="text-green-600 text-sm font-medium">
              🎉 You save ₹{savings}
            </p>
          )}

          <p className="text-gray-600 leading-relaxed mt-2">
            {product.description || "No description available"}
          </p>

          {/* SIZE */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-5">
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-gray-800">Select Size</p>

                {size && (
                  <span className="text-sm text-gray-500">
                    Selected: <span className="font-semibold">{size}</span>
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`min-w-[55px] h-12 rounded-lg border text-sm font-semibold transition-all duration-200 ${
                      size === s
                        ? "bg-black text-white border-black shadow"
                        : "bg-white text-gray-800 border-gray-300 hover:border-black hover:shadow"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

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

          <div className="text-sm text-gray-500 mt-4 space-y-1">
            <p>✔ 100% Original Product</p>
            <p>✔ Easy Returns & Exchange</p>
            <p>✔ Cash on Delivery Available</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16">
        <RelatedProducts
          category={product.category?._id || product.category}
          currentId={product._id}
        />
      </div>
    </div>
  );
};

export default ProductDetails;
