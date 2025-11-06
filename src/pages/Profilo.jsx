import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, logout } from '../utils/auth';
import { getFavorites, removeFavorite, subscribeToFavorites } from '../utils/favorites';
import { useLoginModal } from '../context/LoginModalContext';
import './Profilo.css';

const infoFields = [
  {
    key: 'nome',
    label: 'Nome'
  },
  {
    key: 'email',
    label: 'Email'
  },
  {
    key: 'password',
    label: 'Password',
    formatter: () => '********'
  }
];

export default function Profilo() {
  const navigate = useNavigate();
  const { markLoggedOut } = useLoginModal();
  const [favorites, setFavorites] = useState(() => getFavorites());

  const user = useMemo(() => {
    const data = getUser();
    if (!data) return null;
    return {
      ...data,
      password: data.password || '********'
    };
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToFavorites(setFavorites);
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  const handleLogout = () => {
    logout();
    markLoggedOut();
    navigate('/home');
  };

  const handleRemoveFavorite = (id) => {
    removeFavorite(id);
    setFavorites(getFavorites());
  };

  const displayName = user?.nome && user?.cognome
    ? `${user.nome} ${user.cognome}`
    : user?.username || user?.email || 'Utente Netfilm';

  return (
    <div className="profile-page">
      <div className="profile-card">
        <header className="profile-card-header">
          <span className="profile-brand">NETFILM</span>
          <button type="button" className="profile-logout" onClick={handleLogout}>
            Logout
          </button>
        </header>

        <section className="profile-hero">
          <div className="profile-avatar">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="currentColor" />
              <path d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z" fill="currentColor" />
            </svg>
          </div>
          <h1 className="profile-title">Il Mio Profilo</h1>
          <p className="profile-username">{displayName}</p>
          <p className="profile-email">{user?.email || 'Membro Netfilm'}</p>
        </section>

        <section className="profile-section">
          <h2 className="profile-section-title">Le mie informazioni</h2>
          <div className="profile-info-list">
            {infoFields.map(({ key, label, formatter }) => (
              <div key={key} className="profile-info-item">
                <div className="profile-info-label">{label}</div>
                <div className="profile-info-value">{formatter ? formatter(user?.[key]) : user?.[key] || 'Non specificato'}</div>
                <button type="button" className="profile-edit-button" aria-label={`Modifica ${label}`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <button type="button" className="profile-save-button">Salva modifiche</button>
        </section>

        <section className="profile-section">
          <div className="profile-section-header">
            <h2 className="profile-section-title">I miei preferiti</h2>
            {favorites.length > 0 && (
              <span className="profile-section-counter">{favorites.length}</span>
            )}
          </div>

          {favorites.length === 0 ? (
            <div className="profile-empty">
              <p>Non hai ancora aggiunto film ai preferiti.</p>
              <span>Aggiungili dalla pagina "Lista Film" cliccando sul cuore.</span>
            </div>
          ) : (
            <div className="profile-favorites-grid">
              {favorites.map((film) => (
                <div key={film.id} className="profile-favorite-card" onClick={() => navigate(`/home/film/${film.id}`)}>
                  <div className="profile-favorite-image" style={{ backgroundImage: `url(${film.image})` }} />
                  <div className="profile-favorite-info">
                    <p className="profile-favorite-title">{film.title}</p>
                    <div className="profile-favorite-actions">
                      <button
                        type="button"
                        className="profile-favorite-remove"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleRemoveFavorite(film.id);
                        }}
                      >
                        Rimuovi
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

