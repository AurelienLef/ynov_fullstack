import axios from 'axios';

const API_URL = 'http://localhost:8080';

const CongesService = {
  getAllConges: async () => {
    try {
      const response = await axios.get(`${API_URL}/conges`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des congés:', error);
      throw error;
    }
  },

  getCongesById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/conges/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du congé ${id}:`, error);
      throw error;
    }
  },

  getCongesByEmployeId: async (employeId) => {
    try {
      const response = await axios.get(`${API_URL}/employes/${employeId}`);
      return response.data.conges || [];
    } catch (error) {
      console.error(`Erreur lors de la récupération des congés de l'employé ${employeId}:`, error);
      throw error;
    }
  },

  createConges: async (congesData) => {
    try {
      const response = await axios.post(`${API_URL}/conges`, congesData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création du congé:', error);
      throw error;
    }
  },

  updateConges: async (id, congesData) => {
    try {
      const response = await axios.put(`${API_URL}/conges/${id}`, congesData);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du congé ${id}:`, error);
      throw error;
    }
  },

  deleteConges: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/conges/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression du congé ${id}:`, error);
      throw error;
    }
  }
};

export default CongesService;
