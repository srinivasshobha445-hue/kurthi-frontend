import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useContext, useRef, useEffect } from "react";
import {
  FaShoppingCart,
  FaSearch,
  FaBars,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { getProducts } from "../api/product";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);

  const [suggestions, setSuggestions] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const navigate = useNavigate();
  const { userToken, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  const profileRef = useRef();
  const searchRef = useRef();

  /* ===============================
     CLOSE DROPDOWN OUTSIDE CLICK
  ============================== */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }

      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ===============================
     CART COUNT
  ============================== */
  const cartCount = Array.isArray(cart)
    ? cart.reduce((acc, item) => acc + item.qty, 0)
    : 0;

  /* ===============================
     DEBOUNCE SEARCH
  ============================== */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  /* ===============================
     FETCH SEARCH SUGGESTIONS
  ============================== */
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedSearch.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        setLoadingSearch(true);

        const res = await getProducts({ search: debouncedSearch });

        const data = Array.isArray(res.data) ? res.data : [];

        setSuggestions(data.slice(0, 6)); // limit suggestions
      } catch (err) {
        console.error(err);
        setSuggestions([]);
      } finally {
        setLoadingSearch(false);
      }
    };

    fetchSuggestions();
  }, [debouncedSearch]);

  /* ===============================
     HANDLE SUBMIT
  ============================== */
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const clean = search.trim();

    if (!clean) return;

    navigate(`/collection?search=${clean}`);
    setSuggestions([]);
  };

  /* ===============================
     CLEAR SEARCH
  ============================== */
  const clearSearch = () => {
    setSearch("");
    setSuggestions([]);
    navigate("/collection");
  };

  return (
    <>
      {/* NAVBAR */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 md:px-12 py-4">

          {/* LOGO */}
          <Link to="/" className="text-xl md:text-2xl font-bold text-pink-600">
            Desire<span className="text-black">7</span>
          </Link>

          {/* NAV */}
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/collection">Collection</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>

          {/* SEARCH */}
          <div className="relative hidden md:block w-64" ref={searchRef}>
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center border rounded-full px-4 py-1 focus-within:ring-2 focus-within:ring-pink-500"
            >
              <FaSearch className="text-gray-400 mr-2" />

              <input
                type="text"
                placeholder="Search kurthi..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="outline-none text-sm w-full bg-transparent"
              />

              {search && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="text-gray-400"
                >
                  ✕
                </button>
              )}
            </form>

            {/* 🔥 LIVE DROPDOWN */}
            {suggestions.length > 0 && (
              <div className="absolute w-full bg-white shadow-lg rounded-xl mt-2 z-50 max-h-80 overflow-y-auto">
                {suggestions.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => {
                      navigate(`/product/${item._id}`);
                      setSuggestions([]);
                    }}
                    className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <p className="text-sm">{item.name}</p>
                  </div>
                ))}
              </div>
            )}

            {/* LOADING */}
            {loadingSearch && (
              <div className="absolute mt-2 text-xs text-gray-400">
                Searching...
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-5">

            <button
              className="md:hidden"
              onClick={() => navigate("/collection")}
            >
              <FaSearch size={18} />
            </button>

            <Link to="/cart" className="relative">
              <FaShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              className="md:hidden"
              onClick={() => setMenuOpen(true)}
            >
              <FaBars size={20} />
            </button>

            {/* PROFILE */}
            {userToken ? (
              <div className="relative hidden md:block" ref={profileRef}>
                <FaUserCircle
                  size={26}
                  onClick={() => setProfileOpen(!profileOpen)}
                />

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-44 bg-white shadow-lg rounded-xl p-3 text-sm">
                    <Link to="/orders">📦 My Orders</Link>
                    <button onClick={logout}>🚪 Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="hidden md:block border px-4 py-1 rounded-full">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <>
          <div className="fixed top-0 left-0 w-64 h-full bg-white z-50 p-6">
            <FaTimes onClick={() => setMenuOpen(false)} />
            <NavLink to="/">Home</NavLink>
            <NavLink to="/collection">Collection</NavLink>
          </div>

          <div
            className="fixed inset-0 bg-black/30"
            onClick={() => setMenuOpen(false)}
          />
        </>
      )}
    </>
  );
};

export default Navbar;