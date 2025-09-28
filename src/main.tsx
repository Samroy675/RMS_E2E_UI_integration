import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { AuthProvider } from './contexts/AuthContext';
import { JobProvider } from './contexts/JobContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <JobProvider>
        <App />
      </JobProvider>
    </AuthProvider>
  </StrictMode>
);
