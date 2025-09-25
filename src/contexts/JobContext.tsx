import { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import { jobs as jobsData } from '../data/model';
import type { Job } from '../data';

interface JobContextType {
  jobs: Job[];
  approveJob: (id: number) => void;
}
export const JobContext = createContext<JobContextType>({
  jobs: [],
  approveJob: () => {},
});

export const JobProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>(jobsData);

  const approveJob = (id: number) => {
    setJobs(prev =>
      prev.map(job => (job.id === id ? { ...job, status: 'Approved' } : job))
    );
  };

  return (
    <JobContext.Provider value={{ jobs, approveJob }}>
      {children}
    </JobContext.Provider>
  );
};