import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../api/product";
import ProductCard from "../components/ProductCard";

const CollectionPage = () => {
  const { categoryId } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const pageTitle = useMemo(
    () => (categoryId ? "Category Products" : "All Products"),
    [categoryId]
  );

  useEffect(() => {
    let active = true;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts(
          categoryId ? { category: categoryId } : {}
        );

        if (active) {
          setProducts(
  Array.isArray(data?.products)
    ? data.products
    : []
);
        }
      } catch (err) {
        console.error("Product fetch error 👉", err);
        if (active) {
          setProducts([]);
          setError("Failed to load products");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      active = false;
    };
  }, [categoryId]);

  return (
    <section className="px-4 md:px-10 py-10 min-h-screen bg-gray-50">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          {pageTitle}
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          {categoryId
            ? "Explore products in this category"
            : "Browse all available products"}
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm p-3 animate-pulse">
              <div className="w-full h-56 bg-gray-200 rounded-lg" />
              <div className="mt-3 h-4 w-3/4 bg-gray-200 rounded" />
              <div className="mt-2 h-4 w-1/2 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-20 text-red-500">{error}</div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No products found 😢
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default CollectionPage;