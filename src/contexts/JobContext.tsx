import React, { createContext, useContext, useState, useEffect } from "react";
import type { JobRequirement } from "../data";
import * as reqApi from "../services/api/requirements";
import api from "../services/axiosInstance";
import axios from "axios";

interface JobContextType {
  jobs: JobRequirement[];
  fetchJobs: () => Promise<void>;
  addJob: (job: Partial<JobRequirement>) => Promise<JobRequirement | null>;
  updateJob: (job: JobRequirement) => Promise<JobRequirement | null>;
  deleteJob: (id: number) => Promise<void>;
  approveJob: (id: number) => Promise<void>;
}

export const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<JobRequirement[]>([]);


const fetchJobs = async () => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.get('/admin/JobRequirements', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
   
    const jobs = response.data;
    console.log('Fetched jobs:', jobs);
  } catch (error) {
    console.error('Failed to fetch jobs', error);
  }
};

  const addJob = async (job: Partial<JobRequirement>) => {
    try {
      const newJob = await reqApi.addJobRequirement(job);
      setJobs(prev => [...prev, newJob]);
      return newJob;
    } catch (err) {
      console.error("Failed to add job", err);
      return null;
    }
  };

  const updateJob = async (job: JobRequirement) => {
    try {
      const updated = await reqApi.updateJobRequirement(job.RequirementId, job);
      setJobs(prev => prev.map(j => (j.RequirementId === job.RequirementId ? updated : j)));
      return updated;
    } catch (err) {
      console.error("Failed to update job", err);
      return null;
    }
  };

  const deleteJob = async (id: number) => {
    try {
      await reqApi.deleteJobRequirement(id);
      setJobs(prev => prev.filter(j => j.RequirementId !== id));
    } catch (err) {
      console.error("Failed to delete job", err);
      throw err;
    }
  };

  const approveJob = async (id: number) => {
    try {
      // backend expects: PUT api/admin/JobRequirements/{id}/status?status=Approved
      await api.put(`/admin/JobRequirements/${id}/status`, null, { params: { status: "Approved" } });
      // refresh list
      await fetchJobs();
    } catch (err) {
      console.error("Failed to approve job", err);
      throw err;
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <JobContext.Provider value={{ jobs, fetchJobs, addJob, updateJob, deleteJob, approveJob }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) throw new Error("useJobs must be used within a JobProvider");
  return context;
};
