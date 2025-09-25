import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { JobRequirement } from '../data/index';
import { getJobRequirementsByManager } from '../services/dataService';
import { Plus, Edit, Trash2, Calendar, Users, Briefcase, CheckCircle, Clock, XCircle } from 'lucide-react';
import Navbar from '../components/Navbar';

const ManagerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [jobRequirements, setJobRequirements] = useState<JobRequirement[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingJob, setEditingJob] = useState<JobRequirement | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    job_title: '',
    job_description: '',
    years_experience: '',
    required_skills: '',
    number_of_openings: '',
    number_of_rounds: '3'
  });

  useEffect(() => {
    if (user) {
      loadJobRequirements();
    }
  }, [user]);

  const loadJobRequirements = async () => {
    if (user) {
      setLoading(true);
      try {
        const requirements = await getJobRequirementsByManager(user.user_id);
        setJobRequirements(requirements);
      } catch (error) {
        console.error('Error loading job requirements:', error);
      }
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRequirement: JobRequirement = {
      requirement_id: Math.max(...jobRequirements.map(r => r.requirement_id), 0) + 1,
      manager_id: user!.user_id,
      job_title: formData.job_title,
      job_description: formData.job_description,
      years_experience: parseInt(formData.years_experience),
      required_skills: formData.required_skills,
      number_of_openings: parseInt(formData.number_of_openings),
      number_of_rounds: parseInt(formData.number_of_rounds),
      status: 'Pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    if (editingJob) {
      // Update existing job
      const updatedRequirements = jobRequirements.map(req =>
        req.requirement_id === editingJob.requirement_id
          ? { ...newRequirement, requirement_id: editingJob.requirement_id }
          : req
      );
      setJobRequirements(updatedRequirements);
    } else {
      // Add new job
      setJobRequirements([...jobRequirements, newRequirement]);
    }

    // Reset form
    setFormData({
      job_title: '',
      job_description: '',
      years_experience: '',
      required_skills: '',
      number_of_openings: '',
      number_of_rounds: '3'
    });
    setShowCreateForm(false);
    setEditingJob(null);
  };

  const handleEdit = (job: JobRequirement) => {
    setEditingJob(job);
    setFormData({
      job_title: job.job_title,
      job_description: job.job_description,
      years_experience: job.years_experience.toString(),
      required_skills: job.required_skills,
      number_of_openings: job.number_of_openings.toString(),
      number_of_rounds: job.number_of_rounds.toString()
    });
    setShowCreateForm(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this job requirement?')) {
      setJobRequirements(jobRequirements.filter(req => req.requirement_id !== id));
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'Pending': { class: 'bg-warning text-dark', icon: Clock },
      'Approved': { class: 'bg-success', icon: CheckCircle },
      'Rejected': { class: 'bg-danger', icon: XCircle }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig['Pending'];
    const Icon = config.icon;
    
    return (
      <span className={`badge ${config.class} d-inline-flex align-items-center`}>
        <Icon size={14} className="me-1" />
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container-fluid py-4">
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container-fluid py-4">
        {/* Header */}
        <div className="row mb-4">
          <div className="col-md-8">
            <h1 className="h3 mb-3" style={{ color: '#1e3a8a' }}>Manager Dashboard</h1>
            <p className="text-muted">Manage job requirements and track their approval status</p>
          </div>
          <div className="col-md-4 text-end">
            <button
              className="btn btn-primary"
              onClick={() => {
                setShowCreateForm(true);
                setEditingJob(null);
                setFormData({
                  job_title: '',
                  job_description: '',
                  years_experience: '',
                  required_skills: '',
                  number_of_openings: '',
                  number_of_rounds: '3'
                });
              }}
            >
              <Plus size={16} className="me-1" />
              Create New Job
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="row mb-4">
          <div className="col-lg-3 col-md-6 mb-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="bg-primary rounded p-3 me-3">
                    <Briefcase size={24} className="text-white" />
                  </div>
                  <div>
                    <h5 className="card-title mb-0">{jobRequirements.length}</h5>
                    <p className="card-text text-muted mb-0">Total Jobs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="bg-warning rounded p-3 me-3">
                    <Clock size={24} className="text-white" />
                  </div>
                  <div>
                    <h5 className="card-title mb-0">{jobRequirements.filter(j => j.status === 'Pending').length}</h5>
                    <p className="card-text text-muted mb-0">Pending</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="bg-success rounded p-3 me-3">
                    <CheckCircle size={24} className="text-white" />
                  </div>
                  <div>
                    <h5 className="card-title mb-0">{jobRequirements.filter(j => j.status === 'Approved').length}</h5>
                    <p className="card-text text-muted mb-0">Approved</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="bg-info rounded p-3 me-3">
                    <Users size={24} className="text-white" />
                  </div>
                  <div>
                    <h5 className="card-title mb-0">{jobRequirements.reduce((acc, j) => acc + j.number_of_openings, 0)}</h5>
                    <p className="card-text text-muted mb-0">Total Openings</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Create/Edit Form */}
        {showCreateForm && (
          <div className="row mb-4">
            <div className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-primary text-white">
                  <h5 className="card-title mb-0">
                    {editingJob ? 'Edit Job Requirement' : 'Create New Job Requirement'}
                  </h5>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Job Title</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.job_title}
                          onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
                          required
                          placeholder="e.g., Senior Software Engineer"
                        />
                      </div>
                      <div className="col-md-3 mb-3">
                        <label className="form-label">Years of Experience</label>
                        <input
                          type="number"
                          className="form-control"
                          value={formData.years_experience}
                          onChange={(e) => setFormData({ ...formData, years_experience: e.target.value })}
                          required
                          min="0"
                          max="20"
                        />
                      </div>
                      <div className="col-md-3 mb-3">
                        <label className="form-label">Number of Openings</label>
                        <input
                          type="number"
                          className="form-control"
                          value={formData.number_of_openings}
                          onChange={(e) => setFormData({ ...formData, number_of_openings: e.target.value })}
                          required
                          min="1"
                        />
                      </div>
                    </div>
                    
                    <div className="row">
                      <div className="col-md-8 mb-3">
                        <label className="form-label">Required Skills</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.required_skills}
                          onChange={(e) => setFormData({ ...formData, required_skills: e.target.value })}
                          required
                          placeholder="e.g., React, TypeScript, Node.js, MongoDB"
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Number of Rounds</label>
                        <select
                          className="form-select"
                          value={formData.number_of_rounds}
                          onChange={(e) => setFormData({ ...formData, number_of_rounds: e.target.value })}
                          required
                        >
                          <option value="1">1 Round</option>
                          <option value="2">2 Rounds</option>
                          <option value="3">3 Rounds</option>
                          <option value="4">4 Rounds</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Job Description</label>
                      <textarea
                        className="form-control"
                        rows={4}
                        value={formData.job_description}
                        onChange={(e) => setFormData({ ...formData, job_description: e.target.value })}
                        required
                        placeholder="Provide a detailed description of the role..."
                      ></textarea>
                    </div>

                    <div className="d-flex gap-2">
                      <button type="submit" className="btn btn-primary">
                        {editingJob ? 'Update Job' : 'Create Job'}
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                          setShowCreateForm(false);
                          setEditingJob(null);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Job Requirements Table */}
        <div className="row">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white">
                <h5 className="card-title mb-0">All My Created Jobs</h5>
                <p className="card-text text-muted mb-0">View the status and details of all jobs you have created.</p>
              </div>
              <div className="card-body p-0">
                {jobRequirements.length === 0 ? (
                  <div className="text-center py-5">
                    <Briefcase size={48} className="text-muted mb-3" />
                    <h5 className="text-muted">No jobs created yet</h5>
                    <p className="text-muted">Create your first job requirement to get started.</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>Requirement ID</th>
                          <th>Job Title</th>
                          <th>Date Created</th>
                          <th>Status</th>
                          <th>No Of Openings</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {jobRequirements.map((job) => (
                          <tr key={job.requirement_id}>
                            <td>
                              <span className="badge bg-light text-dark">{job.requirement_id}</span>
                            </td>
                            <td>
                              <div>
                                <strong>{job.job_title}</strong>
                                <br />
                                <small className="text-muted">{job.years_experience} years exp</small>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <Calendar size={14} className="me-1 text-muted" />
                                {new Date(job.created_at).toLocaleDateString()}
                              </div>
                            </td>
                            <td>{getStatusBadge(job.status)}</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <Users size={14} className="me-1 text-muted" />
                                {job.number_of_openings}
                              </div>
                            </td>
                            <td>
                              <div className="btn-group btn-group-sm" role="group">
                                <button
                                  className="btn btn-outline-primary"
                                  onClick={() => handleEdit(job)}
                                  title="Edit"
                                >
                                  <Edit size={14} />
                                </button>
                                <button
                                  className="btn btn-outline-danger"
                                  onClick={() => handleDelete(job.requirement_id)}
                                  title="Delete"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagerDashboard;