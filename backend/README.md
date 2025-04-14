

# 📋 Tasks API Documentation

**Date:** April 14, 2025

**Version:** 1.0

## 🔍 Overview

The **Tasks API** is a RESTful service designed for managing tasks, subtasks, and categories in the  **Time Tracking Application** . It supports full CRUD operations, filtering, and status toggling for efficient task management.

---

## 🔐 Authentication

All endpoints require **JWT (JSON Web Token)** authentication. Include the token in the `Authorization` header like this:

```
Authorization: Bearer <your_token>
```

To obtain a token, authenticate via the following endpoint:

```
POST /api/auth/login/
```

---

## 🌐 Base URL

```
http://localhost:8000/api/
```

---

## 📁 Endpoints

### ✅ Tasks

| Method | Endpoint                           | Description             |
| ------ | ---------------------------------- | ----------------------- |
| GET    | `/tasks/`                        | List all tasks          |
| GET    | `/tasks/?status=active`          | Filter active tasks     |
| GET    | `/tasks/?status=completed`       | Filter completed tasks  |
| GET    | `/tasks/?category=Homework`      | Filter by category      |
| GET    | `/tasks/?priority=high`          | Filter by priority      |
| GET    | `/tasks/<id>/`                   | Retrieve a task         |
| POST   | `/create-task/`                  | Create a new task       |
| PUT    | `/tasks/<id>/`                   | Update a task           |
| PATCH  | `/tasks/<id>/`                   | Partially update a task |
| DELETE | `/tasks/<id>/`                   | Delete a task           |
| PATCH  | `/tasks/<id>/toggle_completion/` | Toggle task completion  |
| GET    | `/tasks/<id>/subtasks/`          | List subtasks of a task |
| POST   | `/tasks/<id>/subtasks/`          | Create a subtask        |

---

### 🧩 Subtasks

| Method | Endpoint                              | Description                |
| ------ | ------------------------------------- | -------------------------- |
| GET    | `/subtasks/`                        | List all subtasks          |
| GET    | `/subtasks/<id>/`                   | Retrieve a subtask         |
| POST   | `/subtasks/`                        | Create a subtask           |
| PUT    | `/subtasks/<id>/`                   | Update a subtask           |
| PATCH  | `/subtasks/<id>/`                   | Partially update a subtask |
| DELETE | `/subtasks/<id>/`                   | Delete a subtask           |
| PATCH  | `/subtasks/<id>/toggle_completion/` | Toggle completion status   |

---

### 🗂️ Categories

| Method | Endpoint              | Description         |
| ------ | --------------------- | ------------------- |
| GET    | `/categories/`      | List all categories |
| GET    | `/categories/<id>/` | Retrieve a category |
| POST   | `/categories/`      | Create a category   |
| PUT    | `/categories/<id>/` | Update a category   |
| DELETE | `/categories/<id>/` | Delete a category   |

---

## 📨 Request & Response Examples

### ➕ Creating a Task

**Request**

```http
POST /api/create-task/
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "title": "Complete Math Assignment",
  "description": "Solve problems 1-20 from Chapter 5",
  "due_date": "2025-04-20",
  "priority": "high",
  "category": "Homework",
  "completed": false
}
```

**Response**

```json
{
  "id": 1,
  "title": "Complete Math Assignment",
  "description": "Solve problems 1-20 from Chapter 5",
  "due_date": "2025-04-20",
  "priority": "high",
  "category": 1,
  "category_name": "Homework",
  "completed": false,
  "reminder": null,
  "tags": [],
  "subtasks": [],
  "created_at": "2025-04-14T17:30:00Z",
  "updated_at": "2025-04-14T17:30:00Z"
}
```

---

### 📋 Listing Tasks

**Request**

```
GET /api/tasks/
Authorization: Bearer <your_token>
```

**Response**

```json
[
  {
    "id": 1,
    "title": "Complete Math Assignment",
    "subtasks": [
      { "id": 1, "title": "Problems 1-10", "completed": true },
      { "id": 2, "title": "Problems 11-20", "completed": false }
    ],
    ...
  },
  ...
]
```

---

### 🔄 Toggling Task Completion

**Request**

```
PATCH /api/tasks/1/toggle_completion/
Authorization: Bearer <your_token>
```

**Response**

```json
{ "status": "task completion toggled" }
```

---

## 🧬 Data Models

### 📌 Task

| Field         | Type     | Description                     |
| ------------- | -------- | ------------------------------- |
| id            | Integer  | Unique identifier               |
| title         | String   | Task title                      |
| description   | String   | Task description                |
| due_date      | Date     | Due date (YYYY-MM-DD)           |
| priority      | String   | `high`,`medium`, or `low` |
| category      | Integer  | Category ID                     |
| category_name | String   | Category name (read-only)       |
| completed     | Boolean  | Completion status               |
| reminder      | DateTime | Optional reminder               |
| tags          | Array    | Optional tags                   |
| subtasks      | Array    | List of subtasks                |
| created_at    | DateTime | Creation timestamp              |
| updated_at    | DateTime | Last update timestamp           |

### 📌 Subtask

| Field     | Type    | Description       |
| --------- | ------- | ----------------- |
| id        | Integer | Unique identifier |
| title     | String  | Subtask title     |
| completed | Boolean | Completion status |
| task      | Integer | Parent task ID    |

### 📌 Category

| Field | Type    | Description       |
| ----- | ------- | ----------------- |
| id    | Integer | Unique identifier |
| name  | String  | Category name     |

---

## ❗ Error Handling

Standard HTTP status codes are used:

* `200 OK` – Request successful
* `201 Created` – Resource created
* `400 Bad Request`
* `401 Unauthorized`
* `403 Forbidden`
* `404 Not Found`
* `405 Method Not Allowed`
* `500 Internal Server Error`

**Error response format:**

```json
{
  "error": "Error message",
  "detail": "Detailed explanation"
}
```

---

## 🌍 CORS Support

CORS is enabled for the following origins:

* `http://localhost:5173` (development frontend)

---

## 🚦 Rate Limiting

* **Authenticated users** : 100 requests/minute
* **Unauthenticated users** : 20 requests/minute

---

## 📝 Notes

* All timestamps follow  **ISO 8601 UTC format** .
* Default pagination returns  **10 items per page** .
* Multiple filters can be combined (e.g., `?status=active&priority=high`).
* For questions, please contact the development team.
