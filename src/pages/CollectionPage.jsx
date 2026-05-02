import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../api/product";
import ProductCard from "../components/ProductCard";

const CollectionPage = () => {
  const { categoryId } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // ✅ CALL API
        const res = await getProducts(
          categoryId ? { category: categoryId } : {}
        );

        console.log("Products 👉", res.data);

        // ✅ SAFE ARRAY SET
        setProducts(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Product fetch error 👉", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return (
    <div className="px-4 md:px-10 py-10 min-h-screen bg-gray-50">

      {/* 🔥 HEADER */}
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          {categoryId ? "Category Products" : "All Products"}
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          {categoryId
            ? "Explore products in this category"
            : "Browse all available products"}
        </p>
      </div>

      {/* 🔥 LOADING */}
      {loading ? (
        <div className="text-center py-20 text-gray-500">
          Loading products...
        </div>
      ) : products.length === 0 ? (
        /* 🔥 EMPTY STATE */
        <div className="text-center py-20 text-gray-500">
          No products found 😢
        </div>
      ) : (
        /* 🔥 PRODUCT GRID */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CollectionPage;