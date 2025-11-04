import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../utils/auth';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/app/films', label: 'Lista Film', icon: '🎬' },
    { path: '/app/todos', label: 'Lista Dati JSONPlaceholder', icon: '📋' },
    { path: '/app/profilo', label: 'Profilo', icon: '👤' },
    { path: '/app/preferiti', label: 'Preferiti', icon: '❤️' },
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
      {/* Hamburger Button */}
      <button
        className="hamburger-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu"
      >
        <span className={isOpen ? 'hamburger-line open' : 'hamburger-line'}></span>
        <span className={isOpen ? 'hamburger-line open' : 'hamburger-line'}></span>
        <span className={isOpen ? 'hamburger-line open' : 'hamburger-line'}></span>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="netfilm-logo">NETFILM</div>
          <button 
            className="sidebar-close"
            onClick={() => setIsOpen(false)}
            aria-label="Chiudi menu"
          >
            ×
          </button>
        </div>

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

