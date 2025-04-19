import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

const Logout = lazy(() => import('../pages/auth/Logout'));

// Layouts
const AuthLayout = lazy(() => import('../layouts/AuthLayout'));
const DashboardLayout = lazy(() => import('../layouts/DashboardLayout'));

const Welcome = lazy(() => import("../pages/Welcome"));

// Auth Pages
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
// const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));
// const ResetPassword = lazy(() => import('../pages/auth/ResetPassword'));

// Student Pages
const StudentDashboard = lazy(() => import('../pages/student/Dashboard'));
const TimeTracker = lazy(() => import('../pages/student/TimeTracker'));
const Tasks = lazy(() => import('../pages/student/Tasks'));
const Calendar = lazy(() => import('../pages/student/Calendar'));
const Reports = lazy(() => import('../pages/student/Reports'));
const StudentProfile = lazy(() => import('../pages/student/Settings'));
const StudentResources = lazy(() => import('../pages/student/Resources'));

// Advisor Pages
const AdvisorDashboard = lazy(() => import('../pages/advisor/Dashboard'));
// const StudentManagement = lazy(() => import('../pages/advisor/StudentManagement'));
// const AdvisorWorkshops = lazy(() => import('../pages/advisor/Workshops'));
// const AdvisorProfile = lazy(() => import('../pages/advisor/Profile'));

// Routes configuration
const routes = [
  // Public routes
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/', element: <Welcome /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'logout', element: <Logout /> }, // Ajoutez cette ligne
      // Autres routes...
    ],
  },
 
  // Student routes
  {
    path: '/student',
    element: (
      <ProtectedRoute requiredRole="student">
        <DashboardLayout userType="student" />
      </ProtectedRoute>
    ),
    children: [
      { path: '', element: <Navigate to="/student/dashboard" replace /> },
      { path: 'dashboard', element: <StudentDashboard /> },
      { path: 'time-tracker', element: <TimeTracker /> },
      { path: 'tasks', element: <Tasks /> },
      { path: 'calendar', element: <Calendar /> },
      { path: 'reports', element: <Reports /> },
      { path: 'profile', element: <StudentProfile /> },
      { path: 'resources', element: <StudentResources /> },
    ],
  },
 
  // Advisor routes
  {
    path: '/advisor',
    element: (
      <ProtectedRoute requiredRole="advisor">
        <DashboardLayout userType="advisor" />
      </ProtectedRoute>
    ),
    children: [
      { path: '', element: <Navigate to="/advisor/dashboard" replace /> },
      { path: 'dashboard', element: <AdvisorDashboard /> },
      // { path: 'students', element: <StudentManagement /> },
      // { path: 'workshops', element: <AdvisorWorkshops /> },
      // { path: 'profile', element: <AdvisorProfile /> },
    ],
  },
 
  // Admin routes
  // {
  //   path: '/admin',
  //   element: (
  //     <ProtectedRoute requiredRole="admin">
  //       <DashboardLayout userType="admin" />
  //     </ProtectedRoute>
  //   ),
  //   children: [
  //     { path: '', element: <Navigate to="/admin/dashboard" replace /> },
  //     { path: 'dashboard', element: <AdminDashboard /> },
  //     { path: 'users', element: <UserManagement /> },
  //     { path: 'content', element: <ContentManagement /> },
  //     { path: 'workshops', element: <WorkshopManagement /> },
  //     { path: 'settings', element: <SystemSettings /> },
  //   ],
  // },
 
  // Catch all route
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },

  {
    path: '/login',
    element: <Login />,
  }
  
];

export default routes;
