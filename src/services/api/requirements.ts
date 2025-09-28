import api from "../axiosInstance";
import type { JobRequirement } from "../../data";

const BASE = "/admin/JobRequirements";

const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export const getJobRequirements = async (): Promise<JobRequirement[]> => {
  const res = await api.get(`${BASE}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

export const getJobRequirement = async (id: number): Promise<JobRequirement> => {
  const res = await api.get(`${BASE}/${id}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

export const addJobRequirement = async (
  job: Partial<JobRequirement>
): Promise<JobRequirement> => {
  const res = await api.post(`${BASE}`, job, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

export const updateJobRequirement = async (
  id: number,
  job: Partial<JobRequirement>
): Promise<JobRequirement> => {
  const res = await api.put(`${BASE}/${id}`, job, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

export const deleteJobRequirement = async (id: number): Promise<void> => {
  await api.delete(`${BASE}/${id}`, {
    headers: getAuthHeaders(),
  });
};