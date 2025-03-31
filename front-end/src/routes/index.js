import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// Layouts
const AuthLayout = lazy(() => import('../layouts/AuthLayout'));
const DashboardLayout = lazy(() => import('../layouts/DashboardLayout'));

// Auth Pages
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('../pages/auth/ResetPassword'));

// Public Pages
const Home = lazy(() => import('../pages/public/Home'));
const About = lazy(() => import('../pages/public/About'));
const Resources = lazy(() => import('../pages/public/Resources'));
const Workshops = lazy(() => import('../pages/public/Workshops'));
const Contact = lazy(() => import('../pages/public/Contact'));

// Student Pages
const StudentDashboard = lazy(() => import('../pages/student/Dashboard'));
const TimeTracker = lazy(() => import('../pages/student/TimeTracker'));
const Tasks = lazy(() => import('../pages/student/Tasks'));
const Calendar = lazy(() => import('../pages/student/Calendar'));
const Reports = lazy(() => import('../pages/student/Reports'));
const StudentProfile = lazy(() => import('../pages/student/Profile'));
const StudentResources = lazy(() => import('../pages/student/Resources'));

// Advisor Pages
const AdvisorDashboard = lazy(() => import('../pages/advisor/Dashboard'));
const StudentManagement = lazy(() => import('../pages/advisor/StudentManagement'));
const AdvisorWorkshops = lazy(() => import('../pages/advisor/Workshops'));
const AdvisorProfile = lazy(() => import('../pages/advisor/Profile'));

// Admin Pages
const AdminDashboard = lazy(() => import('../pages/admin/Dashboard'));
const UserManagement = lazy(() => import('../pages/admin/UserManagement'));
const ContentManagement = lazy(() => import('../pages/admin/ContentManagement'));
const WorkshopManagement = lazy(() => import('../pages/admin/WorkshopManagement'));
const SystemSettings = lazy(() => import('../pages/admin/SystemSettings'));

// Routes configuration
const routes = [
  // Public routes
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'resources', element: <Resources /> },
      { path: 'workshops', element: <Workshops /> },
      { path: 'contact', element: <Contact /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'reset-password', element: <ResetPassword /> },
    ],
  },
  
  // Student routes
  {
    path: '/student',
    element: <DashboardLayout userType="student" />,
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
    element: <DashboardLayout userType="advisor" />,
    children: [
      { path: '', element: <Navigate to="/advisor/dashboard" replace /> },
      { path: 'dashboard', element: <AdvisorDashboard /> },
      { path: 'students', element: <StudentManagement /> },
      { path: 'workshops', element: <AdvisorWorkshops /> },
      { path: 'profile', element: <AdvisorProfile /> },
    ],
  },
  
  // Admin routes
  {
    path: '/admin',
    element: <DashboardLayout userType="admin" />,
    children: [
      { path: '', element: <Navigate to="/admin/dashboard" replace /> },
      { path: 'dashboard', element: <AdminDashboard /> },
      { path: 'users', element: <UserManagement /> },
      { path: 'content', element: <ContentManagement /> },
      { path: 'workshops', element: <WorkshopManagement /> },
      { path: 'settings', element: <SystemSettings /> },
    ],
  },
  
  // Catch all route
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];

export default routes;
