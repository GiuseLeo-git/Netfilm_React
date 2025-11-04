import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { getUser } from '../utils/auth';

export default function Layout() {
  const user = getUser();

  return (
    <div className="app-layout">
      <Sidebar />
      
      <div className="app-content">
        {/* Header */}
        <header className="netfilm-header">
          <div className="netfilm-logo">NETFILM</div>
          <div className="dashboard-user">
            <span className="user-greeting">
              Ciao, <strong>{user?.username}</strong>
            </span>
          </div>
        </header>

        {/* Main Content */}
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

