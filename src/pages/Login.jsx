import { useState } from 'react';
import { login, register, isAuthenticated } from '../utils/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

export default function Login() {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Campi login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Campi registrazione
  const [nome, setNome] = useState('');
  const [cognome, setCognome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (isAuthenticated()) return <Navigate to="/app" replace />;

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setError('Inserisci email e password');
      return;
    }

    try {
      login(loginEmail.trim(), loginPassword.trim());
      navigate('/app');
    } catch (err) {
      setError(err.message || 'Errore durante il login');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!nome.trim() || !cognome.trim() || !email.trim() || !password.trim()) {
      setError('Compila tutti i campi');
      return;
    }

    if (password.length < 6) {
      setError('La password deve essere di almeno 6 caratteri');
      return;
    }

    try {
      register(nome.trim(), cognome.trim(), email.trim(), password.trim());
      setSuccess('Registrazione completata! Reindirizzamento...');
      setTimeout(() => {
        navigate('/app');
      }, 1000);
    } catch (err) {
      setError(err.message || 'Errore durante la registrazione');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">
          <Logo size="large" />
        </div>
        <h1 className="login-title">{isRegisterMode ? 'Registrati' : 'Accedi'}</h1>

        {!isRegisterMode ? (
          // Form Login
          <form onSubmit={handleLogin} className="login-form">
            <label>
              Email
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="inserisci@email.com"
                autoComplete="email"
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Inserisci la tua password"
                autoComplete="current-password"
              />
            </label>
            {error && <div className="error">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            <button type="submit" className="login-button">
              Entra
            </button>
          </form>
        ) : (
          // Form Registrazione
          <form onSubmit={handleRegister} className="login-form">
            <label>
              Nome
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Inserisci il tuo nome"
                autoComplete="given-name"
              />
            </label>
            <label>
              Cognome
              <input
                type="text"
                value={cognome}
                onChange={(e) => setCognome(e.target.value)}
                placeholder="Inserisci il tuo cognome"
                autoComplete="family-name"
              />
            </label>
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="inserisci@email.com"
                autoComplete="email"
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimo 6 caratteri"
                autoComplete="new-password"
              />
            </label>
            {error && <div className="error">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            <button type="submit" className="login-button">
              Registrati
            </button>
          </form>
        )}

        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <button
            type="button"
            onClick={() => {
              setIsRegisterMode(!isRegisterMode);
              setError('');
              setSuccess('');
              setLoginEmail('');
              setLoginPassword('');
              setNome('');
              setCognome('');
              setEmail('');
              setPassword('');
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#e3b23c',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontSize: '14px',
              padding: '8px'
            }}
          >
            {isRegisterMode 
              ? 'Hai già un account? Accedi' 
              : 'Non hai un account? Registrati'}
          </button>
        </div>

        <p className="muted" style={{ marginTop: 16, textAlign: 'center' }}>
          Benvenuto su Netfilm, la tua piattaforma streaming preferita
        </p>
      </div>
    </div>
  );
}
