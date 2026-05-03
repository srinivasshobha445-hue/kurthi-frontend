import API from "./axios";

/* ===============================
   📦 CREATE PRODUCT
================================ */
export const addProduct = async (data) => {
  const res = await API.post("/products", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

/* ===============================
   📦 GET PRODUCTS (MAIN)
================================ */
export const getProducts = async (params = {}) => {
  const res = await API.get("/products", { params });
  return res.data;
};

/* ===============================
   📦 GET SINGLE PRODUCT
================================ */
export const getSingleProduct = async (id) => {
  const res = await API.get(`/products/${id}`);
  return res.data;
};

/* ===============================
   🗑 DELETE PRODUCT
================================ */
export const deleteProduct = async (id) => {
  const res = await API.delete(`/products/${id}`);
  return res.data;
};

/* ===============================
   ✏️ UPDATE PRODUCT
================================ */
export const updateProduct = async (id, data) => {
  const res = await API.put(`/products/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};