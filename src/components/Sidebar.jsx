import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { handleLogout } from '../utils/auth';
import logoutImg from '../assets/logout.png';
import './Sidebar.css';

export default function Sidebar({ isOpen, onToggle }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Supporto retrocompatibilità: se non vengono passate props, usa stato interno
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const actualIsOpen = isOpen !== undefined ? isOpen : internalIsOpen;
  const setIsOpen = onToggle || setInternalIsOpen;

  const menuItems = [
    { path: '/home', label: 'Home' },
    { path: '/home/todos', label: 'Lista film' },
    { path: '/home/preferiti', label: 'Preferiti' },
    { path: '/home/profilo', label: 'Profilo',  },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
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
        <div className="sidebar-header">
          <button
            className="sidebar-close"
            onClick={() => setIsOpen(false)}
            aria-label="Chiudi menu"
          >
            <span style={{ fontSize: '28px', color: '#fff', lineHeight: '1' }}>×</span>
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
            onClick={() => handleLogout()}
          >
            <img 
              src={logoutImg} 
              alt="Esci" 
              className="sidebar-icon"
              style={{ width: '32px', height: '32px' }}
            />
            <span className="sidebar-label">Esci</span>
          </button>
        </div>
      </aside>
    </>
  );
}

