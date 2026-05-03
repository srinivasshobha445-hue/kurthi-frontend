import API from "./axios";

/* ===============================
   📦 GET PRODUCTS (MAIN)
================================ */
export const getProducts = async (params = {}) => {
  const res = await API.get("/products", { params });
  return res.data;
};
