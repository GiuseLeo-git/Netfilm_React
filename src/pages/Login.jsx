import { isAuthenticated } from '../utils/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import { useLoginForm } from '../hooks/useLoginForm';
import Logo from '../components/Logo';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();

  if (isAuthenticated()) return <Navigate to="/home/films" replace />;

  const handleLoginSuccess = () => {
    navigate('/home/films');
  };

  const handleRegisterSuccess = () => {
    setTimeout(() => {
      navigate('/home/films');
    }, 1000);
  };

  const {
    isRegisterMode,
    error,
    success,
    loginEmail,
    loginPassword,
    nome,
    cognome,
    email,
    password,
    setLoginEmail,
    setLoginPassword,
    setNome,
    setCognome,
    setEmail,
    setPassword,
    handleLogin,
    handleRegister,
    toggleMode
  } = useLoginForm({
    onLoginSuccess: handleLoginSuccess,
    onRegisterSuccess: handleRegisterSuccess
  });

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">
          <Logo size="large" animate={false} />
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
            {success && <div className="success-message">{success || 'Registrazione completata! Reindirizzamento...'}</div>}
            <button type="submit" className="login-button">
              Registrati
            </button>
          </form>
        )}

        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <button
            type="button"
            onClick={toggleMode}
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
