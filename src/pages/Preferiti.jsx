import { useState, useEffect } from 'react';
import { getFavorites, removeFavorite } from '../utils/favorites';

export default function Preferiti() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleRemove = (id) => {
    if (window.confirm('Rimuovere questo film dai preferiti?')) {
      removeFavorite(id);
      setFavorites(getFavorites());
    }
  };

  const handleEdit = (id) => {
    alert(`Modifica film con ID: ${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Sei sicuro di voler eliminare questo film?')) {
      alert(`Elimina film con ID: ${id}`);
    }
  };

  return (
    <div className="page-container">
      <div className="container">
        <h1 className="page-title">I Miei Preferiti</h1>
        
        {favorites.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>❤️</div>
            <h2 style={{ fontSize: '24px', marginBottom: '12px' }}>Nessun preferito</h2>
            <p className="muted" style={{ fontSize: '16px' }}>
              Aggiungi film ai preferiti dalla pagina "Lista Film" cliccando su "Aggiungi"
            </p>
          </div>
        ) : (
          <div className="favorites-list">
            {favorites.map(film => (
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
                    ❤️ {film.title}
                  </div>
                  <div className="muted" style={{ fontSize: '14px' }}>
                    {film.year} • {film.genre} • ⭐ {film.rating}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                  <button 
                    onClick={() => handleEdit(film.id)}
                    style={{ padding: '8px 16px', fontSize: '14px' }}
                  >
                    Modifica
                  </button>
                  <button 
                    onClick={() => handleRemove(film.id)}
                    style={{ padding: '8px 16px', fontSize: '14px', backgroundColor: '#ff9800' }}
                  >
                    Rimuovi
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

