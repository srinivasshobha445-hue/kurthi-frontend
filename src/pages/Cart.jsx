import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, updateQty, totalPrice } =
    useContext(CartContext);

  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        Cart is empty 😢
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-8">

      {/* 🛒 LEFT: CART ITEMS */}
      <div className="md:col-span-2">
        <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

        {cart.map((item) => (
          <div
            key={item._id + item.size}
            className="flex gap-4 border-b py-4"
          >
            <img
              src={item.image}
              className="w-20 h-20 object-cover rounded"
            />

            <div className="flex-1">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-gray-500">
                Size: {item.size}
              </p>

              {/* QTY */}
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() =>
                    updateQty(
                      item._id,
                      item.size,
                      Math.max(1, item.qty - 1)
                    )
                  }
                  className="px-2 border rounded"
                >
                  -
                </button>

                <span>{item.qty}</span>

                <button
                  onClick={() =>
                    updateQty(item._id, item.size, item.qty + 1)
                  }
                  className="px-2 border rounded"
                >
                  +
                </button>
              </div>
            </div>

            <div className="text-right">
              <p className="font-semibold text-pink-600">
                ₹{item.price * item.qty}
              </p>

              <button
                onClick={() =>
                  removeFromCart(item._id, item.size)
                }
                className="text-red-500 text-sm mt-2"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 💰 RIGHT: SUMMARY BOX */}
      <div className="border rounded-xl p-5 shadow-md h-fit">

        <h3 className="text-lg font-semibold mb-4">
          Order Summary
        </h3>

        <div className="flex justify-between mb-2">
          <span>Items</span>
          <span>{cart.length}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span>Total</span>
          <span className="font-bold text-pink-600">
            ₹{totalPrice}
          </span>
        </div>

        <button
          onClick={() => navigate("/checkout")}
          className="mt-5 w-full bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600 transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;