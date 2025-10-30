import api from "./config";

export const loginUser = async (username, password) => {
  const res = await api.post("/api/login", { username, password });
  return res.data;
};

export const registerUser = async (username, password, nickname) => {
  const res = await api.post("/api/register", { username, password, nickname });
  return res.data;
};
