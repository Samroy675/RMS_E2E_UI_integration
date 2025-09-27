import axios from "../axiosInstance";
import type { JobRequirement } from "../../data";

export const getJobRequirements = async (): Promise<JobRequirement[]> => {
  const res = await axios.get("/jobRequirements");
  return res.data;
};

export const addJobRequirement = async (job: Partial<JobRequirement>): Promise<JobRequirement> => {
  const res = await axios.post("/jobRequirements", job);
  return res.data;
};

export const updateJobRequirement = async (id: number, job: Partial<JobRequirement>): Promise<JobRequirement> => {
  const res = await axios.put(`/jobRequirements/${id}`, job);
  return res.data;
};

export const deleteJobRequirement = async (id: number): Promise<void> => {
  await axios.delete(`/jobRequirements/${id}`);
};
