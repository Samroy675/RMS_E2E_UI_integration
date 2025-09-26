import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { applicants } from "../../data/model";
import { JobContext } from "../../contexts/JobContext";
import { Users, Clock, Briefcase } from "lucide-react";

const Jobs: React.FC = () => {
  const { jobs } = useContext(JobContext);
  const totalApplicants = applicants.length;

  const approvedJobs = jobs.filter((job) => job.status === "Approved");

  return (
    <div className="container-fluid py-4">
      <div className="text-center mb-5">
        <h1 className="display-4 text-primary fw-bold">Active Job Listings</h1>
        <p className="lead text-muted">
          Manage job postings, review applications, and streamline your
          recruitment process
        </p>
      </div>

      <div className="row justify-content-center mb-4">
        <div className="col-auto">
          <span className="badge bg-secondary fs-6 d-flex flex-column align-items-center p-2">
            <Briefcase size={16} className="mb-1" />
            {approvedJobs.length} Active Jobs
          </span>
        </div>

        <div className="col-auto">
          <span className="badge bg-primary fs-6 d-flex flex-column align-items-center p-2">
            <Users size={16} className="mb-1" />
            {totalApplicants} Total Applicants
          </span>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-10">
          {approvedJobs.length === 0 ? (
            <div className="text-center text-muted py-5">
              <h4>No jobs available yet</h4>
              <p>Once jobs are approved, they will appear here.</p>
            </div>
          ) : (
            approvedJobs.map((job) => (
              <div key={job.requirement_id} className="card mb-4 shadow-sm border-0">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h3 className="card-title h4 mb-0">{job.job_title}</h3>
                    <span className="badge bg-light text-primary fs-6">Active</span>
                  </div>

                  <div className="row text-muted mb-3">
                    <div className="col-auto">
                      <Clock size={16} className="me-1" />
                      {job.years_experience} years
                    </div>
                    <div className="col-auto">
                      <Users size={16} className="me-1" />
                      {job.number_of_openings} openings
                    </div>
                  </div>

                  <p className="card-text text-muted mb-4">{job.job_description}</p>

                  <div className="mb-4">
                    <h6 className="text-muted mb-2">
                      <span className="text-warning">🔧</span> Required Skills
                    </h6>
                    <div className="d-flex flex-wrap gap-2">
                      {job.required_skills.split(",").map((skill, index) => (
                        <span key={index} className="badge bg-light text-dark border">
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <div className="text-muted">
                      <span className="text-danger">🎯</span> {job.number_of_rounds} interview rounds
                    </div>
                    <Link
                      to={`/hr/applicants/${job.requirement_id}`}
                      className="btn btn-dark btn-lg px-4"
                    >
                      View Applicants →
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;