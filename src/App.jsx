import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import CollectionPage from "./pages/CollectionPage";
import About from "./pages/About"
import Contact from "./pages/Contact"
import VerifyOtp from "./pages/VerifyOtp"; // adjust path

// ✅ IMPORT
import ProtectedRoute from "./components/ProtectedRoute";


const App = () => {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />
         <Route path="/product/:id" element={<ProductDetails />} />
         <Route path="/checkout" element={<Checkout />} />
         <Route path="/about" element={<About />} />
         <Route path="/contact" element={<Contact/>} />
         <Route path="/collections/:categoryId" element={<CollectionPage />} />
         <Route path="/verify-otp" element={<VerifyOtp />} />

        {/* 🔒 PROTECTED ROUTE */}
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
};

export default App; 