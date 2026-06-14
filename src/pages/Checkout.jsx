import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import { placeOrder } from "../api/order";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useContext(CartContext);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [placingOrder, setPlacingOrder] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.name || !form.phone || !form.address) {
      toast.error("Please fill all required fields");
      return false;
    }

    if (form.phone.length !== 10) {
      toast.error("Invalid phone number");
      return false;
    }

    if (form.pincode.length !== 6) {
      toast.error("Invalid pincode");
      return false;
    }

    if (!cart || cart.length === 0) {
      toast.error("Your cart is empty");
      return false;
    }

    return true;
  };

  const handleOrder = async () => {
    if (!validate()) return;

    try {
      setPlacingOrder(true);

      const orderData = {
        items: cart.map((item) => ({
          productId: item._id,
          name: item.name,
          image: item.image,
          price: item.price,
          qty: item.qty,
          size: item.size,
        })),
        totalAmount: totalPrice,
        address: form,
      };

      const res = await placeOrder(orderData);

      toast.success("Order placed successfully 🎉");

      clearCart();

      navigate("/orders", {
        state: {
          success: true,
          orderId: res.data?.order?._id,
        },
      });
    } catch (error) {
      console.error("ORDER ERROR:", error);
      toast.error(error.response?.data?.message || "Order failed ❌");
    } finally {
      setPlacingOrder(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        Your cart is empty 😢
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* LEFT: ADDRESS FORM */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            Delivery Address
          </h2>

          <div className="grid gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name *"
              value={form.name}
              onChange={handleChange}
              className="border p-3 rounded"
            />

            <input
              type="number"
              name="phone"
              placeholder="Phone Number *"
              value={form.phone}
              onChange={handleChange}
              className="border p-3 rounded"
            />

            <textarea
              name="address"
              placeholder="Street Address *"
              value={form.address}
              onChange={handleChange}
              className="border p-3 rounded"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                className="border p-3 rounded"
              />

              <input
                type="text"
                name="state"
                placeholder="State"
                value={form.state}
                onChange={handleChange}
                className="border p-3 rounded"
              />
            </div>

            <input
              type="number"
              name="pincode"
              placeholder="Pincode *"
              value={form.pincode}
              onChange={handleChange}
              className="border p-3 rounded"
            />
          </div>
        </div>

        {/* RIGHT: ORDER SUMMARY */}
        <div className="bg-white p-6 rounded-xl shadow h-fit">
          <h2 className="text-xl font-semibold mb-4">
            Order Summary
          </h2>

          <div className="flex flex-col gap-4 max-h-64 overflow-y-auto">
            {cart.map((item) => (
              <div
                key={item._id + item.size}
                className="flex justify-between text-sm"
              >
                <div>
                  <p>{item.name}</p>
                  <p className="text-gray-500">
                    {item.qty} x ₹{item.price}
                  </p>
                </div>
                <p>₹{item.qty * item.price}</p>
              </div>
            ))}
          </div>

          <div className="border-t mt-4 pt-4 flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>

          <button
            onClick={handleOrder}
            disabled={placingOrder}
            className={`w-full mt-6 text-white py-3 rounded-xl transition ${
              placingOrder
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {placingOrder ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;