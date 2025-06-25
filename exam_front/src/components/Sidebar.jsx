import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ onToggle }) {
  const [expanded, setExpanded] = useState(true);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };
  
  useEffect(() => {
    if (onToggle) {
      onToggle(expanded);
    }
  }, [expanded, onToggle]);

  return (
    <div className={`sidebar ${expanded ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar-header">
        <h2 className="sidebar-title">Menu</h2>
        <button className="toggle-button" onClick={toggleSidebar}>
          {expanded ? '◀' : '▶'}
        </button>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/">
              <span className="icon">🏠</span>
              {expanded && <span className="text">Accueil</span>}
            </Link>
          </li>
          <li>
            <Link to="/employes">
              <span className="icon">👥</span>
              {expanded && <span className="text">Employés</span>}
            </Link>
          </li>
          <li>
            <Link to="/candidats">
              <span className="icon">📝</span>
              {expanded && <span className="text">Candidats</span>}
            </Link>
          </li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        {expanded && <p>© 2025 - Aurelien</p>}
      </div>
    </div>
  );
}

export default Sidebar;
