import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import { USER_ROLES } from '../types/user';

// Pages publiques
import Welcome from '../pages/Welcome';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

// Pages étudiants
import StudentDashboard from '../pages/student/Dashboard';
import TimeTracker from '../pages/student/TimeTracker';
import Tasks from '../pages/student/Tasks';
import Resources from '../pages/student/Resources';
import Settings from '../pages/student/Settings';

// Pages conseillers
import AdvisorDashboard from '../pages/advisor/Dashboard';
import StudentManagement from '../pages/advisor/StudentManagement';
import WorkshopManagement from '../pages/advisor/WorkshopManagement';
import AdvisorSettings from '../pages/advisor/Settings';

// Layouts
import StudentLayout from '../components/layouts/StudentLayout';
import AdvisorLayout from '../components/layouts/AdvisorLayout';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Routes étudiants */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute requiredRole={USER_ROLES.STUDENT}>
                <StudentLayout>
                  <StudentDashboard />
                </StudentLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/time-tracker" 
            element={
              <ProtectedRoute requiredRole={USER_ROLES.STUDENT}>
                <StudentLayout>
                  <TimeTracker />
                </StudentLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/tasks" 
            element={
              <ProtectedRoute requiredRole={USER_ROLES.STUDENT}>
                <StudentLayout>
                  <Tasks />
                </StudentLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/resources" 
            element={
              <ProtectedRoute requiredRole={USER_ROLES.STUDENT}>
                <StudentLayout>
                  <Resources />
                </StudentLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute requiredRole={USER_ROLES.STUDENT}>
                <StudentLayout>
                  <Settings />
                </StudentLayout>
              </ProtectedRoute>
            } 
          />

          {/* Routes conseillers */}
          <Route 
            path="/advisor/dashboard" 
            element={
              <ProtectedRoute requiredRole={USER_ROLES.ADVISOR}>
                <AdvisorLayout>
                  <AdvisorDashboard />
                </AdvisorLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/advisor/students" 
            element={
              <ProtectedRoute requiredRole={USER_ROLES.ADVISOR}>
                <AdvisorLayout>
                  <StudentManagement />
                </AdvisorLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/advisor/workshops" 
            element={
              <ProtectedRoute requiredRole={USER_ROLES.ADVISOR}>
                <AdvisorLayout>
                  <WorkshopManagement />
                </AdvisorLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/advisor/settings" 
            element={
              <ProtectedRoute requiredRole={USER_ROLES.ADVISOR}>
                <AdvisorLayout>
                  <AdvisorSettings />
                </AdvisorLayout>
              </ProtectedRoute>
            } 
          />

          {/* Redirection par défaut */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
