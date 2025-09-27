import api from "../axiosInstance";
import type { Interview } from "../../data";

export const getInterviews = async (): Promise<Interview[]> => {
  const res = await api.get("/interviews");
  return res.data;
};
