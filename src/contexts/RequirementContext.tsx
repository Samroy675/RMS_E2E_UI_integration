import React, { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import type { JobRequirement } from "../data";
import { getJobRequirements, addJobRequirement, updateJobRequirement, deleteJobRequirement } from "../services/api/requirements";

interface JobContextType {
  jobs: JobRequirement[];

  approveJob: (id: number) => Promise<void>;
  addJob: (job: Partial<JobRequirement>) => Promise<JobRequirement | null>;
  updateJob: (job: JobRequirement) => Promise<JobRequirement | null>;
  deleteJob: (id: number) => Promise<void>;
}

export const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [jobs, setJobs] = useState<JobRequirement[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getJobRequirements();
        setJobs(data);
      } catch (err) {
        console.error("Failed to load job requirements", err);
      }
    })();
  }, []);

  const approveJob = async (id: number) => {
    try {
      const job = jobs.find(
        (j) => j.requirement_id === id || (j as any).job_requirement_id === id
      );
      if (!job) return;
      const updated = await updateJobRequirement(
        (job as any).id ?? (job as any).job_requirement_id,
        { ...job, status: "Active" } as any
      );
      setJobs((prev) =>
        prev.map((j) => ((j as any).id === (updated as any).id ? updated : j))
      );
    } catch (err) {
      console.error("approveJob error", err);
    }
  };

  const addJob = async (job: Partial<JobRequirement>) => {
    try {
      const created = await addJobRequirement(job);
      setJobs((prev) => [...prev, created]);
      return created;
    } catch (err) {
      console.error("addJob error", err);
      return null;
    }
  };

  const updateJob = async (job: JobRequirement) => {
    try {
      const res = await fetch(
        `http://localhost:5000/jobs/${job.requirement_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(job),
        }
      );
      if (!res.ok) throw new Error("Failed to update job");
      const updated = await res.json();

      // Update context state
      setJobs((prev) =>
        prev.map((j) =>
          j.requirement_id === updated.requirement_id ? updated : j
        )
      );
      return updated;
    } catch (err) {
      console.error(err);
    }
  };

  const deleteJob = async (id: number) => {
    try {
      await deleteJobRequirement(id);
      setJobs((prev) =>
        prev.filter(
          (j) => ((j as any).id ?? (j as any).job_requirement_id) !== id
        )
      );
    } catch (err) {
      console.error("deleteJob error", err);
    }
  };

  return (
    <JobContext.Provider
      value={{ jobs, approveJob, addJob, updateJob, deleteJob }}
    >
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
