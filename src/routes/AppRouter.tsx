import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import HomePage from '../pages/HomePage';
import ManagerDashboard from '../pages/ManagerPages/ManagerDashboard';
import CreateJob from '../pages/ManagerPages/CreateJob';
import EditJob from '../pages/ManagerPages/EditJob';
import InterviewerDashboard from '../pages/InterviewerDashboard';
import Jobs from '../pages/HRPages/Jobs';
import Dashboard from '../pages/HRPages/Dashboard';
import Approvals from '../pages/HRPages/Approvals';
import Applicants from '../pages/HRPages/Applicants';
import Applicant from '../pages/HRPages/Applicant';
import Navbar from '../components/Navbar';

const AppRouter: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const getDashboardRoute = () => {
    if (!user) return '/';
    switch (user.Role) {
      case 'Manager':
        return '/manager';
      case 'HR':
        return '/hr/dashboard';
      case 'Interviewer':
        return '/interviewer';
      default:
        return '/';
    }
  };

  const HRLayout: React.FC = () => (
    <ProtectedRoute allowedRoles={['HR']}>
      <>
        <Navbar />
        <Outlet />
      </>
    </ProtectedRoute>
  );

  const ManagerLayout: React.FC = () => (
    <ProtectedRoute allowedRoles={['Manager']}>
      <>
        <Outlet />
      </>
    </ProtectedRoute>
  );

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? <Navigate to={getDashboardRoute()} replace /> : <HomePage />
        }
      />

      {/* Manager Routes */}
      <Route path="/manager" element={<ManagerLayout />}>
        <Route index element={<ManagerDashboard />} />
        <Route path="create-job" element={<CreateJob />} />
        <Route path="edit-job/:id" element={<EditJob />} />
      </Route>

      {/* HR Routes */}
      <Route path="/hr/*" element={<HRLayout />}>
        <Route path="jobs" element={<Jobs />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="approvals" element={<Approvals />} />
        <Route path="applicants/:jobId" element={<Applicants />} />
        <Route path="applicant/:applicantId" element={<Applicant />} />
      </Route>

      {/* Interviewer Route */}
      <Route
        path="/interviewer"
        element={
          <ProtectedRoute allowedRoles={['Interviewer']}>
            <InterviewerDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;