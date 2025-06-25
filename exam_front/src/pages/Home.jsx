import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EmployeService from '../services/EmployeService';
import CandidatService from '../services/CandidatService';
import './Home.css';

function Home() {
  const [stats, setStats] = useState({
    employesCount: 0,
    candidatsCount: 0,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [employes, candidats] = await Promise.all([
          EmployeService.getAllEmployes(),
          CandidatService.getAllCandidats()
        ]);

        setStats({
          employesCount: employes.length,
          candidatsCount: candidats.length,
          loading: false,
          error: null
        });
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error);
        setStats(prev => ({
          ...prev,
          loading: false,
          error: 'Erreur lors du chargement des statistiques'
        }));
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="home-container">
      <h1>Bienvenue sur l'application de gestion RH</h1>
      
      {stats.loading ? (
        <p>Chargement des statistiques...</p>
      ) : stats.error ? (
        <p className="error-message">{stats.error}</p>
      ) : (
        <div className="stats-container">
          <div className="stat-card">
            <h2>Employés</h2>
            <p className="stat-number">{stats.employesCount}</p>
            <Link to="/employes" className="view-link">Voir tous les employés</Link>
          </div>
          
          <div className="stat-card">
            <h2>Candidats</h2>
            <p className="stat-number">{stats.candidatsCount}</p>
            <Link to="/candidats" className="view-link">Voir tous les candidats</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
