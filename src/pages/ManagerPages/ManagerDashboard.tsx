import { useNavigate } from "react-router-dom";
import JobStats from "../../components/ManagerComponents/JobStats";
import JobTable from "../../components/ManagerComponents/JobTable";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../contexts/AuthContext";
import { useJobs } from "../../contexts/JobContext";
  
const ManagerDashboard: React.FC = () => {
  const { user } = useAuth(); // user contains manager_id
  const { jobs, deleteJob } = useJobs();
  const navigate = useNavigate();

  // Filter jobs by manager_id
  const managerJobs = jobs.filter(job => job.ManagerId === user?.UserId);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this job requirement?")) {
      try {
        await deleteJob(id);
        alert("Job deleted successfully!");
      } catch (err) {
        console.error("Failed to delete job", err);
        alert("Failed to delete job. Check console for details.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid py-4">
        {/* Header */}
        <div className="row mb-4">
          <div className="col-md-8">
            <h1 className="h3 mb-3" style={{ color: "#1e3a8a" }}>
              Manager Dashboard
            </h1>
            <p className="text-muted">
              Manage job requirements and track their approval status
            </p>
          </div>
          <div className="col-md-4 text-end">
            <button
              className="btn btn-primary"
              onClick={() => navigate("create-job")}
            >
              + Create New Job
            </button>
          </div>
        </div>

        {/* Stats */}
        <JobStats jobRequirements={managerJobs} />

        {/* Table */}
        <JobTable
          jobRequirements={managerJobs}
          onEdit={(job) => navigate(`edit-job/${job.RequirementId}`, { state: job })}
          onDelete={handleDelete}
        />
      </div>
    </>
  );
};

 export default ManagerDashboard;