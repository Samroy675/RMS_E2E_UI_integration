import React, { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";
import { jobRequirements as jobsData } from "../data/model"; 
import type { JobRequirement } from "../data"; 

interface JobContextType {
  jobs: JobRequirement[];
  approveJob: (id: number) => void;
  addJob: (job: JobRequirement) => void;
  updateJob: (job: JobRequirement) => void;
  deleteJob: (id: number) => void;
}

export const JobContext = createContext<JobContextType>({
  jobs: [],
  approveJob: () => {},
  addJob: () => {},
  updateJob: () => {},
  deleteJob: () => {},
});

export const JobProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<JobRequirement[]>(jobsData);

  const approveJob = (id: number) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.requirement_id === id ? { ...job, status: "Approved", updated_at: new Date().toISOString() } : job
      )
    );
  };

  const addJob = (job: JobRequirement) => {
    setJobs((prev) => [...prev, job]);
  };

  const updateJob = (updatedJob: JobRequirement) => {
    setJobs((prev) =>
      prev.map((job) => (job.requirement_id === updatedJob.requirement_id ? updatedJob : job))
    );
  };

  const deleteJob = (id: number) => {
    setJobs((prev) => prev.filter((job) => job.requirement_id !== id));
  };

  return (
    <JobContext.Provider value={{ jobs, approveJob, addJob, updateJob, deleteJob }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJobs must be used within a JobProvider");
  }
  return context;
};
