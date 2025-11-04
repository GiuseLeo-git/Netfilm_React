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
              backgroundColor: '#e3b23c',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              margin: '0 auto 20px',
              color: '#fff'
            }}>
              👤
            </div>
            <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>
              {user?.nome && user?.cognome 
                ? `${user.nome} ${user.cognome}` 
                : user?.username || user?.email}
            </h2>
            <p className="muted">{user?.email || 'Membro Netfilm'}</p>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
            {user?.nome && (
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#b3b3b3' }}>
                  Nome
                </label>
                <input 
                  type="text" 
                  value={user.nome || ''} 
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
            )}

            {user?.cognome && (
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#b3b3b3' }}>
                  Cognome
                </label>
                <input 
                  type="text" 
                  value={user.cognome || ''} 
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
            )}

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#b3b3b3' }}>
                Email
              </label>
              <input 
                type="email" 
                value={user?.email || ''}
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

