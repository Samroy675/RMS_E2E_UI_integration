import api from "../axiosInstance";
import type { Application } from "../../data";

export const getApplications = async (): Promise<Application[]> => {
  const res = await api.get("/candidate/Applications");
  return res.data;
};
