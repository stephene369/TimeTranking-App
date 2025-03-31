# Time Tracking Application

A comprehensive time management and task tracking application designed for students to optimize their academic productivity.

## Overview

This application helps students track their study time, manage academic tasks, and analyze their productivity patterns through an intuitive interface built with React and Ant Design.

## Routes and Views

### Dashboard (`/`)
The main landing page after login that provides an overview of:
- Daily and weekly time statistics
- Upcoming tasks and deadlines
- Productivity trends
- Quick access to main features

### Time Tracker (`/time-tracker`)
A dedicated page for tracking time spent on various activities:
- Real-time timer with start/stop/pause functionality
- Activity categorization (Academic, Reading, Research, etc.)
- Manual time entry option
- Historical time entries in list and calendar views
- Filtering by date and category
- Time analytics by category

### Tasks (`/tasks`)
A comprehensive task management system:
- Create, edit, and delete academic tasks
- Assign priorities (High, Medium, Low)
- Categorize tasks (Homework, Reading, Study, Project, Exam)
- Set due dates and reminders
- Add subtasks for complex assignments
- Multiple views (list, grid, calendar)
- Filter by status, category, and priority

### Resources (`/resources`)
A collection of study resources and tools:
- Study materials organized by subject
- Useful links and references
- Productivity techniques and tips
- Downloadable templates and guides
- Community-shared resources

### Settings (`/settings`)
User preferences and application configuration:
- Profile management
- Customization of categories and tags
- Notification preferences
- Theme and display settings
- Data import/export options
- Account security settings

## Features

- **Real-time Time Tracking**: Monitor study sessions as they happen
- **Comprehensive Task Management**: Organize all academic responsibilities
- **Visual Analytics**: Understand productivity patterns through charts and graphs
- **Calendar Integration**: View all activities and deadlines in calendar format
- **Customizable Categories**: Tailor the app to specific academic needs
- **Progress Monitoring**: Track completion of tasks and study goals
- **Responsive Design**: Access from any device with a consistent experience

## Technical Stack

- **Frontend Framework**: React with Vite
- **UI Components**: Ant Design
- **Routing**: React Router
- **State Management**: React Context API
- **Date Handling**: Day.js
- **Charts**: Chart.js with React-ChartJS-2

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/time-tracking-app.git

# Navigate to project directory
cd time-tracking-app

# Install dependencies
npm install react react-dom react-router-dom antd @ant-design/icons dayjs chart.js react-chartjs-2 uuid

# Start development server
npm run dev
```

## Future Enhancements

- Mobile application for on-the-go time tracking
- Integration with academic calendars (Google Calendar, Outlook)
- AI-powered productivity suggestions
- Collaboration features for group projects
- Gamification elements to encourage consistent study habits
