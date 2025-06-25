import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CandidatService from '../services/CandidatService';
import './CandidatDetailPage.css';

function CandidatDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [candidat, setCandidat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCandidat = async () => {
      try {
        setLoading(true);
        const data = await CandidatService.getCandidatById(id);
        setCandidat(data);
        setError(null);
      } catch (err) {
        console.error("Erreur lors du chargement du candidat:", err);
        setError("Impossible de charger les données du candidat.");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidat();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  const handleBack = () => {
    navigate('/candidats');
  };

  const handleEdit = () => {
    navigate(`/candidats/edit/${id}`);
  };

  return (
    <div className="candidat-detail-page">
      <div className="detail-header">
        <h1>Détails du candidat</h1>
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
      ) : candidat ? (
        <div className="candidat-card">
          <div className="candidat-info">
            <div className="info-header">
              <h2>{candidat.nom}</h2>
              <button onClick={handleEdit} className="btn btn-primary detail-edit-btn">
                <span className="icon">✏️</span> Modifier ce candidat
              </button>
            </div>
            <div className="info-section">
              <h3>Informations personnelles</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">Date de naissance:</span>
                  <span className="value">{formatDate(candidat.naissance)}</span>
                </div>
                <div className="info-item">
                  <span className="label">Adresse:</span>
                  <span className="value">{candidat.adresse}</span>
                </div>
                <div className="info-item">
                  <span className="label">Email:</span>
                  <span className="value">{candidat.email}</span>
                </div>
                <div className="info-item">
                  <span className="label">Téléphone:</span>
                  <span className="value">{candidat.tel}</span>
                </div>
                <div className="info-item">
                  <span className="label">Numéro d'identification:</span>
                  <span className="value">{candidat.num_id}</span>
                </div>
              </div>
            </div>

            <div className="info-section">
              <h3>Informations professionnelles</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">Domaine d'expertise:</span>
                  <span className="value">{candidat.domaine}</span>
                </div>
                <div className="info-item">
                  <span className="label">Date d'entretien:</span>
                  <span className="value">{formatDate(candidat.entretien)}</span>
                </div>
              </div>
            </div>

            <div className="info-section">
              <h3>Notes et observations</h3>
              <div className="info-block">
                <div className="info-item full-width">
                  <span className="label">Note:</span>
                  <div className="value text-block">{candidat.note || "-"}</div>
                </div>
                <div className="info-item full-width">
                  <span className="label">Observations:</span>
                  <div className="value text-block">{candidat.observation || "-"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="error-state">
          <p>Candidat non trouvé.</p>
        </div>
      )}
    </div>
  );
}

export default CandidatDetailPage;
