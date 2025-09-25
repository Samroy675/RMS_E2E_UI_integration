import { useContext } from "react";
import { Users, Clock } from "lucide-react";
import { JobContext } from "../../contexts/JobContext";

export default function Approvals() {
  const { jobs, approveJob } = useContext(JobContext);

  return (
    <div className="mt-10">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          {jobs.map((job) => (
            <div key={job.id} className="card mb-4 shadow-sm border-0">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h3 className="card-title h4 mb-0">{job.title}</h3>
                  <span
                    className={`badge fs-6 ${
                      job.status === "Approved"
                        ? "bg-success text-white"
                        : "bg-light text-primary"
                    }`}
                  >
                    {job.status}
                  </span>
                </div>

                <div className="row text-muted mb-3">
                  <div className="col-auto flex items-center gap-1">
                    <Clock size={16} />
                    {job.experience}
                  </div>
                  <div className="col-auto flex items-center gap-1">
                    <Users size={16} />
                    {job.openings} openings
                  </div>
                </div>

                <p className="card-text text-muted mb-4">{job.description}</p>

                <div className="mb-4">
                  <h6 className="text-muted mb-2">
                    <span className="text-warning">🔧</span> Required Skills
                  </h6>
                  <div className="d-flex flex-wrap gap-2">
                    {job.requiredSkills.map((skill, index) => (
                      <span
                        key={index}
                        className="badge bg-light text-dark border"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <div className="text-muted flex items-center gap-1">
                    <span className="text-danger">🎯</span>{" "}
                    {job.interviewRounds} interview rounds
                  </div>

                  <button
                    className="btn btn-dark btn-lg px-4"
                    onClick={() => approveJob(job.id)}
                    disabled={job.status === "Approved"}
                  >
                    {job.status === "Approved" ? "Approved" : "Approve →"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
