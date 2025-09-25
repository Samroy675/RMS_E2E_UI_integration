export interface User {
    user_id: number;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone: string;
    role: 'Manager' | 'HR' | 'Interviewer' | 'Candidate';
    session_token: string;
    last_login: string;
    created_at: string;
    updated_at: string;
    is_active: boolean;
  }
  
  export interface JobRequirement {
    requirement_id: number;
    manager_id: number;
    job_title: string;
    job_description: string;
    years_experience: number;
    required_skills: string;
    number_of_openings: number;
    number_of_rounds: number;
    status: 'Pending' | 'Approved' | 'Rejected';
    created_at: string;
    updated_at: string;
  }
  
  export interface Job {
    id: number;
    title: string;
    description: string;
    experience: number;
    requiredSkills: string[]
    openings: number;
    interviewRounds: number;
    status: 'Active' | 'Inactive' | 'Closed' | 'Approved';
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