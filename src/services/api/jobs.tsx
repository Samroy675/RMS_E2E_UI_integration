import api from "../axiosInstance";
import type { Job } from "../../data";

export const getJobs = async (): Promise<Job[]> => {
  const res = await api.get("/jobs");
  return res.data;
};

export const addJob = async (job: Partial<Job>): Promise<Job> => {
  const res = await api.post("/jobs", job);
  return res.data;
};

export const updateJob = async (id: number, job: Partial<Job>): Promise<Job> => {
  const res = await api.put(`/jobs/${id}`, job);
  return res.data;
};

export const deleteJob = async (id: number): Promise<void> => {
  await api.delete(`/jobs/${id}`);
};
