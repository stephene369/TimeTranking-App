import api from './api';

const timeEntryService = {
  // Récupérer toutes les entrées de temps
  getAllEntries: async () => {
    try {
      const response = await api.get('/time-entries');
      return response.data;
    } catch (error) {
      console.error('Error fetching time entries:', error);
      throw error;
    }
  },
  
  // Récupérer les entrées de temps par date
  getEntriesByDateRange: async (startDate, endDate) => {
    try {
      const response = await api.get('/time-entries', {
        params: { startDate, endDate }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching time entries by date range:', error);
      throw error;
    }
  },
  
  // Ajouter une nouvelle entrée de temps
  addEntry: async (entry) => {
    try {
      const response = await api.post('/time-entries', entry);
      return response.data;
    } catch (error) {
      console.error('Error adding time entry:', error);
      throw error;
    }
  },
  
  // Mettre à jour une entrée de temps
  updateEntry: async (id, entry) => {
    try {
      const response = await api.put(`/time-entries/${id}`, entry);
      return response.data;
    } catch (error) {
      console.error('Error updating time entry:', error);
      throw error;
    }
  },
  
  // Supprimer une entrée de temps
  deleteEntry: async (id) => {
    try {
      const response = await api.delete(`/time-entries/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting time entry:', error);
      throw error;
    }
  },
  
  // Récupérer les statistiques de temps
  getTimeStatistics: async (period = 'week') => {
    try {
      const response = await api.get('/time-entries/statistics', {
        params: { period }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching time statistics:', error);
      throw error;
    }
  }
};

export default timeEntryService;