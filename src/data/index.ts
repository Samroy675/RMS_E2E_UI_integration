export interface User {
    UserId: number;
    Email: string;
    Password?: string;
    FirstName?: string;
    LastName?: string;
    Phone?: string;
    Role: string;
    session_token?: string;
    last_login?: string;
    CreatedAt?: string;
    UpdatedAt?: string;
    IsActive?: boolean;
  }
  
  export interface JobRequirement {
    RequirementId: number;
    ManagerId: number;
    JobTitle: string;
    JobDescription: string;
    YearsExperience: number;
    RequiredSkills: string;
    NumberOfOpenings: number;
    NumberOfRounds: number;
    Status: 'Pending' | 'Approved' | 'Rejected';
    CreatedAt: string;
    UpdatedAt: string;
  }
  
  export interface Job {
    JobId: number;
    JobTitle: string;
    JobDescription: string;
    YearsExperience: number;
    RequiredSkills: string[]
    NumberOfOpenings: number;
    NumberOfRounds: number;
    Status: 'Active' | 'Inactive' | 'Closed' | 'Approved';
  }
  
  export interface Application {
    application_id: number;
    job_id: number;
    candidate_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    resume_path: string;
    keyword_score: number;
    status: 'Applied' | 'Interview Scheduled' | 'In Progress' | 'Rejected' | 'Selected';
    current_round: number;
    created_at: string;
    updated_at: string;
  }
  
  export interface InterviewFeedback {
    feedback_id: number;
    interview_id: number;
    interviewer_id: number;
    comments: string;
    score: number;
    result: 'Accepted' | 'Rejected' | 'Pending';
    created_at: string;
    updated_at: string;
  }

  export interface Applicant {
    id: number;
    name: string;
    email: string;
    phone: string;
    jobId: number;
    score: number;
    appliedDate: string;
    lastUpdated: string;
    currentRound: number;
    status: 'Applied' | 'Interview Scheduled' | 'In Progress' | 'Rejected';
    resumeUrl: string;
  }
  
  export interface Interview {
    id: number;
    applicantId: number;
    applicantName: string;
    date: string;
    time: string;
    duration: number;
    interviewer: string;
    round: number;
    status: 'Scheduled' | 'Completed' | 'Cancelled';
  }
  
  export interface DashboardMetrics {
    activeJobs: number;
    totalApplications: number;
    pendingReview: number;
    scheduledInterviews: number;
  }
