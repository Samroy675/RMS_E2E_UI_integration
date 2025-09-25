import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <span className="text-primary"> Fidelity National Financial </span>
        </Link>

        <div className="navbar-nav me-auto">
          <Link
            to="/hr"
            className={`nav-link ${isActive("/jobs")} ${
              location.pathname.includes("/applicants") ? "active" : ""
            }`}
          >
            Jobs
          </Link>
          <Link
            to="/hr/dashboard"
            className={`nav-link ${isActive("/dashboard")}`}
          >
            Dashboard
          </Link>
          <Link
            to="/hr/approvals"
            className={`nav-link ${isActive("/approvals")}`}
          >
            Job Approvals
          </Link>
        </div>

        <div className="navbar-nav ms-auto">
          <div className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle d-flex align-items-center text-muted"
              href="#"
              id="userDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div
                className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-2 mb-3"
                style={{ width: "32px", height: "32px" }}
              >
                <span className="text-white fw-bold">S</span>
              </div>
              <div className="text-end">
                <div className="text-white">Sarah Johnson</div>
                <small className="text-white">HR</small>
              </div>
            </a>

            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="userDropdown"
            >
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => console.log("Sign out")}
                >
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
