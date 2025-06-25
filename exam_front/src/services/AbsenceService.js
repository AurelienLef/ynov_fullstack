import axios from 'axios';

const API_URL = 'http://localhost:8080';

const AbsenceService = {
  getAllAbsences: async () => {
    try {
      const response = await axios.get(`${API_URL}/absences`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des absences:', error);
      throw error;
    }
  },

  getAbsenceById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/absences/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'absence ${id}:`, error);
      throw error;
    }
  },

  getAbsencesByEmployeId: async (employeId) => {
    try {
      const response = await axios.get(`${API_URL}/employes/${employeId}`);
      return response.data.absences || [];
    } catch (error) {
      console.error(`Erreur lors de la récupération des absences de l'employé ${employeId}:`, error);
      throw error;
    }
  },

  createAbsence: async (absenceData) => {
    try {
      const response = await axios.post(`${API_URL}/absences`, absenceData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de l\'absence:', error);
      throw error;
    }
  },

  updateAbsence: async (id, absenceData) => {
    try {
      const response = await axios.put(`${API_URL}/absences/${id}`, absenceData);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de l'absence ${id}:`, error);
      throw error;
    }
  },

  deleteAbsence: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/absences/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression de l'absence ${id}:`, error);
      throw error;
    }
  }
};

export default AbsenceService;
