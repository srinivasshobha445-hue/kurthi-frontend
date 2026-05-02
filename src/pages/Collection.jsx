import { useEffect, useState, useMemo } from "react";
import { getProducts } from "../api/product";
import ProductCard from "../components/ProductCard";
import { useLocation } from "react-router-dom";

const Collection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const location = useLocation();

  /* ===============================
     ✅ READ SEARCH FROM URL
  ============================== */
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search") || "";
    setSearch(searchQuery);
  }, [location.search]);

  /* ===============================
     ✅ SAFE CATEGORY NAME
  ============================== */
  const getCategoryName = (cat) => {
    if (!cat) return "";
    if (typeof cat === "string") return cat;
    if (typeof cat === "object") return cat.name || "";
    return "";
  };

  /* ===============================
     🔥 FETCH PRODUCTS (FIXED)
  ============================== */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // ✅ FIX: NO res.data
        const data = await getProducts();

        console.log("Products 👉", data);

        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* ===============================
     🔥 UNIQUE CATEGORIES
  ============================== */
  const categories = useMemo(() => {
    const unique = new Set(
      products.map((p) => getCategoryName(p.category))
    );
    return ["All", ...unique];
  }, [products]);

  /* ===============================
     🔥 FILTER PRODUCTS
  ============================== */
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const catName = getCategoryName(p.category);

      return (
        (category === "All" || catName === category) &&
        p.name?.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [products, category, search]);

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-bold">All Collections</h2>

        <input
          type="text"
          placeholder="Search products..."
          className="border px-4 py-2 rounded-lg w-full md:w-72 focus:ring-2 focus:ring-pink-500 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* FILTERS */}
      <div className="px-6 mb-6 flex gap-3 flex-wrap">
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => setCategory(cat)}
            className={`px-4 py-1 rounded-full border text-sm transition ${
              category === cat
                ? "bg-pink-600 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="text-center py-20 text-gray-500">
          Loading products...
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No products found 😢
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-6 pb-10">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Collection;