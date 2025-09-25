import { users, jobRequirements, jobs, applications, interviews, } from '../data/model';
import type { User, JobRequirement, Job, Application, Interview, } from '../data/index';  
// ---------------- CRUD-like mock services ----------------
export const getUsers = async (): Promise<User[]> => users;
export const getJobRequirements = async (): Promise<JobRequirement[]> => jobRequirements;
export const getJobs = async (): Promise<Job[]> => jobs;
export const getApplications = async (): Promise<Application[]> => applications;
export const getInterviews = async (): Promise<Interview[]> => interviews;
    
// ---------------- Helper functions ----------------  
  export const getJobRequirementsByManager = async (managerId: number): Promise<JobRequirement[]> => {
    return jobRequirements.filter(req => req.manager_id === managerId);
  };
  
export const getInterviewsByInterviewer = async (interviewerId: number): Promise<Interview[]> => {
    return interviews.filter(interview => interview.id === interviewerId);
  };
  
export const getApplicationsByIds = async (applicationIds: number[]): Promise<Application[]> => {
    return applications.filter(app => applicationIds.includes(app.application_id));
  };
  
// export const getFeedbackByInterviewer = async (interviewerId: number): Promise<InterviewFeedback[]> => {
//     return interviewFeedback.filter(fb => fb.interviewer_id === interviewerId);
//   };
  