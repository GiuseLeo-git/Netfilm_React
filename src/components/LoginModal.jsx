import { useLoginForm } from '../hooks/useLoginForm';
import Logo from './Logo';
import './LoginModal.css';

export default function LoginModal({ isOpen, onClose, onSuccess }) {
  const handleLoginSuccess = () => {
    setTimeout(() => {
      onSuccess?.();
      onClose();
      resetForm();
    }, 500);
  };

  const handleRegisterSuccess = () => {
    setTimeout(() => {
      onSuccess?.();
      onClose();
      resetForm();
    }, 500);
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
    toggleMode,
    resetForm
  } = useLoginForm({
    onLoginSuccess: handleLoginSuccess,
    onRegisterSuccess: handleRegisterSuccess
  });

  if (!isOpen) return null;

  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <button className="login-modal-close" onClick={onClose}>×</button>
        <div className="login-logo">
          <Logo size="large" animate={false} />
        </div>
        <h1 className="login-title">{isRegisterMode ? 'Registrati' : 'Accedi'}</h1>

        {!isRegisterMode ? (
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
            {success && <div className="success-message">{success}</div>}
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
      </div>
    </div>
  );
}



