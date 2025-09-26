import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { JobRequirement } from "../../data";
import Navbar from "../../components/Navbar";
import JobForm from "../../components/ManagerComponents/JobForm";
import { useNavigate } from "react-router-dom";
import { useJobs } from "../../contexts/JobContext";

const CreateJob: React.FC = () => {
  const { user } = useAuth();
  const { addJob, jobs } = useJobs();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    job_title: "",
    job_description: "",
    years_experience: "",
    required_skills: "",
    number_of_openings: "1",
    number_of_rounds: "3",
  });

  const handleSubmit = (newRequirement: JobRequirement) => {
    addJob(newRequirement);
    navigate("/manager");
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid py-4">
        <JobForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          editingJob={null}
          userId={user!.user_id}
          onCancel={() => navigate("/manager")}
          jobRequirements={jobs}
        />
      </div>
    </>
  );
};

export default CreateJob;