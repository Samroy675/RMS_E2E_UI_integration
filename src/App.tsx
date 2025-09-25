import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import ManagerDashboard from './pages/ManagerDashboard';
import InterviewerDashboard from './pages/InterviewerDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';
import Navbar from './components/Navbar';
import Jobs from './pages/HRPages/Jobs';
import Dashboard from './pages/HRPages/Dashboard';
import Approvals from './pages/HRPages/Approvals';
import Applicants from './pages/HRPages/Applicants';
import Applicant from './pages/HRPages/Applicant';

const AppRouter: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  const getDashboardRoute = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'Manager':
        return '/manager';
      case 'HR':
        return '/hr';
      case 'Interviewer':
        return '/interviewer';
      default:
        return '/';
    }
  };

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          isAuthenticated ? (
            <Navigate to={getDashboardRoute()} replace />
          ) : (
            <HomePage />
          )
        } 
      />
      <Route
        path="/manager"
        element={
          <ProtectedRoute allowedRoles={['Manager']}>
            <ManagerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
  path="/hr"
  element={

    <ProtectedRoute allowedRoles={['HR']}>
      <>
        <Navbar />
      </>
    </ProtectedRoute>
  }
>
  {/* Nested HR routes */}
  <Route path="jobs" element={<Jobs />} />
  <Route path="dashboard" element={<Dashboard />} />
  <Route path="approvals" element={<Approvals />} />
  <Route path="applicants/:jobId" element={<Applicants />} />
  <Route path="applicant/:applicantId" element={<Applicant />} />
</Route>

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

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppRouter />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;