import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Welcome from './pages/welcome';
import WelcomeHome from './components/WelcomeHome';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import Dashboard from './pages/Dashboard';
import { isAuthenticated } from './utils/apis/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// Protected route component
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  if (!isAuthenticated()) {
    // Redirect to welcome page if not authenticated
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

// Public route - redirects to dashboard if already authenticated
const PublicRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  if (isAuthenticated()) {
    // Redirect to dashboard if already authenticated
    return <Navigate to="/dashboard" />;
  }
  return <>{children}</>;
};

// Create a theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Welcome page with different content based on route */}
          <Route path="/" element={
            <PublicRoute>
              <Welcome>
                <WelcomeHome />
              </Welcome>
            </PublicRoute>
          } />
          
          <Route path="/signin" element={
            <PublicRoute>
              <Welcome>
                <SignInForm />
              </Welcome>
            </PublicRoute>
          } />
          
          <Route path="/signup" element={
            <PublicRoute>
              <Welcome>
                <SignUpForm />
              </Welcome>
            </PublicRoute>
          } />
          
          {/* Dashboard page (protected) */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          {/* Redirect any unknown routes to welcome page */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
