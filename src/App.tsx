import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/global.css';
import { AuthProvider } from './contexts/AuthContext';
import { JobProvider } from './contexts/JobContext';
import React from 'react';

const AppContent: React.FC = () => {
  return (
    <>
      <AppRouter />
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <JobProvider>
          <AppContent />
        </JobProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;