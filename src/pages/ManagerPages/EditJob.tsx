import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { JobRequirement } from '../../data';
import Navbar from '../../components/Navbar';
import JobForm from '../../components/ManagerComponents/JobForm';
import { useLocation, useNavigate } from 'react-router-dom';
import { useJobs } from '../../contexts/JobContext';

const EditJob: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
   const { updateJob, jobs } = useJobs();
  const location = useLocation();
  const job = location.state as JobRequirement;
  const [formData, setFormData] = useState({

    job_title: job.job_title,
    job_description: job.job_description,
    years_experience: job.years_experience.toString(),
    required_skills: job.required_skills,
    number_of_openings: job.number_of_openings.toString(),
    number_of_rounds: job.number_of_rounds.toString(),
  });

  const handleSubmit = (updatedJob: JobRequirement) => {
  updateJob(updatedJob); // This updates the job in context
  console.log("Updated job:", updatedJob);
  navigate("/manager"); // Navigate back to dashboard
};

  return (
    <>
      <Navbar />
      <div className="container-fluid py-4">
        <JobForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          editingJob={job}
          userId={user!.user_id}
          onCancel={() => navigate("/manager")}
          jobRequirements={jobs}
        />
      </div>
    </>
  );
};

export default EditJob;