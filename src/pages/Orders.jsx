import { useEffect, useState } from "react";
import { getMyOrders } from "../api/order";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getMyOrders();
        setOrders(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-center py-20">Loading orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        No orders found 😢
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen px-4 md:px-10 py-10">
      <div className="max-w-5xl mx-auto">

        <h2 className="text-2xl font-bold mb-6">My Orders</h2>

        <div className="flex flex-col gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-5 rounded-xl shadow"
            >
              {/* ORDER HEADER */}
              <div className="flex justify-between items-center border-b pb-3 mb-4">
                <div>
                  <p className="text-sm text-gray-500">
                    Order ID: {order._id}
                  </p>
                  <p className="text-sm text-gray-500">
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <span className="text-sm px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">
                    {order.status}
                  </span>
                </div>
              </div>

              {/* ITEMS */}
              <div className="flex flex-col gap-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 items-center"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />

                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Size: {item.size} | Qty: {item.qty}
                      </p>
                    </div>

                    <p className="font-semibold">
                      ₹{item.price * item.qty}
                    </p>
                  </div>
                ))}
              </div>

              {/* TOTAL */}
              <div className="border-t mt-4 pt-4 flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{order.totalAmount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;