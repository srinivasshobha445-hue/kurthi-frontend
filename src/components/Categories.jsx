import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../api/category";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCategories();

        console.log("Categories 👉", data);

        setCategories(data || []);
      } catch (err) {
        console.error(err);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="px-4 md:px-12 py-10">
      
      {/* TITLE */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold">
          Shop by <span className="text-pink-600">Categories</span>
        </h2>
        <div className="w-16 h-[2px] bg-pink-600 mx-auto mt-3 rounded-full"></div>
      </div>

      {/* 🔄 LOADING */}
      {loading ? (
        <div className="text-center py-10 text-gray-500">
          Loading categories...
        </div>
      ) : (
        <>
          {/* 📱 MOBILE SCROLL */}
          <div className="flex md:hidden gap-5 overflow-x-auto no-scrollbar px-2">
            {categories.length > 0 ? (
              categories.map((cat) => (
                <div
                  key={cat._id}
                  onClick={() => navigate(`/collections/${cat._id}`)}
                  className="flex flex-col items-center min-w-[80px] cursor-pointer group"
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden shadow-sm">
                    <img
                      src={
                        cat.image ||
                        "https://dummyimage.com/150x150/e5e7eb/6b7280&text=No+Image"
                      }
                      alt={cat.name}
                      onError={(e) =>
                        (e.target.src =
                          "https://dummyimage.com/150x150/e5e7eb/6b7280&text=No+Image")
                      }
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                  </div>

                  <p className="text-xs mt-2 text-gray-700 group-hover:text-pink-600">
                    {cat.name}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No categories</p>
            )}
          </div>

          {/* 💻 DESKTOP GRID */}
          <div className="hidden md:grid grid-cols-3 lg:grid-cols-6 gap-6 mt-6">
            {categories.length > 0 ? (
              categories.map((cat) => (
                <div
                  key={cat._id}
                  onClick={() => navigate(`/collections/${cat._id}`)}
                  className="flex flex-col items-center cursor-pointer group"
                >
                  <div className="w-24 h-24 rounded-full overflow-hidden shadow-md">
                    <img
                      src={
                        cat.image ||
                        "https://dummyimage.com/200x200/e5e7eb/6b7280&text=No+Image"
                      }
                      alt={cat.name}
                      onError={(e) =>
                        (e.target.src =
                          "https://dummyimage.com/200x200/e5e7eb/6b7280&text=No+Image")
                      }
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                  </div>

                  <p className="mt-3 text-sm text-gray-700 group-hover:text-pink-600">
                    {cat.name}
                  </p>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No categories found
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Categories;