import API from "../api/axios";

// ✅ PUBLIC (for website)
export const getActiveHero = () => API.get("/hero");

// ✅ ADMIN
export const getAllHero = () => API.get("/hero/all");

export const uploadHero = (data) =>
  API.post("/hero", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const toggleHero = (id) =>
  API.put(`/hero/${id}`);

export const deleteHero = (id) =>
  API.delete(`/hero/${id}`);