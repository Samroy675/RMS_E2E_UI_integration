import api from "../axiosInstance";
import type { Job } from "../../data";

// Candidate-facing job endpoints
const BASE = '/candidate/Jobs';

export const getJobs = async (): Promise<Job[]> => {
  const res = await api.get(`${BASE}`);
  return res.data;
};

// Admin endpoints (if needed) would be under /admin/Jobs
export const addJob = async (job: Partial<Job>): Promise<Job> => {
  const res = await api.post(`/admin/Jobs`, job);
  return res.data;
};

export const updateJob = async (id: number, job: Partial<Job>): Promise<Job> => {
  const res = await api.put(`/admin/Jobs/${id}`, job);
  return res.data;
};

export const deleteJob = async (id: number): Promise<void> => {
  await api.delete(`/admin/Jobs/${id}`);
};
