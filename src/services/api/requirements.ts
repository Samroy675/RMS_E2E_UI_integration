import api from "../axiosInstance";
import type { JobRequirement } from "../../data";

const BASE = '/admin/JobRequirements';

export const getJobRequirements = async (): Promise<JobRequirement[]> => {
  const res = await api.get(`${BASE}`);
  return res.data;
};

export const getJobRequirement = async (id: number): Promise<JobRequirement> => {
  const res = await api.get(`${BASE}/${id}`);
  return res.data;
};

export const addJobRequirement = async (job: Partial<JobRequirement>): Promise<JobRequirement> => {
  const res = await api.post(`${BASE}`, job);
  return res.data;
};

export const updateJobRequirement = async (id: number, job: Partial<JobRequirement>): Promise<JobRequirement> => {
  const res = await api.put(`${BASE}/${id}`, job);
  return res.data;
};

export const deleteJobRequirement = async (id: number): Promise<void> => {
  await api.delete(`${BASE}/${id}`);
};
