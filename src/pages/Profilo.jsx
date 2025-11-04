import { getUser, logout } from '../utils/auth';

export default function Profilo() {
  const user = getUser();

  function handleLogout() {
    logout();
    window.location.href = '/login';
  }

  return (
    <div className="page-container">
      <div className="container">
        <h1 className="page-title">Profilo</h1>
        
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{ 
              width: '120px', 
              height: '120px', 
              borderRadius: '50%', 
              backgroundColor: '#e50914',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              margin: '0 auto 20px',
              color: '#fff'
            }}>
              👤
            </div>
            <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>{user?.username}</h2>
            <p className="muted">Membro Netfilm</p>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#b3b3b3' }}>
                Username
              </label>
              <input 
                type="text" 
                value={user?.username || ''} 
                readOnly
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  backgroundColor: '#2f2f2f', 
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '4px',
                  color: '#fff'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#b3b3b3' }}>
                Email
              </label>
              <input 
                type="email" 
                placeholder="email@esempio.com"
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  backgroundColor: '#2f2f2f', 
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '4px',
                  color: '#fff'
                }}
              />
            </div>

            <button style={{ width: '100%', padding: '12px', marginTop: '10px' }}>
              Salva Modifiche
            </button>

            <button 
              onClick={handleLogout}
              style={{ 
                width: '100%', 
                padding: '12px', 
                marginTop: '16px',
                backgroundColor: '#dc3545',
                border: '1px solid #dc3545'
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

