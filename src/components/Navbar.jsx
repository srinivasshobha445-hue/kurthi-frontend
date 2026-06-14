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
import logo from "../assets/logo.png"; // change filename if your logo name is different

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const navigate = useNavigate();
  const { user, logout, loading } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  const profileRef = useRef(null);
  const searchRef = useRef(null);

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const cartCount = Array.isArray(cart)
    ? cart.reduce((acc, item) => acc + (item.qty || 0), 0)
    : 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedSearch.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        setLoadingSearch(true);
        const res = await getProducts({ search: debouncedSearch });
        const data = Array.isArray(res.data?.products)
          ? res.data.products
          : Array.isArray(res.data)
            ? res.data
            : [];
        setSuggestions(data.slice(0, 6));
      } catch (err) {
        console.error(err);
        setSuggestions([]);
      } finally {
        setLoadingSearch(false);
      }
    };

    fetchSuggestions();
  }, [debouncedSearch]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const clean = search.trim();
    if (!clean) return;

    navigate(`/collection?search=${encodeURIComponent(clean)}`);
    setSuggestions([]);
  };

  const clearSearch = () => {
    setSearch("");
    setSuggestions([]);
    navigate("/collection");
  };

  const handleLogout = async () => {
    await logout();
    setProfileOpen(false);
    setMenuOpen(false);
    navigate("/login", { replace: true });
  };

  return (
    <>
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 md:px-12 py-4">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Desire7"
              className="h-12 w-12 md:h-14 md:w-14 rounded-full object-cover border border-gray-200 shadow-sm"
            />
          </Link>

          <div className="hidden md:flex gap-8 text-sm font-medium">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/collection">Collection</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>

          <div className="relative hidden md:block w-64" ref={searchRef}>
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center border rounded-full px-4 py-1 focus-within:ring-2 focus-within:ring-pink-500"
            >
              <FaSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search kurti..."
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

            {loadingSearch && (
              <div className="absolute mt-2 text-xs text-gray-400">
                Searching...
              </div>
            )}
          </div>

          <div className="flex items-center gap-5">
            <button
              className="md:hidden"
              onClick={() => navigate("/collection")}
              aria-label="Search"
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
              aria-label="Open menu"
            >
              <FaBars size={20} />
            </button>

            {!loading && user ? (
              <div className="relative hidden md:block" ref={profileRef}>
                <FaUserCircle
                  size={26}
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="cursor-pointer"
                />
                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-44 bg-white shadow-lg rounded-xl p-3 text-sm flex flex-col gap-2">
                    <Link to="/orders">📦 My Orders</Link>
                    <button onClick={handleLogout} className="text-left">
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:block border px-4 py-1 rounded-full"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {menuOpen && (
        <>
          <div className="fixed top-0 left-0 w-72 h-full bg-white z-50 p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="flex items-center"
              >
                <img
                  src={logo}
                  alt="Desire7"
                  className="h-12 w-12 rounded-full object-cover border border-gray-200 shadow-sm"
                />
              </Link>

              <FaTimes
                onClick={() => setMenuOpen(false)}
                className="cursor-pointer text-xl"
              />
            </div>

            <div className="flex flex-col gap-4 text-base">
              <NavLink to="/" onClick={() => setMenuOpen(false)}>
                Home
              </NavLink>
              <NavLink to="/collection" onClick={() => setMenuOpen(false)}>
                Collection
              </NavLink>
              <NavLink to="/about" onClick={() => setMenuOpen(false)}>
                About
              </NavLink>
              <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
                Contact
              </NavLink>

              {user && (
                <NavLink to="/orders" onClick={() => setMenuOpen(false)}>
                  📦 My Orders
                </NavLink>
              )}

              {!loading && !user ? (
                <NavLink to="/login" onClick={() => setMenuOpen(false)}>
                  Login
                </NavLink>
              ) : (
                <button
                  onClick={handleLogout}
                  className="text-left text-red-500"
                >
                  Logout
                </button>
              )}
            </div>
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
