import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Building2, LogOut, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getNavItems = () => {
    if (!user) return [];
    
    switch (user.role) {
      case 'Manager':
        return [
          { name: 'Dashboard', path: '/manager', active: location.pathname === '/manager' },
        ];
      case 'HR':
        return [
          { name: 'Jobs', path: '/hr/jobs', active: location.pathname.startsWith('/hr/jobs') || location.pathname.includes('/applicants') },
          { name: 'Dashboard', path: '/hr/dashboard', active: location.pathname === '/hr/dashboard' },
          { name: 'Job Approvals', path: '/hr/approvals', active: location.pathname === '/hr/approvals' }
        ];
      case 'Interviewer':
        return [
          { name: 'Dashboard', path: '/interviewer', active: location.pathname === '/interviewer' }
        ];
      default:
        return [];
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#2c3e50' }}>
      <div className="container-fluid">
        <Link className="navbar-brand text-white d-flex align-items-center" to="/">
          <Building2 className="me-2" size={24} />
          Fidelity National Financial
        </Link>
        
        {user && (
          <>
            <div className="navbar-nav me-auto">
              {getNavItems().map((item) => (
                <Link
                  key={item.name}
                  className={`nav-link text-white ${item.active ? 'active fw-bold' : ''}`}
                  to={item.path}
                  style={{ 
                    borderBottom: item.active ? '2px solid #3498db' : 'none',
                    paddingBottom: '8px'
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            <div className="d-flex align-items-center">
              <div className="dropdown">
                <button 
                  className="btn btn-link text-white dropdown-toggle d-flex align-items-center text-decoration-none"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ border: 'none' }}
                >
                  <div 
                    className="rounded-circle bg-primary d-flex align-items-center justify-content-center me-2 mb-3"
                    style={{ width: '32px', height: '32px' }}
                  >
                    <span className="text-white fw-bold">
                      {user.first_name.charAt(0)}{user.last_name.charAt(0)}
                    </span>
                  </div>
                  <div className="text-start">
                    <div className="fw-bold">{user.first_name} {user.last_name}</div>
                    <small className="text-white">{user.role}</small>
                  </div>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/">
                      <User size={16} className="me-2" />
                      Home
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      <LogOut size={16} className="me-2" />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;