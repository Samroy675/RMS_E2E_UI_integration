import api from "../axiosInstance";
import type { User } from "../../data";

// Signup via AuthController
export const createUser = async (user: Partial<User>): Promise<any> => {
  const res = await api.post("/auth/register", user);
  return res.data;
};

export const loginUser = async (email: string, password: string): Promise<{ token?: string; user?: User }> => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

export const getUsers = async (): Promise<User[]> => {
  const res = await api.get("/admin/users");
  return res.data;
};
