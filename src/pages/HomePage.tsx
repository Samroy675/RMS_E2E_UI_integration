import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Mail, Phone, UserPlus, LogIn, Users, Briefcase, Target, Award } from 'lucide-react';

const HomePage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    phone: '',
    role: 'Manager' as const
  });
  const [error, setError] = useState('');
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const success = await login(formData.email, formData.password);
      if (success) {
        // Navigation will be handled by the auth context and routing
      } else {
        setError('Invalid credentials');
      }
    } else {
        const success = await signup({
            email: formData.email,
            password: formData.password,
            first_name: formData.first_name,
            last_name: formData.last_name,
            phone: formData.phone,
            role: formData.role,
            is_active: true
          });
          
      if (success) {
        // Navigation will be handled by the auth context and routing
      } else {
        setError('User already exists or signup failed');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Hero Section */}
      <div className="hero-section text-white py-5" style={{ backgroundColor: '#1e3a8a', background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">Welcome to Fidelity National Financial</h1>
              <p className="lead mb-4">Your trusted partner in comprehensive HR management solutions. Streamline your hiring process with our advanced recruitment platform.</p>
              <div className="d-flex gap-3 mb-4">
                <div className="d-flex align-items-center">
                  <Users className="me-2" size={24} />
                  <span>Multi-Role Access</span>
                </div>
                <div className="d-flex align-items-center">
                  <Briefcase className="me-2" size={24} />
                  <span>Job Management</span>
                </div>
                <div className="d-flex align-items-center">
                  <Target className="me-2" size={24} />
                  <span>Interview Tracking</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card shadow-lg">
                <div className="card-header bg-white">
                  <div className="d-flex justify-content-center">
                    <div className="btn-group" role="group">
                      <button
                        type="button"
                        className={`btn ${isLogin ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setIsLogin(true)}
                      >
                        <LogIn size={16} className="me-1" />
                        Sign In
                      </button>
                      <button
                        type="button"
                        className={`btn ${!isLogin ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setIsLogin(false)}
                      >
                        <UserPlus size={16} className="me-1" />
                        Sign Up
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    {error && (
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>
                    )}
                    
                    {!isLogin && (
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label className="form-label">First Name</label>
                          <div className="input-group">
                            <span className="input-group-text"><User size={16} /></span>
                            <input
                              type="text"
                              className="form-control"
                              name="first_name"
                              value={formData.first_name}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Last Name</label>
                          <div className="input-group">
                            <span className="input-group-text"><User size={16} /></span>
                            <input
                              type="text"
                              className="form-control"
                              name="last_name"
                              value={formData.last_name}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <div className="input-group">
                        <span className="input-group-text"><Mail size={16} /></span>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Password</label>
                      <div className="input-group">
                        <span className="input-group-text"><Lock size={16} /></span>
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    {!isLogin && (
                      <>
                        <div className="mb-3">
                          <label className="form-label">Phone</label>
                          <div className="input-group">
                            <span className="input-group-text"><Phone size={16} /></span>
                            <input
                              type="tel"
                              className="form-control"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Role</label>
                          <select
                            className="form-select"
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="Manager">Manager</option>
                            <option value="HR">HR</option>
                            <option value="Interviewer">Interviewer</option>
                          </select>
                        </div>
                      </>
                    )}

                    <button type="submit" className="btn btn-primary w-100">
                      {isLogin ? (
                        <>
                          <LogIn size={16} className="me-1" />
                          Sign In
                        </>
                      ) : (
                        <>
                          <UserPlus size={16} className="me-1" />
                          Sign Up
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-5">
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col-lg-8 mx-auto">
              <h2 className="display-5 fw-bold mb-3" style={{ color: '#1e3a8a' }}>Comprehensive HR Solutions</h2>
              <p className="lead text-muted">Empower your organization with tools designed for modern workforce management</p>
            </div>
          </div>
          
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                    <Briefcase size={32} className="text-white" />
                  </div>
                  <h4 className="card-title">Job Management</h4>
                  <p className="card-text text-muted">Create, manage, and track job postings with our intuitive manager dashboard. Streamline your recruitment process from start to finish.</p>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="bg-success rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                    <Users size={32} className="text-white" />
                  </div>
                  <h4 className="card-title">Interview Coordination</h4>
                  <p className="card-text text-muted">Schedule interviews, provide feedback, and coordinate with HR seamlessly. Make informed hiring decisions with comprehensive candidate evaluations.</p>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="bg-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                    <Award size={32} className="text-white" />
                  </div>
                  <h4 className="card-title">Performance Analytics</h4>
                  <p className="card-text text-muted">Track recruitment metrics, candidate scores, and hiring success rates. Make data-driven decisions to optimize your talent acquisition strategy.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Credentials Section */}
      <div className="py-4 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-center mb-4" style={{ color: '#1e3a8a' }}>Demo Credentials</h5>
                  <div className="row">
                    <div className="col-md-4 text-center">
                      <h6 className="text-primary">Manager</h6>
                      <p className="mb-1"><strong>Email:</strong> john.manager@company.com</p>
                      <p className="mb-0"><strong>Password:</strong> hashed_password_1</p>
                    </div>
                    <div className="col-md-4 text-center">
                      <h6 className="text-success">HR</h6>
                      <p className="mb-1"><strong>Email:</strong> sarah.hr@company.com</p>
                      <p className="mb-0"><strong>Password:</strong> hashed_password_2</p>
                    </div>
                    <div className="col-md-4 text-center">
                      <h6 className="text-warning">Interviewer</h6>
                      <p className="mb-1"><strong>Email:</strong> mike.interviewer@company.com</p>
                      <p className="mb-0"><strong>Password:</strong> hashed_password_3</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;