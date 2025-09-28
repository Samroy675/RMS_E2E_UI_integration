import api from "../axiosInstance";

export const loginUser = async (email: string, password: string) => {
  const res = await api.post('/Auth/login', { email, password });
  return res.data;
};
