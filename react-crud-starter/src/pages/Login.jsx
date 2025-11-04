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
    <div className="container">
      <div className="card">
        <h1 style={{ marginBottom: 16 }}>Login</h1>
        <form onSubmit={onSubmit}>
          <label style={{ display: 'block', marginBottom: 8 }}>
            Username
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="es. mario"
              style={{ width: '100%', padding: 8, marginTop: 4 }}
            />
          </label>
          {error && <div className="error" style={{ marginBottom: 8 }}>{error}</div>}
          <button type="submit" style={{ padding: '8px 12px' }}>Entra</button>
        </form>
      </div>
    </div>
  );
}
