import React, { useContext } from 'react';
import { applicants, interviews } from '../../data/model';
import { JobContext } from '../../contexts/JobContext';
import { Briefcase, Users, Clock, Calendar } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { jobs } = useContext(JobContext);
  const activeJobs = jobs.filter(job => job.status === "Approved").length;
  const totalApplications = applicants.length;
  const pendingReview = applicants.filter(a => a.status === "Applied" || a.status === "In Progress").length;
  const scheduledInterviews = interviews.filter(i => i.status === "Scheduled").length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Applied':
        return <span className="badge bg-primary">Applied</span>;
      case 'Interview Scheduled':
        return <span className="badge bg-success">Interview Scheduled</span>;
      case 'In Progress':
        return <span className="badge bg-warning text-dark">In Progress</span>;
      default:
        return <span className="badge bg-secondary">{status}</span>;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-success';
    if (score >= 6) return 'text-warning';
    return 'text-danger';
  };

  return (
    <div className="container-fluid py-4">
      <div className="mb-4">
        <h1 className="h2 fw-bold">HR Dashboard</h1>
        <p className="text-muted">Overview of recruitment activities and metrics</p>
      </div>

      {/* Metrics Cards */}
      <div className="row mb-5">
        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="card-title text-muted mb-0">Active Jobs</h6>
                <Briefcase className="text-primary" size={24} />
              </div>
              <h2 className="display-4 fw-bold text-primary mb-0">
                {activeJobs}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="card-title text-muted mb-0">Total Applications</h6>
                <Users className="text-success" size={24} />
              </div>
              <h2 className="display-4 fw-bold text-success mb-0">
                {totalApplications}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="card-title text-muted mb-0">Pending Review</h6>
                <Clock className="text-warning" size={24} />
              </div>
              <h2 className="display-4 fw-bold text-warning mb-0">
                {pendingReview}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="card-title text-muted mb-0">Scheduled Interviews</h6>
                <Calendar className="text-info" size={24} />
              </div>
              <h2 className="display-4 fw-bold text-info mb-0">
                {scheduledInterviews}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Applications & Interviews */}
      <div className="row">
        {/* Recent Applications */}
        <div className="col-lg-6 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white border-0">
              <h5 className="card-title fw-bold mb-0">Recent Applications</h5>
            </div>
            <div className="card-body">
              {applicants.map((applicant) => (
                <div key={applicant.id} className="d-flex justify-content-between align-items-center py-3 border-bottom">
                  <div>
                    <h6 className="mb-1 fw-bold">{applicant.name}</h6>
                    <small className="text-muted">Applied {applicant.appliedDate}</small>
                  </div>
                  <div className="text-end">
                    {getStatusBadge(applicant.status)}
                    <div className="mt-1">
                      <small className={`fw-bold ${getScoreColor(applicant.score)}`}>
                        Score: {applicant.score}/10
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Interviews */}
        <div className="col-lg-6 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white border-0">
              <h5 className="card-title fw-bold mb-0">Upcoming Interviews</h5>
            </div>
            <div className="card-body">
              {interviews.map((interview) => (
                <div key={interview.id} className="d-flex justify-content-between align-items-center py-3 border-bottom">
                  <div>
                    <h6 className="mb-1 fw-bold">{interview.applicantName}</h6>
                    <small className="text-muted">{interview.date}, {interview.time}</small>
                  </div>
                  <div className="text-end">
                    <span className="badge bg-success">Round {interview.round}</span>
                    <div className="mt-1">
                      <small className="text-primary fw-bold">Scheduled</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
