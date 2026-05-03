import { useEffect, useState } from "react";
import { getProducts } from "../api/product";
import ProductCard from "./ProductCard";

const RelatedProducts = ({ category, currentId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryId =
    typeof category === "object" ? category?._id : category;

  useEffect(() => {
    let alive = true;

    const fetchRelated = async () => {
      try {
        setLoading(true);

        if (!categoryId) {
          if (alive) setProducts([]);
          return;
        }

        const data = await getProducts({ category: categoryId });

        console.log("Related 👉", data);

        const productList = Array.isArray(data?.products) ? data.products : [];

        const filtered = productList.filter(
          (item) => item._id !== currentId
        );

        if (alive) {
          setProducts(filtered.slice(0, 6));
        }
      } catch (error) {
        console.error("Related error 👉", error);
        if (alive) setProducts([]);
      } finally {
        if (alive) setLoading(false);
      }
    };

    fetchRelated();

    return () => {
      alive = false;
    };
  }, [categoryId, currentId]);

  if (loading || products.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-semibold mb-6">Related Products</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map((item) => (
          <ProductCard key={item._id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;