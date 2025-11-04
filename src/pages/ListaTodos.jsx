import { useEffect, useState } from 'react';
import { getTodos } from '../api/jsonplaceholder';

export default function ListaTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    getTodos(10)
      .then(data => { if (active) setTodos(data); })
      .catch(err => { if (active) setError(err.message || 'Errore'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  function handleAdd(id) {
    alert(`Aggiungi todo con ID: ${id}`);
  }

  function handleEdit(id) {
    alert(`Modifica todo con ID: ${id}`);
  }

  function handleDelete(id) {
    if (window.confirm('Sei sicuro di voler eliminare questo elemento?')) {
      alert(`Elimina todo con ID: ${id}`);
    }
  }

  return (
    <div className="page-container">
      <div className="container">
        <h1 className="page-title">Lista Dati JSONPlaceholder</h1>
        
        {loading && <div className="loading">Caricamento...</div>}
        {error && <div className="error" style={{ padding: '20px', textAlign: 'center' }}>Errore: {error}</div>}
        
        {!loading && !error && (
          <div className="todos-list">
            {todos.map(todo => (
              <div key={todo.id} className="card" style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '20px', 
                gap: '16px',
                marginBottom: '12px'
              }}>
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
                    onClick={() => handleAdd(todo.id)}
                    style={{ padding: '8px 16px', fontSize: '14px' }}
                  >
                    Aggiungi
                  </button>
                  <button 
                    onClick={() => handleEdit(todo.id)}
                    style={{ padding: '8px 16px', fontSize: '14px' }}
                  >
                    Modifica
                  </button>
                  <button 
                    onClick={() => handleDelete(todo.id)}
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

