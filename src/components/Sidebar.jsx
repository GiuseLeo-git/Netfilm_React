import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../utils/auth';

export default function Sidebar({ isOpen, onToggle }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Supporto retrocompatibilità: se non vengono passate props, usa stato interno
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const actualIsOpen = isOpen !== undefined ? isOpen : internalIsOpen;
  const setIsOpen = onToggle || setInternalIsOpen;

  const menuItems = [
    { path: '/app/films', label: 'Lista Film', icon: '🎬' },
    { path: '/app/preferiti', label: 'Preferiti', icon: '❤️' },
    { path: '/app/todos', label: 'Lista Dati JSONPlaceholder', icon: '📋' },
    { path: '/app/profilo', label: 'Profilo', icon: '👤' },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Overlay */}
      {actualIsOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${actualIsOpen ? 'open' : ''}`}>
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.path}
              className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => handleNavigate(item.path)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button 
            className="sidebar-logout"
            onClick={handleLogout}
          >
            <span className="sidebar-icon">🚪</span>
            <span className="sidebar-label">Esci</span>
          </button>
        </div>
      </aside>
    </>
  );
}

