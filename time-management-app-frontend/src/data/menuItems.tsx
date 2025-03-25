import React from 'react';
import {
  Home as HomeIcon,
  Person as ProfileIcon,
  Settings as SettingsIcon,
  Group as TeamIcon,
  Work as JobIcon,
  Assignment as ProjectIcon,
  AttachMoney as FinanceIcon,
  BarChart as ReportIcon,
  Task as TaskIcon,
  School as LearningIcon,
  Star as PerformanceIcon,
  CardGiftcard as BenefitsIcon,
  Search as SearchIcon,
  Collections as PortfolioIcon,
  People as NetworkIcon,
  Event as InterviewIcon
} from '@mui/icons-material';
import { MenuItem } from '../types/menu';
import { UserRole } from '../types/users';

/**
 * Complete list of menu items for all user roles
 */
export const menuItems: MenuItem[] = [
  // Common menus for all users
  {
    title: 'Home',
    icon: <HomeIcon/>,
    path: '/dashboard',
    roles: [UserRole.JOB_SEEKER, UserRole.EMPLOYEE, UserRole.EMPLOYER],
    subItems: [
      { title: 'Dashboard', path: '/dashboard', roles: [UserRole.JOB_SEEKER, UserRole.EMPLOYEE, UserRole.EMPLOYER] },
      { title: 'Calendar', path: '/calendar', roles: [UserRole.JOB_SEEKER, UserRole.EMPLOYEE, UserRole.EMPLOYER] },
      { title: 'Notifications', path: '/notifications', roles: [UserRole.JOB_SEEKER, UserRole.EMPLOYEE, UserRole.EMPLOYER] },
      { title: 'Messages', path: '/messages', roles: [UserRole.JOB_SEEKER, UserRole.EMPLOYEE, UserRole.EMPLOYER] }
    ]
  },
  {
    title: 'Profile',
    icon: <ProfileIcon />,
    path: '/profile',
    roles: [UserRole.JOB_SEEKER, UserRole.EMPLOYEE, UserRole.EMPLOYER],
    subItems: [
      { title: 'View Profile', path: '/profile/view', roles: [UserRole.JOB_SEEKER, UserRole.EMPLOYEE, UserRole.EMPLOYER] },
      { title: 'Edit Profile', path: '/profile/edit', roles: [UserRole.JOB_SEEKER, UserRole.EMPLOYEE, UserRole.EMPLOYER] },
      { title: 'Privacy Settings', path: '/profile/privacy', roles: [UserRole.JOB_SEEKER, UserRole.EMPLOYEE, UserRole.EMPLOYER] },
      { title: 'Preferences', path: '/profile/preferences', roles: [UserRole.JOB_SEEKER, UserRole.EMPLOYEE, UserRole.EMPLOYER] }
    ]
  },
  {
    title: 'Settings',
    icon: <SettingsIcon />,
    path: '/settings',
    roles: [UserRole.JOB_SEEKER, UserRole.EMPLOYEE, UserRole.EMPLOYER],
    subItems: [
      { title: 'Account', path: '/settings/account', roles: [UserRole.JOB_SEEKER, UserRole.EMPLOYEE, UserRole.EMPLOYER] },
      { title: 'Notifications', path: '/settings/notifications', roles: [UserRole.JOB_SEEKER, UserRole.EMPLOYEE, UserRole.EMPLOYER] },
      { title: 'Appearance', path: '/settings/appearance', roles: [UserRole.JOB_SEEKER, UserRole.EMPLOYEE, UserRole.EMPLOYER] },
      { title: 'Language & Region', path: '/settings/language', roles: [UserRole.JOB_SEEKER, UserRole.EMPLOYEE, UserRole.EMPLOYER] },
      { title: 'Security & Login', path: '/settings/security', roles: [UserRole.JOB_SEEKER, UserRole.EMPLOYEE, UserRole.EMPLOYER] }
    ]
  },
 
  // Employer specific menus
  {
    title: 'Team',
    icon: <TeamIcon />,
    path: '/team',
    roles: [UserRole.EMPLOYER],
    subItems: [
      { title: 'Overview', path: '/team/overview', roles: [UserRole.EMPLOYER] },
      { title: 'Employees', path: '/team/employees', roles: [UserRole.EMPLOYER] },
      { title: 'Job Seekers', path: '/team/job-seekers', roles: [UserRole.EMPLOYER] },
      { title: 'Invitations', path: '/team/invitations', roles: [UserRole.EMPLOYER] },
      { title: 'Organizational Structure', path: '/team/structure', roles: [UserRole.EMPLOYER] }
    ]
  },
  {
    title: 'Recruitment',
    icon: <JobIcon />,
    path: '/recruitment',
    roles: [UserRole.EMPLOYER],
    subItems: [
      { title: 'Published Jobs', path: '/recruitment/jobs', roles: [UserRole.EMPLOYER] },
      { title: 'Applications', path: '/recruitment/applications', roles: [UserRole.EMPLOYER] },
      { title: 'Scheduled Interviews', path: '/recruitment/interviews', roles: [UserRole.EMPLOYER] },
      { title: 'Recruitment Pipeline', path: '/recruitment/pipeline', roles: [UserRole.EMPLOYER] },
      { title: 'Recruitment Statistics', path: '/recruitment/statistics', roles: [UserRole.EMPLOYER] }
    ]
  },
  {
    title: 'Projects',
    icon: <ProjectIcon />,
    path: '/projects',
    roles: [UserRole.EMPLOYER],
    subItems: [
      { title: 'Overview', path: '/projects/overview', roles: [UserRole.EMPLOYER] },
      { title: 'Create Project', path: '/projects/create', roles: [UserRole.EMPLOYER] },
      { title: 'Assign Tasks', path: '/projects/assign', roles: [UserRole.EMPLOYER] },
      { title: 'Deadline Tracking', path: '/projects/deadlines', roles: [UserRole.EMPLOYER] },
      { title: 'Progress Reports', path: '/projects/reports', roles: [UserRole.EMPLOYER] }
    ]
  },
  {
    title: 'Finance',
    icon: <FinanceIcon />,
    path: '/finance',
    roles: [UserRole.EMPLOYER],
    subItems: [
      { title: 'HR Budget', path: '/finance/budget', roles: [UserRole.EMPLOYER] },
      { title: 'Salaries', path: '/finance/salaries', roles: [UserRole.EMPLOYER] },
      { title: 'Bonuses & Benefits', path: '/finance/benefits', roles: [UserRole.EMPLOYER] },
      { title: 'Financial Reports', path: '/finance/reports', roles: [UserRole.EMPLOYER] }
    ]
  },
  {
    title: 'Reports',
    icon: <ReportIcon />,
    path: '/reports',
    roles: [UserRole.EMPLOYER],
    subItems: [
      { title: 'Team Performance', path: '/reports/performance', roles: [UserRole.EMPLOYER] },
      { title: 'Work Hours', path: '/reports/hours', roles: [UserRole.EMPLOYER] },
      { title: 'Retention Rate', path: '/reports/retention', roles: [UserRole.EMPLOYER] },
      { title: 'Skills Analysis', path: '/reports/skills', roles: [UserRole.EMPLOYER] },
      { title: 'Custom Reports', path: '/reports/custom', roles: [UserRole.EMPLOYER] }
    ]
  },
 
  // Employee specific menus
  {
    title: 'My Work',
    icon: <TaskIcon />,
    path: '/my-work',
    roles: [UserRole.EMPLOYEE],
    subItems: [
      { title: 'Assigned Tasks', path: '/my-work/tasks', roles: [UserRole.EMPLOYEE] },
      { title: 'Current Projects', path: '/my-work/projects', roles: [UserRole.EMPLOYEE] },
      { title: 'Upcoming Deadlines', path: '/my-work/deadlines', roles: [UserRole.EMPLOYEE] },
      { title: 'Work Hours', path: '/my-work/hours', roles: [UserRole.EMPLOYEE] }
    ]
  },
  {
    title: 'Team',
    icon: <TeamIcon />,
    path: '/employee-team',
    roles: [UserRole.EMPLOYEE],
    subItems: [
      { title: 'Team Members', path: '/employee-team/members', roles: [UserRole.EMPLOYEE] },
      { title: 'Team Projects', path: '/employee-team/projects', roles: [UserRole.EMPLOYEE] },
      { title: 'Team Discussions', path: '/employee-team/discussions', roles: [UserRole.EMPLOYEE] }
    ]
  },
  {
    title: 'Development',
    icon: <LearningIcon />,
    path: '/development',
    roles: [UserRole.EMPLOYEE],
    subItems: [
      { title: 'Available Training', path: '/development/training', roles: [UserRole.EMPLOYEE] },
      { title: 'Skills to Acquire', path: '/development/skills', roles: [UserRole.EMPLOYEE] },
      { title: 'Certifications', path: '/development/certifications', roles: [UserRole.EMPLOYEE] },
      { title: 'Career Plan', path: '/development/career', roles: [UserRole.EMPLOYEE] }
    ]
  },
  {
    title: 'Performance',
    icon: <PerformanceIcon />,
    path: '/performance',
    roles: [UserRole.EMPLOYEE],
    subItems: [
      { title: 'Objectives', path: '/performance/objectives', roles: [UserRole.EMPLOYEE] },
      { title: 'Evaluations', path: '/performance/evaluations', roles: [UserRole.EMPLOYEE] },
      { title: 'Achievements', path: '/performance/achievements', roles: [UserRole.EMPLOYEE] },
      { title: 'Received Feedback', path: '/performance/feedback', roles: [UserRole.EMPLOYEE] }
    ]
  },
  {
    title: 'Benefits',
    icon: <BenefitsIcon />,
    path: '/benefits',
    roles: [UserRole.EMPLOYEE],
    subItems: [
      { title: 'Leave & Absences', path: '/benefits/leave', roles: [UserRole.EMPLOYEE] },
      { title: 'Social Benefits', path: '/benefits/social', roles: [UserRole.EMPLOYEE] },
      { title: 'Wellness Programs', path: '/benefits/wellness', roles: [UserRole.EMPLOYEE] },
      { title: 'Special Requests', path: '/benefits/requests', roles: [UserRole.EMPLOYEE] }
    ]
  },
 
  // Job Seeker specific menus
  {
    title: 'Job Search',
    icon: <SearchIcon />,
    path: '/job-search',
    roles: [UserRole.JOB_SEEKER],
    subItems: [
      { title: 'Recommended Jobs', path: '/job-search/recommended', roles: [UserRole.JOB_SEEKER] },
      { title: 'Advanced Search', path: '/job-search/advanced', roles: [UserRole.JOB_SEEKER] },
      { title: 'Saved Jobs', path: '/job-search/saved', roles: [UserRole.JOB_SEEKER] },
      { title: 'Application History', path: '/job-search/history', roles: [UserRole.JOB_SEEKER] }
    ]
  },
  {
    title: 'My Portfolio',
    icon: <PortfolioIcon />,
    path: '/portfolio',
    roles: [UserRole.JOB_SEEKER],
    subItems: [
      { title: 'Resume & Cover Letters', path: '/portfolio/resume', roles: [UserRole.JOB_SEEKER] },
      { title: 'Skills', path: '/portfolio/skills', roles: [UserRole.JOB_SEEKER] },
      { title: 'Achievements', path: '/portfolio/achievements', roles: [UserRole.JOB_SEEKER] },
      { title: 'References', path: '/portfolio/references', roles: [UserRole.JOB_SEEKER] }
    ]
  },
  {
    title: 'Network',
    icon: <NetworkIcon />,
    path: '/network',
    roles: [UserRole.JOB_SEEKER],
    subItems: [
      { title: 'Professional Contacts', path: '/network/contacts', roles: [UserRole.JOB_SEEKER] },
      { title: 'Followed Companies', path: '/network/companies', roles: [UserRole.JOB_SEEKER] },
      { title: 'Recommendations', path: '/network/recommendations', roles: [UserRole.JOB_SEEKER] },
      { title: 'Networking Events', path: '/network/events', roles: [UserRole.JOB_SEEKER] }
    ]
  },
  {
    title: 'Learning',
    icon: <LearningIcon />,
    path: '/learning',
    roles: [UserRole.JOB_SEEKER],
    subItems: [
      { title: 'Recommended Training', path: '/learning/recommended', roles: [UserRole.JOB_SEEKER] },
      { title: 'Certifications', path: '/learning/certifications', roles: [UserRole.JOB_SEEKER] },
      { title: 'Tutorials', path: '/learning/tutorials', roles: [UserRole.JOB_SEEKER] },
      { title: 'Development Resources', path: '/learning/resources', roles: [UserRole.JOB_SEEKER] }
    ]
  },
  {
    title: 'Interviews',
    icon: <InterviewIcon />,
    path: '/interviews',
    roles: [UserRole.JOB_SEEKER],
    subItems: [
      { title: 'Upcoming Interviews', path: '/interviews/upcoming', roles: [UserRole.JOB_SEEKER] },
      { title: 'Interview Preparation', path: '/interviews/preparation', roles: [UserRole.JOB_SEEKER] },
      { title: 'Received Feedback', path: '/interviews/feedback', roles: [UserRole.JOB_SEEKER] },
      { title: 'Interview History', path: '/interviews/history', roles: [UserRole.JOB_SEEKER] }
    ]
  }
];
