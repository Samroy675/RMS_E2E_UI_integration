import api from "../axiosInstance";
import type { User } from "../../data";

// Signup via AuthController
export const loginUser = async (
  email: string,
  password: string
): Promise<{
  token: string;
  userId: number;
  email: string;
  role: string;
  expiresAt: string;
}> => {
  const res = await api.post("/Auth/login", { email, password });
  return res.data;
};

export const createUser = async (
  user: Partial<User>
): Promise<{
  token: string;
  userId: number;
  email: string;
  role: string;
  expiresAt: string;
}> => {
  const res = await api.post("/Auth/register", user);
  return res.data;
};
export const getUsers = async (): Promise<User[]> => {
  const res = await api.get("/admin/users");
  return res.data;
};
