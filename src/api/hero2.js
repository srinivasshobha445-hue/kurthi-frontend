import API from "../api/axios";

export const getHero2 = async () => {
  const res = await API.get("/hero2");
  return res.data;
};

export const updateHero2 = async (data) => {
  const res = await API.post("/hero2", data);
  return res.data;
};