import { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { message } from 'antd';

const useTimer = () => {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerActivity, setTimerActivity] = useState('');
  const [timerCategory, setTimerCategory] = useState('Academic');
  const [timerStartTime, setTimerStartTime] = useState(null);
  const [timerElapsed, setTimerElapsed] = useState(0);
  const [timeEntries, setTimeEntries] = useState([]);
  const timerIntervalRef = useRef(null);
  
  // Charger les données depuis localStorage au démarrage
  useEffect(() => {
    const savedTimer = JSON.parse(localStorage.getItem('timer'));
    const savedEntries = JSON.parse(localStorage.getItem('timeEntries'));
    
    if (savedTimer) {
      setIsTimerRunning(savedTimer.isRunning);
      setTimerActivity(savedTimer.activity);
      setTimerCategory(savedTimer.category);
      
      if (savedTimer.isRunning && savedTimer.startTime) {
        const startTime = dayjs(savedTimer.startTime);
        setTimerStartTime(startTime);
        
        // Calculer le temps écoulé depuis le démarrage
        const elapsedSeconds = dayjs().diff(startTime, 'second');
        setTimerElapsed(elapsedSeconds);
        
        // Redémarrer le timer
        startTimerInterval();
      }
    }
    
    if (savedEntries) {
      setTimeEntries(savedEntries);
    }
  }, []);
  
  // Sauvegarder l'état du timer dans localStorage
  useEffect(() => {
    if (isTimerRunning) {
      localStorage.setItem('timer', JSON.stringify({
        isRunning: isTimerRunning,
        activity: timerActivity,
        category: timerCategory,
        startTime: timerStartTime ? timerStartTime.toISOString() : null
      }));
    } else {
      localStorage.removeItem('timer');
    }
  }, [isTimerRunning, timerActivity, timerCategory, timerStartTime]);
  
  // Sauvegarder les entrées de temps
  useEffect(() => {
    localStorage.setItem('timeEntries', JSON.stringify(timeEntries));
  }, [timeEntries]);
  
  // Fonction pour démarrer l'intervalle du timer
  const startTimerInterval = () => {
    clearInterval(timerIntervalRef.current);
    
    timerIntervalRef.current = setInterval(() => {
      setTimerElapsed(prevElapsed => prevElapsed + 1);
    }, 1000);
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
  const stopTimer = () => {
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
      id: Date.now(),
      activity: timerActivity,
      category: timerCategory,
      date: now.format('YYYY-MM-DD'),
      startTime,
      endTime,
      duration: durationStr,
      notes: '',
    };
    
    setTimeEntries([newEntry, ...timeEntries]);
    setTimerActivity('');
    setTimerCategory('Academic');
    setTimerElapsed(0);
    setTimerStartTime(null);
    
    message.success('Time entry saved successfully!');
    
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
  const addTimeEntry = (entry) => {
    const newEntries = [entry, ...timeEntries];
    setTimeEntries(newEntries);
    message.success('Time entry added successfully!');
  };
  
  // Mettre à jour une entrée de temps
  const updateTimeEntry = (updatedEntry) => {
    const updatedEntries = timeEntries.map(entry => 
      entry.id === updatedEntry.id ? updatedEntry : entry
    );
    setTimeEntries(updatedEntries);
    message.success('Time entry updated successfully!');
  };
  
  // Supprimer une entrée de temps
  const deleteTimeEntry = (id) => {
    const updatedEntries = timeEntries.filter(entry => entry.id !== id);
    setTimeEntries(updatedEntries);
    message.success('Time entry deleted successfully!');
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
  
  // Nettoyer l'intervalle lors du démontage
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);
  
  return {
    isTimerRunning,
    timerActivity,
    timerCategory,
    timerStartTime,
    timerElapsed,
    timeEntries,
    setTimerActivity,
    setTimerCategory,
    startTimer,
    stopTimer,
    formatTimer,
    addTimeEntry,
    updateTimeEntry,
    deleteTimeEntry,
    calculateTotalHours
  };
};

export default useTimer;