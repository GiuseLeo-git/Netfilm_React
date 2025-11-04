import { useEffect, useState } from 'react';
import { getTodos } from '../api/jsonplaceholder';
import { logout, getUser } from '../utils/auth';

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = getUser();

  // 10 film mock
  const [films] = useState([
    { id: 1, title: 'Inception', year: 2010, genre: 'Sci-Fi', rating: '9.0' },
    { id: 2, title: 'The Dark Knight', year: 2008, genre: 'Azione', rating: '9.2' },
    { id: 3, title: 'Pulp Fiction', year: 1994, genre: 'Crime', rating: '8.9' },
    { id: 4, title: 'Fight Club', year: 1999, genre: 'Dramma', rating: '8.8' },
    { id: 5, title: 'The Matrix', year: 1999, genre: 'Sci-Fi', rating: '8.7' },
    { id: 6, title: 'Interstellar', year: 2014, genre: 'Sci-Fi', rating: '8.6' },
    { id: 7, title: 'The Godfather', year: 1972, genre: 'Crime', rating: '9.2' },
    { id: 8, title: 'Goodfellas', year: 1990, genre: 'Crime', rating: '8.7' },
    { id: 9, title: 'Blade Runner', year: 1982, genre: 'Sci-Fi', rating: '8.1' },
    { id: 10, title: 'The Shawshank Redemption', year: 1994, genre: 'Dramma', rating: '9.3' },
  ]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    getTodos(2)
      .then(data => { if (active) setTodos(data); })
      .catch(err => { if (active) setError(err.message || 'Errore'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  function logoutAndGoLogin() {
    logout();
    window.location.href = '/login';
  }

  function handleAdd(id, type) {
    alert(`Aggiungi ${type} con ID: ${id}`);
    // TODO: Implementa la chiamata POST
  }

  function handleEdit(id, type) {
    alert(`Modifica ${type} con ID: ${id}`);
    // TODO: Implementa la chiamata PUT/PATCH
  }

  function handleDelete(id, type) {
    if (window.confirm(`Sei sicuro di voler eliminare questo ${type}?`)) {
      alert(`Elimina ${type} con ID: ${id}`);
      // TODO: Implementa la chiamata DELETE
    }
  }


  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #141414 0%, #1a1a1a 100%)' }}>
      {/* Header */}
      <header className="netfilm-header">
        <div className="netfilm-logo">NETFILM</div>
        <div className="dashboard-user">
          <span className="user-greeting">
            Ciao, <strong>{user?.username}</strong>
          </span>
          <button onClick={logoutAndGoLogin} className="logout-button">
            Esci
          </button>
        </div>
      </header>

      <div className="container">
        {/* Hero Section */}
        <section className="hero-section">
          <h1 className="hero-title">Benvenuto su Netfilm</h1>
          <p style={{ fontSize: '20px', color: '#b3b3b3', marginBottom: '30px' }}>
            Scopri migliaia di film e serie TV
          </p>
        </section>

        {/* Lista elementi unificata */}
        <section style={{ marginBottom: '60px' }}>
          <h2 className="section-title">Lista Elementi</h2>
          {loading && <div className="loading">Caricamento...</div>}
          {error && <div className="error" style={{ padding: '20px', textAlign: 'center' }}>Errore: {error}</div>}
          
          {!loading && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Film */}
              {films.map(film => (
                <div key={`film-${film.id}`} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', gap: '16px' }}>
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
                      onClick={() => handleAdd(film.id, 'film')}
                      style={{ padding: '8px 16px', fontSize: '14px' }}
                    >
                      Aggiungi
                    </button>
                    <button 
                      onClick={() => handleEdit(film.id, 'film')}
                      style={{ padding: '8px 16px', fontSize: '14px' }}
                    >
                      Modifica
                    </button>
                    <button 
                      onClick={() => handleDelete(film.id, 'film')}
                      style={{ padding: '8px 16px', fontSize: '14px', backgroundColor: '#dc3545' }}
                    >
                      Elimina
                    </button>
                  </div>
                </div>
              ))}

              {/* Todos da API */}
              {!error && todos.map(todo => (
                <div key={`todo-${todo.id}`} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', gap: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#ffffff' }}>
                      {todo.title}
                    </div>
                    <div className="muted" style={{ fontSize: '14px' }}>
                      Stato: <span style={{ color: todo.completed ? '#4caf50' : '#ff9800', fontWeight: '600' }}>
                        {todo.completed ? 'Completato' : 'In corso'}
                      </span>
                    </div>
                  </div>
                  <div style={{ 
                    width: '24px', 
                    height: '24px', 
                    borderRadius: '50%', 
                    backgroundColor: todo.completed ? '#4caf50' : '#ff9800',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginRight: '16px'
                  }}>
                    {todo.completed ? '✓' : '○'}
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                    <button 
                      onClick={() => handleAdd(todo.id, 'todo')}
                      style={{ padding: '8px 16px', fontSize: '14px' }}
                    >
                      Aggiungi
                    </button>
                    <button 
                      onClick={() => handleEdit(todo.id, 'todo')}
                      style={{ padding: '8px 16px', fontSize: '14px' }}
                    >
                      Modifica
                    </button>
                    <button 
                      onClick={() => handleDelete(todo.id, 'todo')}
                      style={{ padding: '8px 16px', fontSize: '14px', backgroundColor: '#dc3545' }}
                    >
                      Elimina
                    </button>
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
