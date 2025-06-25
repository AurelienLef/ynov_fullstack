import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">Menu</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/">
              <span className="text">Accueil</span>
            </Link>
          </li>
          <li>
            <Link to="/employes">
              <span className="text">Employés</span>
            </Link>
          </li>
          <li>
            <Link to="/candidats">
              <span className="text">Candidats</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        <p>© 2025 - Aurelien</p>
      </div>
    </div>
  );
}

export default Sidebar;
