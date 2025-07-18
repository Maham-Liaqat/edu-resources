// src/App.jsx
import { useEffect, useContext } from 'react';
import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
// import { AuthProvider } from './contexts/AuthContext';
import { AdminProvider, AdminContext } from './contexts/AdminContext';
import AppLayout from './components/layout/AppLayout';
import ErrorBoundary from './components/ErrorBoundary';
import { HelmetProvider } from 'react-helmet-async';

function AuthWrapper() {
  const { checkAuth } = useContext(AdminContext);

  useEffect(() => {
    checkAuth();
  }, []);

  return <AppLayout />;
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <CssBaseline />
        
          <ErrorBoundary>
            <AdminProvider>
        <AppLayout />
      </AdminProvider>
          </ErrorBoundary>
        
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;