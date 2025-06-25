import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './Layout.css';

function Layout() {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const handleSidebarToggle = (expanded) => {
    setSidebarExpanded(expanded);
  };

  return (
    <div className="layout">
      <Sidebar onToggle={handleSidebarToggle} />
      <main className={`main-content ${sidebarExpanded ? '' : 'sidebar-collapsed'}`}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
