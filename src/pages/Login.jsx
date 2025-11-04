import { useState } from 'react';
import { login, isAuthenticated } from '../utils/auth';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  if (isAuthenticated()) return <Navigate to="/app" replace />;

  const onSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Inserisci un username');
      return;
    }
    login(username.trim());
    navigate('/app');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">NETFILM</div>
        <h1 className="login-title">Accedi</h1>
        <form onSubmit={onSubmit} className="login-form">
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Inserisci il tuo username"
              autoComplete="username"
            />
          </label>
          {error && <div className="error">{error}</div>}
          <button type="submit" className="login-button">
            Entra
          </button>
        </form>
        <p className="muted" style={{ marginTop: 24, textAlign: 'center' }}>
          Benvenuto su Netfilm, la tua piattaforma streaming preferita
        </p>
      </div>
    </div>
  );
}
