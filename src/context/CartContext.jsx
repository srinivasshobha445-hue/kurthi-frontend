import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  /* ===============================
     ✅ LOAD INITIAL CART (FIXED)
     (runs BEFORE render)
  ============================== */
  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (err) {
      console.error("Cart parse error 👉", err);
      return [];
    }
  });

  /* ===============================
     ✅ SAVE TO LOCAL STORAGE
  ============================== */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /* ===============================
     ➕ ADD TO CART (SAFE)
  ============================== */
  const addToCart = (product, qty = 1, size = "M") => {
    setCart((prev) => {
      const existingItem = prev.find(
        (item) => item._id === product._id && item.size === size
      );

      if (existingItem) {
        return prev.map((item) =>
          item._id === product._id && item.size === size
            ? { ...item, qty: item.qty + qty }
            : item
        );
      }

      return [...prev, { ...product, qty, size }];
    });
  };

  /* ===============================
     ❌ REMOVE ITEM
  ============================== */
  const removeFromCart = (id, size) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item._id === id && item.size === size)
      )
    );
  };

  /* ===============================
     🔁 UPDATE QUANTITY
  ============================== */
  const updateQty = (id, size, qty) => {
    if (qty < 1) return;

    setCart((prev) =>
      prev.map((item) =>
        item._id === id && item.size === size
          ? { ...item, qty }
          : item
      )
    );
  };

  /* ===============================
     🧹 CLEAR CART
  ============================== */
  const clearCart = () => {
    setCart([]);
  };

  /* ===============================
     💰 TOTAL PRICE
  ============================== */
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};