# Time Tracking Module

This module provides comprehensive time tracking functionality for the Time Management System.

## Features

- Project-based time tracking
- Task-based time tracking
- Timer functionality (start/stop)
- Manual time entry
- Time reports and summaries
- Billable/non-billable time tracking
- Project budgeting
- Task estimation

## Models

### Project

Projects represent client work or internal initiatives that users can track time against.

**Fields:**
- `name`: Project name
- `description`: Project description
- `client`: Client name
- `is_active`: Project status
- `manager`: Project manager
- `members`: Team members assigned to the project
- `budget_hours`: Total budgeted hours for the project

### Task

Tasks are specific work items within a project.

**Fields:**
- `project`: Associated project
- `name`: Task name
- `description`: Task description
- `is_completed`: Task completion status
- `assignees`: Users assigned to the task
- `estimated_hours`: Estimated hours to complete
- `due_date`: Task deadline

### TimeEntry

Time entries record the actual time spent by users on projects and tasks.

**Fields:**
- `user`: User who logged the time
- `project`: Associated project
- `task`: Associated task (optional)
- `description`: Description of work performed
- `start_time`: When the work started
- `end_time`: When the work ended
- `is_running`: Whether the timer is currently running
- `manual_duration`: Manual duration (for entries without start/end time)
- `is_billable`: Whether the time is billable to the client

### TimeTrackingSettings

User-specific settings for time tracking.

**Fields:**
- `user`: Associated user
- `work_hours_per_day`: Standard work hours per day
- `work_days_per_week`: Standard work days per week
- `reminder_enabled`: Whether reminders are enabled
- `reminder_time`: Time to send daily reminders
- `overtime_threshold_daily`: Daily hours threshold for overtime alerts
- `overtime_threshold_weekly`: Weekly hours threshold for overtime alerts

## API Endpoints

### Projects

- `GET /api/timetracking/projects/` - List all projects (filtered by user permissions)
- `POST /api/timetracking/projects/` - Create a new project
- `GET /api/timetracking/projects/{id}/` - Get project details
- `PUT /api/timetracking/projects/{id}/` - Update a project
- `DELETE /api/timetracking/projects/{id}/` - Delete a project
- `GET /api/timetracking/projects/{id}/tasks/` - List tasks for a project
- `GET /api/timetracking/projects/{id}/time_entries/` - List time entries for a project

### Tasks

- `GET /api/timetracking/tasks/` - List all tasks (filtered by user permissions)
- `POST /api/timetracking/tasks/` - Create a new task
- `GET /api/timetracking/tasks/{id}/` - Get task details
- `PUT /api/timetracking/tasks/{id}/` - Update a task
- `DELETE /api/timetracking/tasks/{id}/` - Delete a task
- `GET /api/timetracking/tasks/{id}/time_entries/` - List time entries for a task

### Time Entries

- `GET /api/timetracking/entries/` - List all time entries (filtered by user permissions)
- `POST /api/timetracking/entries/` - Create a new time entry
- `GET /api/timetracking/entries/{id}/` - Get time entry details
- `PUT /api/timetracking/entries/{id}/` - Update a time entry
- `DELETE /api/timetracking/entries/{id}/` - Delete a time entry
- `POST /api/timetracking/entries/start_timer/` - Start a new timer
- `POST /api/timetracking/entries/{id}/stop_timer/` - Stop a running timer
- `GET /api/timetracking/entries/current/` - Get the current running timer

### Time Tracking Settings

- `GET /api/timetracking/settings/` - Get user's time tracking settings
- `PUT /api/timetracking/settings/{id}/` - Update time tracking settings

### Time Summary Reports

- `POST /api/timetracking/summary/` - Generate time summary reports

## Permissions

The module implements custom permissions to ensure users can only access data they're authorized to see:

- **IsProjectMemberOrAdmin**: Allows project members, project managers, or admins to access project data
- **IsTimeEntryOwnerOrAdmin**: Allows time entry owners, their managers, project managers, or admins to access time entry data

## Filtering Options

Time entries can be filtered by:
- Date range (start_date, end_date)
- User
- Project
- Task
- Billable status
- Duration (min_duration, max_duration)
- Running status

## Summary Reports

The summary endpoint allows generating reports grouped by:
- Day
- Week
- Month
- Project
- Task
- User

## Usage Examples

### Starting a Timer

```
POST /api/timetracking/entries/start_timer/
{
    "project": 1,
    "task": 2,
    "description": "Working on feature X",
    "is_billable": true
}
```

### Stopping a Timer

```
POST /api/timetracking/entries/5/stop_timer/
```

### Creating a Manual Time Entry

```
POST /api/timetracking/entries/
{
    "project": 1,
    "task": 2,
    "description": "Meeting with client",
    "start_time": "2023-05-10T09:00:00Z",
    "end_time": "2023-05-10T10:30:00Z",
    "is_billable": true
}
```

### Generating a Weekly Summary Report

```
POST /api/timetracking/summary/
{
    "start_date": "2023-05-01",
    "end_date": "2023-05-07",
    "group_by": "day",
    "project_id": 1
}
```
