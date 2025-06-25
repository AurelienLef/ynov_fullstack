import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EmployeService from '../../services/EmployeService';
import AbsenceService from '../../services/AbsenceService';
import CongesService from '../../services/CongesService';
import './EmployeDetailPage.css';

function EmployeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employe, setEmploye] = useState(null);
  const [absences, setAbsences] = useState([]);
  const [conges, setConges] = useState([]);
  const [showAbsences, setShowAbsences] = useState(false);
  const [showConges, setShowConges] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmploye = async () => {
      try {
        setLoading(true);
        const data = await EmployeService.getEmployeById(id);
        setEmploye(data);
        setError(null);
      } catch (err) {
        console.error("Erreur lors du chargement de l'employé:", err);
        setError("Impossible de charger les données de l'employé.");
      } finally {
        setLoading(false);
      }
    };

    const fetchAbsences = async () => {
      try {
        const data = await AbsenceService.getAbsencesByEmployeId(id);
        setAbsences(data || []);
      } catch (err) {
        console.error("Erreur lors du chargement des absences:", err);
      }
    };

    const fetchConges = async () => {
      try {
        const data = await CongesService.getCongesByEmployeId(id);
        setConges(data || []);
      } catch (err) {
        console.error("Erreur lors du chargement des congés:", err);
      }
    };

    fetchEmploye();
    fetchAbsences();
    fetchConges();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  const handleBack = () => {
    navigate('/employes');
  };

  const handleEdit = () => {
    navigate(`/employes/edit/${id}`);
  };

  const handleAddAbsence = () => {
    navigate(`/absences/new?employeId=${id}`);
  };

  const handleAddConges = () => {
    navigate(`/conges/new?employeId=${id}`);
  };

  const toggleAbsences = () => {
    setShowAbsences(!showAbsences);
  };

  const toggleConges = () => {
    setShowConges(!showConges);
  };

  const handleEditAbsence = (absenceId) => {
    navigate(`/absences/edit/${absenceId}?employeId=${id}`);
  };

  const handleDeleteAbsence = async (absenceId) => {
    try {
      const response = await fetch(`http://localhost:8080/absences/${absenceId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (response.ok) {
        window.location.reload();
      } else {
        const errorText = await response.text();
        alert(`Erreur ${response.status}: ${errorText}`);
      }
    } catch (err) {
      console.error("Erreur lors de la suppression:", err);
      alert("Erreur lors de la suppression: " + err.message);
    }
  };

  const handleEditConges = (congeId) => {
    navigate(`/conges/edit/${congeId}?employeId=${id}`);
  };

  const handleDeleteConges = async (congeId) => {
      try {
        const response = await fetch(`http://localhost:8080/conges/${congeId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (response.ok) {
          window.location.reload();
        } else {
          const errorText = await response.text();
          alert(`Erreur ${response.status}: ${errorText}`);
        }
      } catch (err) {
        console.error("Erreur lors de la suppression:", err);
        alert("Erreur lors de la suppression: " + err.message);
      }
  };

  return (
    <div className="employe-detail-page">
      <div className="detail-header">
        <h1>Détails de l'employé</h1>
        <div className="header-actions">
          <button onClick={handleBack} className="btn btn-secondary">
            Retour à la liste
          </button>
          <button onClick={handleEdit} className="btn btn-primary">
            Modifier
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          <p>Chargement des données...</p>
        </div>
      ) : error ? (
        <div className="error-state">
          <p>{error}</p>
        </div>
      ) : employe ? (
        <div className="employe-card">
          <div className="employe-info">
            <h2>{employe.nom}</h2>
            <div className="info-section">
              <h3>Informations personnelles</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">Date de naissance:</span>
                  <span className="value">{formatDate(employe.naissance)}</span>
                </div>
                <div className="info-item">
                  <span className="label">Adresse:</span>
                  <span className="value">{employe.adresse}</span>
                </div>
                <div className="info-item">
                  <span className="label">Email:</span>
                  <span className="value">{employe.email}</span>
                </div>
                <div className="info-item">
                  <span className="label">Téléphone:</span>
                  <span className="value">{employe.tel}</span>
                </div>
                <div className="info-item">
                  <span className="label">Numéro d'identification:</span>
                  <span className="value">{employe.num_id}</span>
                </div>
              </div>
            </div>

            <div className="info-section">
              <h3>Informations professionnelles</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">Poste:</span>
                  <span className="value">{employe.poste}</span>
                </div>
                <div className="info-item">
                  <span className="label">Salaire:</span>
                  <span className="value">{employe.salaire}</span>
                </div>
                <div className="info-item">
                  <span className="label">Date de début:</span>
                  <span className="value">{formatDate(employe.debut)}</span>
                </div>
                <div className="info-item">
                  <span className="label">Date de fin:</span>
                  <span className="value">{formatDate(employe.fin)}</span>
                </div>
              </div>
            </div>

            <div className="info-section">
              <div className="section-header">
                <h3>Absences</h3>
                <div className="section-actions">
                  <button onClick={toggleAbsences} className="btn-toggle">
                    {showAbsences ? 'Masquer' : 'Afficher'} les absences
                  </button>
                  <button onClick={handleAddAbsence} className="btn-add">
                    + Ajouter une absence
                  </button>
                </div>
              </div>
              {showAbsences && (
                <div className="data-table-container">
                  {absences.length === 0 ? (
                    <p className="no-data-message">Aucune absence enregistrée.</p>
                  ) : (
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Date d'absence</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {absences.map(absence => (
                          <tr key={absence.id}>
                            <td>{formatDate(absence.date)}</td>
                            <td className="actions-cell">
                              <button onClick={() => handleEditAbsence(absence.id)} className="btn-action">
                                Modifier
                              </button>
                              <button onClick={() => handleDeleteAbsence(absence.id)} className="btn-action btn-delete">
                                Supprimer
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </div>

            <div className="info-section">
              <div className="section-header">
                <h3>Congés</h3>
                <div className="section-actions">
                  <button onClick={toggleConges} className="btn-toggle">
                    {showConges ? 'Masquer' : 'Afficher'} les congés
                  </button>
                  <button onClick={handleAddConges} className="btn-add">
                    + Ajouter un congé
                  </button>
                </div>
              </div>
              {showConges && (
                <div className="data-table-container">
                  {conges.length === 0 ? (
                    <p className="no-data-message">Aucun congé enregistré.</p>
                  ) : (
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Date de début</th>
                          <th>Date de fin</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {conges.map(conge => (
                          <tr key={conge.id}>
                            <td>{formatDate(conge.debut)}</td>
                            <td>{formatDate(conge.fin)}</td>
                            <td className="actions-cell">
                              <button onClick={() => handleEditConges(conge.id)} className="btn-action">
                                Modifier
                              </button>
                              <button onClick={() => handleDeleteConges(conge.id)} className="btn-action btn-delete">
                                Supprimer
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </div>

            <div className="info-section">
              <h3>Notes et observations</h3>
              <div className="info-block">
                <div className="info-item full-width">
                  <span className="label">Observations:</span>
                  <div className="value text-block">{employe.observation || "-"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="error-state">
          <p>Employé non trouvé.</p>
        </div>
      )}
    </div>
  );
}

export default EmployeDetailPage;
