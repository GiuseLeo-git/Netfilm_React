import { useState, useEffect } from 'react';
import { getUser, isAuthenticated } from '../utils/auth';
import Sidebar from './Sidebar';
import LoginModal from './LoginModal';
import loginImg from '../assets/login.png';

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(isAuthenticated());
  const user = getUser();

  // Aggiorna lo stato di autenticazione quando cambia
  useEffect(() => {
    const checkAuth = () => {
      setAuthenticated(isAuthenticated());
    };
    
    // Controlla ogni volta che viene aggiornato localStorage
    const interval = setInterval(checkAuth, 100);
    
    return () => clearInterval(interval);
  }, []);

  const handleLoginSuccess = () => {
    setAuthenticated(true);
    setIsLoginModalOpen(false);
  };

  return (
    <>
      {authenticated && <Sidebar isOpen={isSidebarOpen} onToggle={setIsSidebarOpen} />}
      
      <nav className="navbar">
        {authenticated ? (
          // Menu hamburger per utenti autenticati (in alto)
          <button
            className="navbar-hamburger"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Menu"
          >
            {isSidebarOpen ? (
              <span style={{ fontSize: '24px', color: '#fff' }}>×</span>
            ) : (
              <>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
              </>
            )}
          </button>
        ) : (
          // Icona login per utenti non autenticati (in basso)
          <div className="navbar-login-container">
            <button
              className="navbar-login-button"
              onClick={() => setIsLoginModalOpen(true)}
              aria-label="Accedi"
              title="Accedi per navigare"
            >
              <img 
                src={loginImg} 
                alt="Accedi" 
                style={{ width: '36px', height: '36px' }}
              />
              <span className="navbar-login-tooltip">Accedi per navigare</span>
            </button>
          </div>
        )}
      </nav>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={handleLoginSuccess}
      />
    </>
  );
}

