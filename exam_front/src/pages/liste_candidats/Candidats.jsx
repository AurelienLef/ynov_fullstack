import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CandidatService from '../../services/CandidatService';
import '../../components/CandidatList.css';

function Candidats() {
  const navigate = useNavigate();
  const [candidats, setCandidats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCandidats();
  }, []);

  const fetchCandidats = async () => {
    setLoading(true);
    try {
      const data = await CandidatService.getAllCandidats();
      setCandidats(data);
      setError(null);
    } catch (err) {
      console.error("Erreur lors du chargement des candidats:", err);
      setError("Impossible de charger les candidats. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

  const goToAddCandidat = () => {
    navigate('/candidats/new');
  };

  const goToViewCandidat = (id) => {
    navigate(`/candidats/view/${id}`);
  };

  const goToEditCandidat = (id) => {
    navigate(`/candidats/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await CandidatService.deleteCandidat(id);
      fetchCandidats();
    } catch (err) {
      console.error("Erreur lors de la suppression:", err);
      setError("Erreur lors de la suppression du candidat.");
    }
  };

  return (
    <div className="candidats-container">
      <div className="candidats-header">
        <h1>Gestion des Candidats</h1>
        <button className="add-candidat-btn" onClick={goToAddCandidat}>
          <span className="icon">+</span>
          Ajouter un candidat
        </button>
      </div>

      {loading ? (
        <div className="loading-state">
          <p>Chargement des candidats...</p>
        </div>
      ) : error ? (
        <div className="error-state">
          <p>{error}</p>
        </div>
      ) : candidats.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <p>Aucun candidat trouvé. Ajoutez-en un nouveau !</p>
        </div>
      ) : (
        <div className="candidats-table-container">
          <table className="candidats-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Domaine</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {candidats.map(candidat => (
                <tr key={candidat.id}>
                  <td>{candidat.nom}</td>
                  <td>{candidat.email}</td>
                  <td>{candidat.tel}</td>
                  <td>{candidat.domaine}</td>
                  <td>
                    <div className="action-column">
                      <button 
                        className="action-btn view-btn" 
                        onClick={() => goToViewCandidat(candidat.id)}
                        title="Voir les détails"
                      >
                        👁️
                      </button>
                      <button 
                        className="action-btn edit-btn" 
                        onClick={() => goToEditCandidat(candidat.id)}
                        title="Modifier"
                      >
                        ✏️
                      </button>
                      <button 
                        className="action-btn delete-btn" 
                        onClick={() => handleDelete(candidat.id)}
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

export default Candidats;
