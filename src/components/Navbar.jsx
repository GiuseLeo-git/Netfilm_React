import { useState } from 'react';
import { getUser } from '../utils/auth';
import Sidebar from './Sidebar';

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = getUser();

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} onToggle={setIsSidebarOpen} />
      
      <nav className="navbar">
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

        <div className="navbar-user">
          <span className="user-greeting">
            Ciao, <strong>{user?.username}</strong>
          </span>
        </div>
      </nav>
    </>
  );
}

