import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import CollectionPage from "./pages/CollectionPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import VerifyOtp from "./pages/VerifyOtp";
import ReturnPolicy from "./pages/ReturnPolicy";
import TermsConditions from "./pages/TermsConditions";

const App = () => {
  const location = useLocation();

  const authPages = ["/login", "/register", "/verify-otp"];
  const hideLayout = authPages.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      {!hideLayout && <Navbar />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/collections/:categoryId" element={<CollectionPage />} />
          <Route path="/product" element={<Product />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/return-policy" element={<ReturnPolicy />} />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route path="/terms" element={<TermsConditions />} />
        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
};

export default App;
