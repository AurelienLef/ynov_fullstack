import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeService from '../services/EmployeService';
import '../components/CandidatList.css';

function Employes() {
  const navigate = useNavigate();
  const [employes, setEmployes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmployes();
  }, []);

  const fetchEmployes = async () => {
    setLoading(true);
    try {
      const data = await EmployeService.getAllEmployes();
      setEmployes(data);
      setError(null);
    } catch (err) {
      console.error("Erreur lors du chargement des employés:", err);
      setError("Impossible de charger les employés. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

  const goToAddEmploye = () => {
    navigate('/employes/new');
  };

  const goToViewEmploye = (id) => {
    navigate(`/employes/view/${id}`);
  };

  const goToEditEmploye = (id) => {
    navigate(`/employes/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await EmployeService.deleteEmploye(id);
      fetchEmployes();
    } catch (err) {
      console.error("Erreur lors de la suppression:", err);
      setError("Erreur lors de la suppression de l'employé.");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <div className="candidats-container">
      <div className="candidats-header">
        <h1>Gestion des Employés</h1>
        <button className="add-candidat-btn" onClick={goToAddEmploye}>
          <span className="icon">+</span>
          Ajouter un employé
        </button>
      </div>

      {loading ? (
        <div className="loading-state">
          <p>Chargement des employés...</p>
        </div>
      ) : error ? (
        <div className="error-state">
          <p>{error}</p>
        </div>
      ) : employes.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <p>Aucun employé trouvé. Ajoutez-en un nouveau !</p>
        </div>
      ) : (
        <div className="candidats-table-container">
          <table className="candidats-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Poste</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employes.map(employe => (
                <tr key={employe.id}>
                  <td>{employe.nom}</td>
                  <td>{employe.email}</td>
                  <td>{employe.tel}</td>
                  <td>{employe.poste}</td>
                  <td>
                    <div className="action-column">
                      <button 
                        className="action-btn view-btn" 
                        onClick={() => goToViewEmploye(employe.id)}
                        title="Voir les détails"
                      >
                        👁️
                      </button>
                      <button 
                        className="action-btn edit-btn" 
                        onClick={() => goToEditEmploye(employe.id)}
                        title="Modifier"
                      >
                        ✏️
                      </button>
                      <button 
                        className="action-btn delete-btn" 
                        onClick={() => handleDelete(employe.id)}
                        title="Supprimer"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Employes;
