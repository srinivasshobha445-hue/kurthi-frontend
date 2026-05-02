import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "../api/product";
import { Link } from "react-router-dom";

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(); // ✅ now direct data

        console.log("Trending 👉", data);

        // ✅ SAFETY CHECK
        if (Array.isArray(data)) {
          setProducts(data.slice(0, 8));
        } else {
          setProducts([]);
        }

      } catch (err) {
        console.error("Trending error 👉", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="px-6 md:px-12 py-16">

      {/* TITLE */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-wide">
          <span className="text-gray-900">Trending</span>{" "}
          <span className="text-pink-600">Kurthis</span>
        </h2>

        <div className="w-20 h-[2px] bg-gradient-to-r from-pink-600 to-gray-300 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-center text-gray-400">Loading products...</p>
      )}

      {/* EMPTY */}
      {!loading && products.length === 0 && (
        <p className="text-center text-gray-400">No products found</p>
      )}

      {/* GRID */}
      {!loading && products.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>
      )}

      {/* VIEW ALL */}
      <div className="flex justify-center mt-10">
        <Link to="/collection">
          <button className="px-6 py-2 border border-pink-600 text-pink-600 rounded-full hover:bg-pink-600 hover:text-white transition">
            View All Products
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TrendingProducts;