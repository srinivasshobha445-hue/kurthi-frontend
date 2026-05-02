import { useEffect, useState } from "react";
import { getProducts } from "../api/product";
import ProductCard from "./ProductCard";

const RelatedProducts = ({ category, currentId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ SAFE CATEGORY ID
  const categoryId =
    typeof category === "object" ? category._id : category;

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        if (!categoryId) return;

        const data = await getProducts({ category: categoryId });

        console.log("Related 👉", data);

        // ✅ REMOVE CURRENT PRODUCT
        const filtered = data.filter(
          (item) => item._id !== currentId
        );

        // ✅ LIMIT ITEMS
        setProducts(filtered.slice(0, 6));

      } catch (error) {
        console.error("Related error 👉", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRelated();
  }, [categoryId, currentId]);

  if (loading) return null;

  if (products.length === 0) return null;

  return (
    <div className="mt-16">

      {/* TITLE */}
      <h2 className="text-2xl font-semibold mb-6">
        Related Products
      </h2>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map((item) => (
          <ProductCard key={item._id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;