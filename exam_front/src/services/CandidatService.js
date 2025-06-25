import axios from 'axios';

const API_URL = 'http://localhost:8080';

const CandidatService = {
  getAllCandidats: async () => {
    try {
      const response = await axios.get(`${API_URL}/candidats`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des candidats:', error);
      throw error;
    }
  },

  getCandidatById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/candidats/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du candidat ${id}:`, error);
      throw error;
    }
  },

  createCandidat: async (candidatData) => {
    try {
      const response = await axios.post(`${API_URL}/candidats`, candidatData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création du candidat:', error);
      throw error;
    }
  },

  updateCandidat: async (id, candidatData) => {
    try {
      console.log(`Mise à jour du candidat ID: ${id}`);
      console.log('Données envoyées:', candidatData);
      const response = await axios.put(`${API_URL}/candidats/${id}`, candidatData);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du candidat ${id}:`, error);
      throw error;
    }
  },

  deleteCandidat: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/candidats/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression du candidat ${id}:`, error);
      throw error;
    }
  }
};

export default CandidatService;
