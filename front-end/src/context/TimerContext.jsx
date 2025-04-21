import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { message, notification } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import timeEntryService from '../services/timeEntryService';

// Créer le contexte avec une valeur par défaut
const TimerContext = createContext(null);

// Hook personnalisé pour utiliser le contexte
export function useTimer() {
  const context = useContext(TimerContext);
  if (context === null) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
}

export function TimerProvider({ children }) {
  // États du timer
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerActivity, setTimerActivity] = useState('');
  const [timerCategory, setTimerCategory] = useState('Academic');
  const [timerStartTime, setTimerStartTime] = useState(null);
  const [timerElapsed, setTimerElapsed] = useState(0);
  const [timeEntries, setTimeEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const timerIntervalRef = useRef(null);
  
  // Charger les entrées de temps depuis l'API
  const fetchTimeEntries = async () => {
    try {
      setLoading(true);
      setError(null);
      const entries = await timeEntryService.getAllEntries();
      setTimeEntries(entries);
      localStorage.setItem('timeEntries', JSON.stringify(entries));
    } catch (error) {
      console.error('Error fetching time entries:', error);
      setError('Failed to load time entries. Using local data if available.');
      
      // En cas d'erreur, essayer de charger depuis localStorage
      const savedEntries = JSON.parse(localStorage.getItem('timeEntries') || '[]');
      if (savedEntries.length > 0) {
        setTimeEntries(savedEntries);
      }
    } finally {
      setLoading(false);
    }
  };
  

  // Charger l'état du timer depuis localStorage au démarrage
  useEffect(() => {
    // Charger les entrées de temps
    fetchTimeEntries();
    
    // Charger l'état du timer depuis localStorage
    const savedTimerState = localStorage.getItem('timerState');
    if (savedTimerState) {
      try {
        const parsedState = JSON.parse(savedTimerState);
        
        // Si le timer était en cours d'exécution
        if (parsedState.isRunning) {
          setTimerActivity(parsedState.activity);
          setTimerCategory(parsedState.category);
          
          // Calculer le temps écoulé depuis le démarrage du timer
          const startTime = dayjs(parsedState.startTime);
          const elapsedSeconds = dayjs().diff(startTime, 'second');
          
          setTimerStartTime(startTime);
          setTimerElapsed(elapsedSeconds);
          setIsTimerRunning(true);
          
          // Redémarrer l'intervalle
          startTimerInterval();
        }
      } catch (error) {
        console.error('Error loading timer state:', error);
      }
    }
    
    // Nettoyer l'intervalle lors du démontage
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);
  


  // Sauvegarder l'état du timer dans localStorage chaque fois qu'il change
  useEffect(() => {
    if (isTimerRunning && timerStartTime) {
      const timerState = {
        isRunning: isTimerRunning,
        activity: timerActivity,
        category: timerCategory,
        startTime: timerStartTime.toISOString(),
        elapsed: timerElapsed
      };
      localStorage.setItem('timerState', JSON.stringify(timerState));
    } else if (!isTimerRunning) {
      localStorage.removeItem('timerState');
    }
  }, [isTimerRunning, timerActivity, timerCategory, timerStartTime, timerElapsed]);
  
  // Démarrer le timer
  const startTimer_ = () => {
    if (!timerActivity) {
      message.warning('Please enter an activity name before starting the timer.');
      return;
    }
    
    const now = dayjs();
    setTimerStartTime(now);
    setIsTimerRunning(true);
    setTimerElapsed(0);
    
    startTimerInterval();
  };
  
  // Arrêter le timer et sauvegarder l'entrée
  const stopTimer_ = async () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    
    setIsTimerRunning(false);
    
    const now = dayjs();
    const startTime = timerStartTime.format('HH:mm');
    const endTime = now.format('HH:mm');
    const durationMinutes = now.diff(timerStartTime, 'minute');
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    const durationStr = `${hours}h ${minutes}m`;
    
    const newEntry = {
      activity: timerActivity,
      category: timerCategory,
      date: now.format('YYYY-MM-DD'),
      startTime,
      endTime,
      duration: durationStr,
      notes: '',
    };
    
    try {
      // Sauvegarder dans l'API
      const savedEntry = await timeEntryService.addEntry(newEntry);
      setTimeEntries([savedEntry, ...timeEntries]);
      localStorage.setItem('timeEntries', JSON.stringify([savedEntry, ...timeEntries]));
      message.success('Time entry saved successfully!');
    } catch (error) {
      console.error('Error saving time entry:', error);
      message.error('Failed to save time entry to server. Saved locally.');
      
      // En cas d'erreur, sauvegarder localement
      const localEntry = {
        ...newEntry,
        id: Date.now(),
        _isLocalOnly: true
      };
      
      setTimeEntries([localEntry, ...timeEntries]);
      localStorage.setItem('timeEntries', JSON.stringify([localEntry, ...timeEntries]));
    }
    
    setTimerActivity('');
    setTimerCategory('Academic');
    setTimerElapsed(0);
    setTimerStartTime(null);
    
    // Supprimer l'état du timer de localStorage
    localStorage.removeItem('timerState');
  };

  
  
  // Fonction pour démarrer l'intervalle du timer
  const startTimerInterval = () => {
    // S'assurer que tout intervalle précédent est nettoyé
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    
    timerIntervalRef.current = setInterval(() => {
      setTimerElapsed(prevElapsed => prevElapsed + 1);
    }, 1000);
  };
  
  // Envoyer une notification
  const sendTimerNotification = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    // Afficher une notification
    notification.open({
      message: 'Timer Alert',
      description: `You've been working on "${timerActivity}" for ${hours}h ${minutes}m. Consider taking a break!`,
      icon: <ClockCircleOutlined style={{ color: '#1890ff' }} />,
      duration: 0,
      onClick: () => {
        // Rediriger vers la page du timer si l'utilisateur clique sur la notification
        window.location.href = '/student/time-tracker';
      },
    });
  };
  
  // Démarrer le timer
  const startTimer = () => {
    if (!timerActivity) {
      message.warning('Please enter an activity name before starting the timer.');
      return;
    }
    
    const now = dayjs();
    setTimerStartTime(now);
    setIsTimerRunning(true);
    setTimerElapsed(0);
    
    startTimerInterval();
  };
  
  // Arrêter le timer et sauvegarder l'entrée
  const stopTimer = async () => {
    clearInterval(timerIntervalRef.current);
    setIsTimerRunning(false);
    
    const now = dayjs();
    const startTime = timerStartTime.format('HH:mm');
    const endTime = now.format('HH:mm');
    const durationMinutes = now.diff(timerStartTime, 'minute');
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    const durationStr = `${hours}h ${minutes}m`;
    
    const newEntry = {
      activity: timerActivity,
      category: timerCategory,
      date: now.format('YYYY-MM-DD'),
      startTime,
      endTime,
      duration: durationStr,
      notes: '',
    };
    
    try {
      // Sauvegarder dans l'API
      const savedEntry = await timeEntryService.addEntry(newEntry);
      setTimeEntries([savedEntry, ...timeEntries]);
      
      // Sauvegarder également dans localStorage
      localStorage.setItem('timeEntries', JSON.stringify([savedEntry, ...timeEntries]));
      
      message.success('Time entry saved successfully!');
    } catch (error) {
      console.error('Error saving time entry:', error);
      message.error('Failed to save time entry to server. Saved locally.');
      
      // En cas d'erreur, sauvegarder localement avec un ID temporaire
      const localEntry = {
        ...newEntry,
        id: Date.now(),
        _isLocalOnly: true // Marquer comme local uniquement
      };
      
      setTimeEntries([localEntry, ...timeEntries]);
      localStorage.setItem('timeEntries', JSON.stringify([localEntry, ...timeEntries]));
    }
    
    setTimerActivity('');
    setTimerCategory('Academic');
    setTimerElapsed(0);
    setTimerStartTime(null);
    
    // Supprimer les données du timer de localStorage
    localStorage.removeItem('timer');
  };
  
  // Formater l'affichage du timer
  const formatTimer = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Ajouter une entrée de temps
  const addTimeEntry = async (entry) => {
    try {
      // Sauvegarder dans l'API
      const savedEntry = await timeEntryService.addEntry(entry);
      const newEntries = [savedEntry, ...timeEntries];
      setTimeEntries(newEntries);
      
      // Sauvegarder également dans localStorage
      localStorage.setItem('timeEntries', JSON.stringify(newEntries));
      
      message.success('Time entry added successfully!');
    } catch (error) {
      console.error('Error adding time entry:', error);
      message.error('Failed to add time entry to server. Saved locally.');
      
      // En cas d'erreur, sauvegarder localement avec un ID temporaire
      const localEntry = {
        ...entry,
        id: Date.now(),
        _isLocalOnly: true // Marquer comme local uniquement
      };
      
      const newEntries = [localEntry, ...timeEntries];
      setTimeEntries(newEntries);
      localStorage.setItem('timeEntries', JSON.stringify(newEntries));
    }
  };
  
  // Mettre à jour une entrée de temps
  const updateTimeEntry = async (updatedEntry) => {
    try {
      // Si l'entrée est locale uniquement, ne pas essayer de mettre à jour sur le serveur
      if (updatedEntry._isLocalOnly) {
        const updatedEntries = timeEntries.map(entry => 
          entry.id === updatedEntry.id ? updatedEntry : entry
        );
        setTimeEntries(updatedEntries);
        localStorage.setItem('timeEntries', JSON.stringify(updatedEntries));
        message.success('Time entry updated successfully (local only)!');
        return;
      }
      
      // Mettre à jour sur l'API
      const savedEntry = await timeEntryService.updateEntry(updatedEntry.id, updatedEntry);
      const updatedEntries = timeEntries.map(entry => 
        entry.id === savedEntry.id ? savedEntry : entry
      );
      setTimeEntries(updatedEntries);
      
      // Mettre à jour également dans localStorage
      localStorage.setItem('timeEntries', JSON.stringify(updatedEntries));
      
      message.success('Time entry updated successfully!');
    } catch (error) {
      console.error('Error updating time entry:', error);
      message.error('Failed to update time entry on server. Updated locally.');
      
      // En cas d'erreur, mettre à jour localement
      const updatedEntries = timeEntries.map(entry => 
        entry.id === updatedEntry.id ? updatedEntry : entry
      );
      setTimeEntries(updatedEntries);
      localStorage.setItem('timeEntries', JSON.stringify(updatedEntries));
    }
  };
  
  // Supprimer une entrée de temps
  const deleteTimeEntry = async (id) => {
    try {
      // Vérifier si l'entrée est locale uniquement
      const entryToDelete = timeEntries.find(entry => entry.id === id);
      
      if (entryToDelete._isLocalOnly) {
        const updatedEntries = timeEntries.filter(entry => entry.id !== id);
        setTimeEntries(updatedEntries);
        localStorage.setItem('timeEntries', JSON.stringify(updatedEntries));
        message.success('Time entry deleted successfully (local only)!');
        return;
      }
      
      // Supprimer de l'API
      await timeEntryService.deleteEntry(id);
      const updatedEntries = timeEntries.filter(entry => entry.id !== id);
      setTimeEntries(updatedEntries);
      
      // Mettre à jour également dans localStorage
      localStorage.setItem('timeEntries', JSON.stringify(updatedEntries));
      
      message.success('Time entry deleted successfully!');
    } catch (error) {
      console.error('Error deleting time entry:', error);
      message.error('Failed to delete time entry from server. Deleted locally.');
      
      // En cas d'erreur, supprimer localement
      const updatedEntries = timeEntries.filter(entry => entry.id !== id);
      setTimeEntries(updatedEntries);
      localStorage.setItem('timeEntries', JSON.stringify(updatedEntries));
    }
  };
  
  // Synchroniser les entrées locales avec le serveur
  const syncLocalEntries = async () => {
    const localOnlyEntries = timeEntries.filter(entry => entry._isLocalOnly);
    
    if (localOnlyEntries.length === 0) {
      return;
    }
    
    message.loading('Syncing local entries with server...', 0);
    
    try {
      let syncedCount = 0;
      let updatedEntries = [...timeEntries];
      
      for (const entry of localOnlyEntries) {
        try {
          // Créer une copie sans les propriétés locales
          const { _isLocalOnly, id, ...entryData } = entry;
          
          // Sauvegarder dans l'API
          const savedEntry = await timeEntryService.addEntry(entryData);
          
          // Remplacer l'entrée locale par l'entrée du serveur
          updatedEntries = updatedEntries.filter(e => e.id !== entry.id);
          updatedEntries.push(savedEntry);
          
          syncedCount++;
        } catch (error) {
          console.error('Error syncing entry:', entry, error);
        }
      }
      
      // Mettre à jour l'état et localStorage
      setTimeEntries(updatedEntries);
      localStorage.setItem('timeEntries', JSON.stringify(updatedEntries));
      
      message.destroy();
      message.success(`Synced ${syncedCount} of ${localOnlyEntries.length} local entries with server.`);
    } catch (error) {
      console.error('Error during sync:', error);
      message.destroy();
      message.error('Failed to sync some entries with server.');
    }
  };
  
  // Calculer le total des heures
  const calculateTotalHours = (entries) => {
    let totalMinutes = 0;
    
    entries.forEach(entry => {
      const durationParts = entry.duration.split(' ');
      const hours = parseInt(durationParts[0].replace('h', ''), 10) || 0;
      const minutes = parseInt(durationParts[1].replace('m', ''), 10) || 0;
      
      totalMinutes += (hours * 60) + minutes;
    });
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    return `${hours}h ${minutes}m`;
  };
  
  // Calculer les heures par catégorie
  const calculateHoursByCategory = (entries) => {
    const categoryHours = {};
    
    entries.forEach(entry => {
      const durationParts = entry.duration.split(' ');
      const hours = parseInt(durationParts[0].replace('h', ''), 10) || 0;
      const minutes = parseInt(durationParts[1].replace('m', ''), 10) || 0;
      const totalMinutes = (hours * 60) + minutes;
      
      if (!categoryHours[entry.category]) {
        categoryHours[entry.category] = 0;
      }
      
      categoryHours[entry.category] += totalMinutes;
    });
    
    return Object.keys(categoryHours).map(category => {
      const totalMinutes = categoryHours[category];
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      
      return {
        category,
        duration: `${hours}h ${minutes}m`,
        minutes: totalMinutes,
      };
    }).sort((a, b) => b.minutes - a.minutes);
  };
  
  // Rafraîchir les entrées depuis l'API
  const refreshEntries = () => {
    fetchTimeEntries();
  };
  
  // Valeur du contexte
  const value = {
    isTimerRunning,
    timerActivity,
    timerCategory,
    timerStartTime,
    timerElapsed,
    timeEntries,
    loading,
    error,
    setTimerActivity,
    setTimerCategory,
    startTimer,
    stopTimer,
    formatTimer,
    addTimeEntry,
    updateTimeEntry,
    deleteTimeEntry,
    calculateTotalHours,
    calculateHoursByCategory,
    syncLocalEntries,
    refreshEntries
  };
  
  return (
    <TimerContext.Provider value={value}>
      {children}
    </TimerContext.Provider>
  );
}

export default TimerProvider;
