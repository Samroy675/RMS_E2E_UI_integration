import api from "../axiosInstance";
import type { User } from "../../data";

export const getUsers = async (): Promise<User[]> => {
  const res = await api.get("/users");
  return res.data;
};

export const createUser = async (user: Partial<User>): Promise<User> => {
  const res = await api.post("/users", user);
  return res.data;
};

export const loginUser = async (email: string, password: string): Promise<{ token?: string; user?: User }> => {
  const res = await api.post("/users/login", { email, password });
  return res.data;
};
