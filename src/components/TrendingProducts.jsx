import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { getProducts } from "../api/product";

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts({ limit: 8 });

        if (!alive) return;
        setProducts(
  Array.isArray(data?.products)
    ? data.products
    : []
);
      } catch (error) {
        console.error("Trending products error:", error);
        if (alive) setProducts([]);
      } finally {
        if (alive) setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      alive = false;
    };
  }, []);

  return (
    <section className="px-4 sm:px-6 lg:px-12 py-12 lg:py-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">
          <span className="text-gray-900">Trending</span>{" "}
          <span className="text-pink-600">Kurthis</span>
        </h2>
        <div className="w-20 h-1 bg-pink-600 mx-auto rounded-full mt-4" />
      </div>

      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden border bg-white animate-pulse">
              <div className="bg-gray-200 h-[220px] sm:h-[260px] md:h-[300px]" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-10 bg-gray-200 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && products.length === 0 && (
        <p className="text-center text-gray-400">No products found</p>
      )}

      {!loading && products.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {products.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>
      )}

      <div className="flex justify-center mt-10">
        <Link to="/collection">
          <button className="px-6 py-3 border border-pink-600 text-pink-600 rounded-full hover:bg-pink-600 hover:text-white transition-all duration-300 font-medium">
            View All Products
          </button>
        </Link>
      </div>
    </section>
  );
};

export default TrendingProducts;