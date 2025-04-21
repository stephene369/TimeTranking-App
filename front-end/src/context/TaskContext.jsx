import React, { createContext, useContext, useState, useEffect } from 'react';
import { message } from 'antd';
import dayjs from 'dayjs';

// Données initiales pour les tâches
import { initialTasks } from '../data/tasksData';

// Créer le contexte
const TaskContext = createContext(null);

// Hook personnalisé pour utiliser le contexte
export function useTask() {
  const context = useContext(TaskContext);
  if (context === null) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Charger les tâches depuis localStorage ou utiliser les données initiales
  useEffect(() => {
    try {
      setLoading(true);
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      } else {
        setTasks(initialTasks);
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
      setError('Failed to load tasks');
      setTasks(initialTasks);
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Sauvegarder les tâches dans localStorage quand elles changent
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);
  
  // Ajouter une tâche
  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now(),
      completed: false,
    };
    setTasks([newTask, ...tasks]);
    message.success('Task added successfully!');
  };
  
  // Mettre à jour une tâche
  const updateTask = (updatedTask) => {
    const updatedTasks = tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    message.success('Task updated successfully!');
  };
  
  // Supprimer une tâche
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    message.success('Task deleted successfully!');
  };
  
  // Basculer l'état d'achèvement d'une tâche
  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };
  
  // Filtrer les tâches
  const filterTasks = (status, category, priority) => {
    return tasks.filter(task => {
      let matchesStatus = true;
      let matchesCategory = true;
      let matchesPriority = true;
      
      if (status === 'completed') {
        matchesStatus = task.completed;
      } else if (status === 'active') {
        matchesStatus = !task.completed;
      }
      
      if (category) {
        matchesCategory = task.category === category;
      }
      
      if (priority) {
        matchesPriority = task.priority === priority;
      }
      
      return matchesStatus && matchesCategory && matchesPriority;
    });
  };
  
  // Calculer les statistiques des tâches
  const calculateTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const active = total - completed;
    const dueToday = tasks.filter(task => 
      !task.completed && task.dueDate === dayjs().format('YYYY-MM-DD')
    ).length;
    const overdue = tasks.filter(task => 
      !task.completed && task.dueDate && dayjs(task.dueDate).isBefore(dayjs(), 'day')
    ).length;
    
    return { total, completed, active, dueToday, overdue };
  };
  
  // Calculer le pourcentage d'achèvement
  const calculateCompletionPercentage = () => {
    const { total, completed } = calculateTaskStats();
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };
  
  // Valeur du contexte
  const value = {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    filterTasks,
    calculateTaskStats,
    calculateCompletionPercentage,
  };
  
  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}

export default TaskProvider;