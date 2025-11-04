import { useState, useEffect } from 'react';
import { getPosts } from '../api/jsonplaceholder';

export default function ListaFilm() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    getPosts(100)
      .then(data => { if (active) setPosts(data); })
      .catch(err => { if (active) setError(err.message || 'Errore nel caricamento dei dati'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  function handleAdd(post) {
    setMessage(`"${post.title}" aggiunto!`);
    setTimeout(() => setMessage(''), 3000);
  }

  function handleEdit(id) {
    alert(`Modifica post con ID: ${id}`);
  }

  function handleDelete(id) {
    if (window.confirm('Sei sicuro di voler eliminare questo elemento?')) {
      alert(`Elimina post con ID: ${id}`);
    }
  }

  return (
    <div className="page-container">
      <div className="container">
        <h1 className="page-title">Lista Film</h1>
        
        {loading && <div className="loading">Caricamento dati...</div>}
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
            {posts.map(post => (
            <div key={post.id} className="card" style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '20px', 
              gap: '16px',
              marginBottom: '12px'
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  marginBottom: '8px', 
                  color: '#ffffff',
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word'
                }}>
                  {post.title}
                </div>
                <div className="muted" style={{ fontSize: '14px' }}>
                  User ID: {post.userId} • Post ID: {post.id}
                </div>
                <div className="muted" style={{ fontSize: '12px', marginTop: '8px', opacity: 0.7 }}>
                  {post.body.substring(0, 100)}...
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                <button 
                  onClick={() => handleAdd(post)}
                  style={{ padding: '8px 16px', fontSize: '14px' }}
                >
                  Aggiungi
                </button>
                <button 
                  onClick={() => handleEdit(post.id)}
                  style={{ padding: '8px 16px', fontSize: '14px' }}
                >
                  Modifica
                </button>
                <button 
                  onClick={() => handleDelete(post.id)}
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

