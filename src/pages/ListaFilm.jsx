import { useState, useEffect } from 'react';
import { addFavorite } from '../utils/favorites';
import { getFilms } from '../api/jsonplaceholderFilms';

export default function ListaFilm() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    getFilms(10)
      .then(data => { if (active) setFilms(data); })
      .catch(err => { if (active) setError(err.message || 'Errore nel caricamento dei film'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  function handleAdd(film) {
    const added = addFavorite(film);
    if (added) {
      setMessage(`"${film.title}" aggiunto ai preferiti!`);
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage(`"${film.title}" è già nei preferiti!`);
      setTimeout(() => setMessage(''), 3000);
    }
  }

  function handleEdit(id) {
    alert(`Modifica film con ID: ${id}`);
  }

  function handleDelete(id) {
    if (window.confirm('Sei sicuro di voler eliminare questo film?')) {
      alert(`Elimina film con ID: ${id}`);
    }
  }

  return (
    <div className="page-container">
      <div className="container">
        <h1 className="page-title">Lista Film</h1>
        
        {loading && <div className="loading">Caricamento film...</div>}
        {error && <div className="error" style={{ padding: '20px', textAlign: 'center', marginBottom: '20px' }}>Errore: {error}</div>}
        
        {message && (
          <div className="message-success" style={{ 
            padding: '12px 20px', 
            backgroundColor: '#4caf50', 
            borderRadius: '4px', 
            marginBottom: '20px',
            color: '#fff'
          }}>
            {message}
          </div>
        )}

        {!loading && !error && (
          <div className="films-list">
            {films.map(film => (
            <div key={film.id} className="card" style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '20px', 
              gap: '16px',
              marginBottom: '12px'
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#ffffff' }}>
                  🎬 {film.title}
                </div>
                <div className="muted" style={{ fontSize: '14px' }}>
                  {film.year} • {film.genre} • ⭐ {film.rating}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                <button 
                  onClick={() => handleAdd(film)}
                  style={{ padding: '8px 16px', fontSize: '14px' }}
                >
                  Aggiungi
                </button>
                <button 
                  onClick={() => handleEdit(film.id)}
                  style={{ padding: '8px 16px', fontSize: '14px' }}
                >
                  Modifica
                </button>
                <button 
                  onClick={() => handleDelete(film.id)}
                  style={{ padding: '8px 16px', fontSize: '14px', backgroundColor: '#dc3545' }}
                >
                  Elimina
                </button>
              </div>
            </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

