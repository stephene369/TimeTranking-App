import api from './api';
import dayjs from 'dayjs';


const taskService = {
    // Get all tasks with optional filters
    getTasks: async (filters = {}) => {
        const params = new URLSearchParams();

        if (filters.status) params.append('status', filters.status);
        if (filters.category) params.append('category', filters.category);
        if (filters.priority) params.append('priority', filters.priority);

        try {
            const response = await api.get(`/tasks/?${params.toString()}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching tasks:', error);
            throw error;
        }
    },

    // Get a single task by ID
    getTask: async (id) => {
        try {
            const response = await api.get(`/tasks/${id}/`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching task ${id}:`, error);
            throw error;
        }
    },

    // In taskService.js
    createTask: async (taskData) => {
        try {
            // console.log('Original task data:', taskData);

            // Format data according to server model
            const formattedData = {
                title: taskData.title,
                description: taskData.description || "",
                due_date: taskData.dueDate ? dayjs(taskData.dueDate).format('YYYY-MM-DD') : null,
                priority: taskData.priority || "medium",
                category: taskData.category, // Make sure this is the category ID if needed
                completed: taskData.completed || false,
                reminder: taskData.reminder ? dayjs(taskData.reminder).format('YYYY-MM-DD HH:mm:ss') : null,
                tags: taskData.tags || [],
                // Do not include id, subtasks, created_at, updated_at as they are managed by the backend
                // Do not include category_name as it is probably a computed field on the server side
            };

            console.log('Formatted data to send:', formattedData);

            // Send request without trailing slash to avoid potential issues
            const response = await api.post('/tasks/', formattedData);
            return response.data;
        } catch (error) {
            console.error('Error creating task:', error);
            throw error;
        }
    }

    ,

    // Update an existing task
    updateTask: async (id, taskData) => {
        try {
            const response = await api.put(`/tasks/${id}/`, taskData);
            return response.data;
        } catch (error) {
            console.error(`Error updating task ${id}:`, error);
            throw error;
        }
    },

    // Delete a task
    deleteTask: async (id) => {
        try {
            await api.delete(`/tasks/${id}/`);
            return true;
        } catch (error) {
            console.error(`Error deleting task ${id}:`, error);
            throw error;
        }
    },

    // Toggle task completion
    toggleTaskCompletion: async (id) => {
        try {
            const response = await api.patch(`/tasks/${id}/toggle_completion/`);
            return response.data;
        } catch (error) {
            console.error(`Error toggling task ${id} completion:`, error);
            throw error;
        }
    },

    // Get all subtasks for a task
    getSubtasks: async (taskId) => {
        try {
            const response = await api.get(`/tasks/${taskId}/subtasks/`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching subtasks for task ${taskId}:`, error);
            throw error;
        }
    },

    // Create a subtask
    createSubtask: async (taskId, subtaskData) => {
        try {
            const response = await api.post(`/tasks/${taskId}/subtasks/`, subtaskData);
            return response.data;
        } catch (error) {
            console.error(`Error creating subtask for task ${taskId}:`, error);
            throw error;
        }
    },

    // Update a subtask
    updateSubtask: async (id, subtaskData) => {
        try {
            const response = await api.put(`/subtasks/${id}/`, subtaskData);
            return response.data;
        } catch (error) {
            console.error(`Error updating subtask ${id}:`, error);
            throw error;
        }
    },

    // Delete a subtask
    deleteSubtask: async (id) => {
        try {
            await api.delete(`/subtasks/${id}/`);
            return true;
        } catch (error) {
            console.error(`Error deleting subtask ${id}:`, error);
            throw error;
        }
    },

    // Toggle subtask completion
    toggleSubtaskCompletion: async (id) => {
        try {
            const response = await api.patch(`/subtasks/${id}/toggle_completion/`);
            return response.data;
        } catch (error) {
            console.error(`Error toggling subtask ${id} completion:`, error);
            throw error;
        }
    },

    // Get all categories
    getCategories: async () => {
        try {
            // Temporarily return static categories instead of calling the API
            return [
                { id: 1, name: 'Homework', color: 'blue' },
                { id: 2, name: 'Reading', color: 'green' },
                { id: 3, name: 'Study', color: 'purple' },
                { id: 4, name: 'Project', color: 'orange' },
                { id: 5, name: 'Exam', color: 'red' },
                { id: 6, name: 'Other', color: 'gray' }
            ];

            // Temporarily comment out API call
            // const response = await api.get('/categories/');
            // return response.data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            // In case of error, still return default categories
            return [
                { id: 1, name: 'Homework', color: 'blue' },
                { id: 2, name: 'Reading', color: 'green' },
                { id: 3, name: 'Study', color: 'purple' },
                { id: 4, name: 'Project', color: 'orange' },
                { id: 5, name: 'Exam', color: 'red' },
                { id: 6, name: 'Other', color: 'gray' }
            ];
        }
    }
};

export default taskService;