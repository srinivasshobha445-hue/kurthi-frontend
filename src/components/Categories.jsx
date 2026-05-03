import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../api/category";

const Categories = ({ limit = 7 }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        const list = Array.isArray(data) ? data.slice(0, limit) : [];

        if (isMounted) {
          setCategories(list);
        }
      } catch (error) {
        console.error("Category fetch error:", error);
        if (isMounted) {
          setCategories([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, [limit]);

  const fallbackImage =
    "https://dummyimage.com/200x200/e5e7eb/6b7280&text=No+Image";

  return (
    <section className="px-4 sm:px-6 md:px-12 py-10">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold">
          Shop by <span className="text-pink-600">Categories</span>
        </h2>
        <div className="w-16 h-[2px] bg-pink-600 mx-auto mt-3 rounded-full" />
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 md:gap-6">
          {Array.from({ length: limit }).map((_, index) => (
            <div key={index} className="flex flex-col items-center animate-pulse">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-200" />
              <div className="mt-3 h-3 w-16 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      ) : categories.length > 0 ? (
        <>
          <div className="flex md:hidden gap-4 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat._id}
                type="button"
                onClick={() => navigate(`/collections/${cat._id}`)}
                className="flex flex-col items-center min-w-[84px] shrink-0 group"
              >
                <div className="w-16 h-16 rounded-full overflow-hidden shadow-sm border bg-white">
                  <img
                    src={cat.image || fallbackImage}
                    alt={cat.name}
                    onError={(e) => {
                      e.currentTarget.src = fallbackImage;
                    }}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <p className="text-xs mt-2 text-center text-gray-700 group-hover:text-pink-600 line-clamp-2">
                  {cat.name}
                </p>
              </button>
            ))}
          </div>

          <div className="hidden md:grid grid-cols-4 lg:grid-cols-7 gap-6 mt-6">
            {categories.map((cat) => (
              <button
                key={cat._id}
                type="button"
                onClick={() => navigate(`/collections/${cat._id}`)}
                className="flex flex-col items-center cursor-pointer group"
              >
                <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden shadow-md border bg-white">
                  <img
                    src={cat.image || fallbackImage}
                    alt={cat.name}
                    onError={(e) => {
                      e.currentTarget.src = fallbackImage;
                    }}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <p className="mt-3 text-sm lg:text-base text-center text-gray-700 group-hover:text-pink-600 line-clamp-2">
                  {cat.name}
                </p>
              </button>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500 py-10">No categories found</p>
      )}
    </section>
  );
};

export default Categories;