import { getUser, handleLogout } from '../utils/auth';

export default function Profilo() {
  const user = getUser();

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
              margin: '0 auto 20px'
            }}>
              <svg 
                width="60" 
                height="60" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                style={{ color: '#fff' }}
              >
                <path 
                  d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" 
                  fill="white"
                />
                <path 
                  d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z" 
                  fill="white"
                />
              </svg>
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
              onClick={() => handleLogout()}
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

