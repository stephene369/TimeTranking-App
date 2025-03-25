import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Pages et composants existants
import Welcome from './pages/Welcome';
import WelcomeHome from './components/WelcomeHome';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Team from './pages/Team';
import Recruitment from './pages/Recruitment';
import Projects from './pages/Projects';
import MyWork from './pages/MyWork';
import JobSearch from './pages/JobSearch';
import Portfolio from './pages/Portfolio';

// Importation des fonctions d'authentification
import { isAuthenticated, getUserRole } from './apis/auth';
import { UserRole } from './types/users';

// Composants simples pour les routes non définies
const SimplePage = ({ title }: { title: string }) => <h1>{title}</h1>;

// Composant pour protéger les routes
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRoles }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/signin" />;
  }

  if (requiredRoles && !requiredRoles.includes(getUserRole())) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};

// Composant pour les routes publiques
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};

// Thème de l'application
const theme = createTheme({
  // Votre configuration de thème ici
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Routes publiques */}
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
          
          {/* Routes protégées avec MainLayout comme layout parent */}
          <Route path="/" element={
            <ProtectedRoute>
              <MainLayout userRole={getUserRole()} />
            </ProtectedRoute>
          }>
            {/* Routes communes */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="calendar" element={<SimplePage title="Calendar Page" />} />
            <Route path="notifications" element={<SimplePage title="Notifications Page" />} />
            <Route path="messages" element={<SimplePage title="Messages Page" />} />
            
            {/* Routes de profil */}
            <Route path="profile" element={<Profile />} />
            <Route path="profile/view" element={<SimplePage title="View Profile Page" />} />
            <Route path="profile/edit" element={<SimplePage title="Edit Profile Page" />} />
            <Route path="profile/privacy" element={<SimplePage title="Privacy Settings Page" />} />
            <Route path="profile/preferences" element={<SimplePage title="Preferences Page" />} />
            
            {/* Routes de paramètres */}
            <Route path="settings" element={<Settings />} />
            <Route path="settings/account" element={<SimplePage title="Account Settings Page" />} />
            <Route path="settings/notifications" element={<SimplePage title="Notification Settings Page" />} />
            <Route path="settings/appearance" element={<SimplePage title="Appearance Settings Page" />} />
            <Route path="settings/language" element={<SimplePage title="Language & Region Settings Page" />} />
            <Route path="settings/security" element={<SimplePage title="Security & Login Settings Page" />} />
            
            {/* Routes spécifiques aux employeurs */}
            <Route path="team" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYER]}>
                <Team />
              </ProtectedRoute>
            } />
            <Route path="team/overview" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYER]}>
                <SimplePage title="Team Overview Page" />
              </ProtectedRoute>
            } />
            <Route path="team/employees" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYER]}>
                <SimplePage title="Employees Page" />
              </ProtectedRoute>
            } />
            <Route path="team/job-seekers" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYER]}>
                <SimplePage title="Job Seekers Page" />
              </ProtectedRoute>
            } />
            <Route path="team/invitations" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYER]}>
                <SimplePage title="Invitations Page" />
              </ProtectedRoute>
            } />
            <Route path="team/structure" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYER]}>
                <SimplePage title="Organizational Structure Page" />
              </ProtectedRoute>
            } />
            
            <Route path="recruitment" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYER]}>
                <Recruitment />
              </ProtectedRoute>
            } />
            <Route path="recruitment/jobs" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYER]}>
                <SimplePage title="Published Jobs Page" />
              </ProtectedRoute>
            } />
            <Route path="recruitment/applications" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYER]}>
                <SimplePage title="Applications Page" />
              </ProtectedRoute>
            } />
            <Route path="recruitment/interviews" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYER]}>
                <SimplePage title="Scheduled Interviews Page" />
              </ProtectedRoute>
            } />
            <Route path="recruitment/pipeline" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYER]}>
                <SimplePage title="Recruitment Pipeline Page" />
              </ProtectedRoute>
            } />
            <Route path="recruitment/statistics" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYER]}>
                <SimplePage title="Recruitment Statistics Page" />
              </ProtectedRoute>
            } />
            
            <Route path="projects" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYER, UserRole.EMPLOYEE]}>
                <Projects />
              </ProtectedRoute>
            } />
            <Route path="projects/overview" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYER]}>
                <SimplePage title="Projects Overview Page" />
              </ProtectedRoute>
            } />
            <Route path="projects/create" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYER]}>
                <SimplePage title="Create Project Page" />
              </ProtectedRoute>
            } />
            <Route path="projects/assign" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYER]}>
                <SimplePage title="Assign Tasks Page" />
              </ProtectedRoute>
            } />
            <Route path="projects/deadlines" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYER]}>
                <SimplePage title="Deadline Tracking Page" />
              </ProtectedRoute>
            } />
            <Route path="projects/reports" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYER]}>
                <SimplePage title="Progress Reports Page" />
              </ProtectedRoute>
            } />
            
            <Route path="finance" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYER]}>
                <SimplePage title="Finance Page" />
              </ProtectedRoute>
            } />
            <Route path="finance/budget" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYER]}>
                <SimplePage title="HR Budget Page" />
              </ProtectedRoute>
            } />
            <Route path="finance/salaries" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYER]}>
                <SimplePage title="Salaries Page" />
              </ProtectedRoute>
            } />
            <Route path="finance/benefits" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYER]}>
                <SimplePage title="Bonuses & Benefits Page" />
              </ProtectedRoute>
            } />
            <Route path="finance/reports" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYER]}>
                <SimplePage title="Financial Reports Page" />
              </ProtectedRoute>
            } />
            
            <Route path="reports" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYER]}>
                <SimplePage title="Reports Page" />
              </ProtectedRoute>
            } />
            <Route path="reports/performance" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYER]}>
                <SimplePage title="Team Performance Page" />
              </ProtectedRoute>
            } />
            <Route path="reports/hours" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYER]}>
                <SimplePage title="Work Hours Page" />
              </ProtectedRoute>
            } />
            <Route path="reports/retention" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYER]}>
                <SimplePage title="Retention Rate Page" />
              </ProtectedRoute>
            } />
            <Route path="reports/skills" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYER]}>
                <SimplePage title="Skills Analysis Page" />
              </ProtectedRoute>
            } />
            <Route path="reports/custom" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYER]}>
                <SimplePage title="Custom Reports Page" />
              </ProtectedRoute>
            } />
            
            {/* Routes spécifiques aux employés */}
            <Route path="my-work" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYEE]}>
                <MyWork />
              </ProtectedRoute>
            } />
            <Route path="my-work/tasks" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYEE]}>
                <SimplePage title="Assigned Tasks Page" />
              </ProtectedRoute>
            } />
            <Route path="my-work/projects" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYEE]}>
                <SimplePage title="Current Projects Page" />
              </ProtectedRoute>
            } />
            <Route path="my-work/deadlines" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYEE]}>
                <SimplePage title="Upcoming Deadlines Page" />
              </ProtectedRoute>
            } />
            <Route path="my-work/hours" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYEE]}>
                <SimplePage title="Work Hours Page" />
              </ProtectedRoute>
            } />
            
            <Route path="employee-team" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYEE]}>
                <SimplePage title="Employee Team Page" />
              </ProtectedRoute>
            } />
            <Route path="employee-team/members" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYEE]}>
                <SimplePage title="Team Members Page" />
              </ProtectedRoute>
            } />
            <Route path="employee-team/projects" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYEE]}>
                <SimplePage title="Team Projects Page" />
              </ProtectedRoute>
            } />
            <Route path="employee-team/discussions" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYEE]}>
                <SimplePage title="Team Discussions Page" />
              </ProtectedRoute>
            } />
            
            <Route path="development" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYEE]}>
                <SimplePage title="Development Page" />
              </ProtectedRoute>
            } />
            <Route path="development/training" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYEE]}>
                <SimplePage title="Available Training Page" />
              </ProtectedRoute>
            } />
            <Route path="development/skills" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYEE]}>
                <SimplePage title="Skills to Acquire Page" />
              </ProtectedRoute>
            } />
            <Route path="development/certifications" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYEE]}>
                <SimplePage title="Certifications Page" />
              </ProtectedRoute>
            } />
            <Route path="development/career" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYEE]}>
                <SimplePage title="Career Plan Page" />
              </ProtectedRoute>
            } />
            
            <Route path="performance" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYEE]}>
                <SimplePage title="Performance Page" />
              </ProtectedRoute>
            } />
            <Route path="performance/objectives" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYEE]}>
                <SimplePage title="Objectives Page" />
              </ProtectedRoute>
            } />
            <Route path="performance/evaluations" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYEE]}>
                <SimplePage title="Evaluations Page" />
              </ProtectedRoute>
            } />
            <Route path="performance/achievements" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYEE]}>
                <SimplePage title="Achievements Page" />
              </ProtectedRoute>
            } />
            <Route path="performance/feedback" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYEE]}>
                <SimplePage title="Received Feedback Page" />
              </ProtectedRoute>
            } />
            
            <Route path="benefits" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYEE]}>
                <SimplePage title="Benefits Page" />
              </ProtectedRoute>
            } />
            <Route path="benefits/leave" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYEE]}>
                <SimplePage title="Leave & Absences Page" />
              </ProtectedRoute>
            } />
            <Route path="benefits/social" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYEE]}>
                <SimplePage title="Social Benefits Page" />
              </ProtectedRoute>
            } />
            <Route path="benefits/wellness" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYEE]}>
                <SimplePage title="Wellness Programs Page" />
              </ProtectedRoute>
            } />
            <Route path="benefits/requests" element={
              <ProtectedRoute requiredRoles={[UserRole.EMPLOYEE]}>
                <SimplePage title="Special Requests Page" />
              </ProtectedRoute>
            } />
            
            {/* Routes spécifiques aux chercheurs d'emploi */}
            <Route path="job-search" element={
              <ProtectedRoute requiredRoles={[UserRole.JOB_SEEKER]}>
                <JobSearch />
              </ProtectedRoute>
            } />
            <Route path="job-search/recommended" element={
              <ProtectedRoute requiredRoles={[UserRole.JOB_SEEKER]}>
                <SimplePage title="Recommended Jobs Page" />
              </ProtectedRoute>
            } />
            <Route path="job-search/advanced" element={
              <ProtectedRoute requiredRoles={[UserRole.JOB_SEEKER]}>
                <SimplePage title="Advanced Search Page" />
              </ProtectedRoute>
            } />
            <Route path="job-search/saved" element={
              <ProtectedRoute requiredRoles={[UserRole.JOB_SEEKER]}>
                <SimplePage title="Saved Jobs Page" />
              </ProtectedRoute>
            } />
            <Route path="job-search/history" element={
              <ProtectedRoute requiredRoles={[UserRole.JOB_SEEKER]}>
                <SimplePage title="Application History Page" />
              </ProtectedRoute>
            } />
            
            <Route path="portfolio" element={
              <ProtectedRoute requiredRoles={[UserRole.JOB_SEEKER]}>
                <Portfolio />
              </ProtectedRoute>
            } />
            <Route path="portfolio/resume" element={
              <ProtectedRoute requiredRoles={[UserRole.JOB_SEEKER]}>
                <SimplePage title="Resume & Cover Letters Page" />
              </ProtectedRoute>
            } />
            <Route path="portfolio/skills" element={
              <ProtectedRoute requiredRoles={[UserRole.JOB_SEEKER]}>
                <SimplePage title="Skills Page" />
              </ProtectedRoute>
            } />
            <Route path="portfolio/achievements" element={
              <ProtectedRoute requiredRoles={[UserRole.JOB_SEEKER]}>
                <SimplePage title="Achievements Page" />
              </ProtectedRoute>
            } />
            <Route path="portfolio/references" element={
              <ProtectedRoute requiredRoles={[UserRole.JOB_SEEKER]}>
                <SimplePage title="References Page" />
              </ProtectedRoute>
            } />
            
            <Route path="network" element={
              <ProtectedRoute requiredRoles={[UserRole.JOB_SEEKER]}>
                <SimplePage title="Network Page" />
              </ProtectedRoute>
            } />
            <Route path="network/contacts" element={
              <ProtectedRoute requiredRoles={[UserRole.JOB_SEEKER]}>
                <SimplePage title="Professional Contacts Page" />
              </ProtectedRoute>
            } />
            <Route path="network/companies" element={
              <ProtectedRoute requiredRoles={[UserRole.JOB_SEEKER]}>
                <SimplePage title="Followed Companies Page" />
              </ProtectedRoute>
            } />
            <Route path="network/recommendations" element={
              <ProtectedRoute requiredRoles={[UserRole.JOB_SEEKER]}>
                <SimplePage title="Recommendations Page" />
              </ProtectedRoute>
            } />
            <Route path="network/events" element={
              <ProtectedRoute requiredRoles={[UserRole.JOB_SEEKER]}>
                <SimplePage title="Networking Events Page" />
              </ProtectedRoute>
            } />
            
            <Route path="learning" element={
              <ProtectedRoute requiredRoles={[UserRole.JOB_SEEKER]}>
                <SimplePage title="Learning Page" />
              </ProtectedRoute>
            } />
            <Route path="learning/recommended" element={
              <ProtectedRoute requiredRoles={[UserRole.JOB_SEEKER]}>
                <SimplePage title="Recommended Training Page" />
              </ProtectedRoute>
            } />
            <Route path="learning/certifications" element={
              <ProtectedRoute requiredRoles={[UserRole.JOB_SEEKER]}>
                <SimplePage title="Certifications Page" />
              </ProtectedRoute>
            } />
            <Route path="learning/tutorials" element={
              <ProtectedRoute requiredRoles={[UserRole.JOB_SEEKER]}>
                <SimplePage title="Tutorials Page" />
              </ProtectedRoute>
            } />
            <Route path="learning/resources" element={
              <ProtectedRoute requiredRoles={[UserRole.JOB_SEEKER]}>
                <SimplePage title="Development Resources Page" />
              </ProtectedRoute>
            } />
            
            <Route path="interviews" element={
              <ProtectedRoute requiredRoles={[UserRole.JOB_SEEKER]}>
                <SimplePage title="Interviews Page" />
              </ProtectedRoute>
            } />
            <Route path="interviews/upcoming" element={
              <ProtectedRoute requiredRoles={[UserRole.JOB_SEEKER]}>
                <SimplePage title="Upcoming Interviews Page" />
              </ProtectedRoute>
            } />
            <Route path="interviews/preparation" element={
              <ProtectedRoute requiredRoles={[UserRole.JOB_SEEKER]}>
                <SimplePage title="Interview Preparation Page" />
              </ProtectedRoute>
            } />
            <Route path="interviews/feedback" element={
              <ProtectedRoute requiredRoles={[UserRole.JOB_SEEKER]}>
                <SimplePage title="Received Feedback Page" />
              </ProtectedRoute>
            } />
            <Route path="interviews/history" element={
              <ProtectedRoute requiredRoles={[UserRole.JOB_SEEKER]}>
                <SimplePage title="Interview History Page" />
              </ProtectedRoute>
            } />
          </Route>
          
          {/* Redirection pour les routes inconnues */}
          <Route path="*" element={
            isAuthenticated() ? <Navigate to="/dashboard" /> : <Navigate to="/" />
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
