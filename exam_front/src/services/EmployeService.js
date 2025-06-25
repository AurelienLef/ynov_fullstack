import axios from 'axios';

const API_URL = 'http://localhost:8080';

const EmployeService = {
  getAllEmployes: async () => {
    try {
      const response = await axios.get(`${API_URL}/employes`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des employés:', error);
      throw error;
    }
  },

  getEmployeById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/employes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'employé ${id}:`, error);
      throw error;
    }
  },

  createEmploye: async (employeData) => {
    try {
      const response = await axios.post(`${API_URL}/employes`, employeData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de l\'employé:', error);
      throw error;
    }
  },

  updateEmploye: async (id, employeData) => {
    try {
      const response = await axios.put(`${API_URL}/employes/${id}`, employeData);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de l'employé ${id}:`, error);
      throw error;
    }
  },

  deleteEmploye: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/employes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression de l'employé ${id}:`, error);
      throw error;
    }
  }
};

export default EmployeService;
