import { useEffect, useState } from 'react';
import { getTodos, createTodo, patchTodo, deleteTodo } from '../api/jsonplaceholder';

export default function ListaTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Stati per il form di creazione
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoCompleted, setNewTodoCompleted] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  
  // Stati per la modifica
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCompleted, setEditCompleted] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    loadTodos();
  }, []);

  function loadTodos() {
    let active = true;
    setLoading(true);
    setError('');
    getTodos(10)
      .then(data => { if (active) setTodos(data); })
      .catch(err => { if (active) setError(err.message || 'Errore'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }

  // POST: Crea un nuovo todo
  async function handleCreate() {
    if (!newTodoTitle.trim()) {
      alert('Inserisci un titolo per il todo');
      return;
    }

    setIsCreating(true);
    try {
      const newTodo = {
        title: newTodoTitle.trim(),
        completed: newTodoCompleted,
        userId: 1
      };
      
      const created = await createTodo(newTodo);
      
      // Aggiungi il nuovo todo alla lista (JSONPlaceholder restituisce un ID fittizio)
      setTodos(prev => [created, ...prev]);
      
      // Reset form
      setNewTodoTitle('');
      setNewTodoCompleted(false);
      setShowAddForm(false);
      
      alert('Todo creato con successo!');
    } catch (err) {
      setError(err.message || 'Errore nella creazione del todo');
      alert('Errore: ' + (err.message || 'Errore nella creazione del todo'));
    } finally {
      setIsCreating(false);
    }
  }

  // PUT/PATCH: Modifica un todo
  function startEdit(todo) {
    setEditingId(todo.id);
    setEditTitle(todo.title);
    setEditCompleted(todo.completed);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditTitle('');
    setEditCompleted(false);
  }

  async function handleUpdate(id) {
    if (!editTitle.trim()) {
      alert('Il titolo non può essere vuoto');
      return;
    }

    setIsUpdating(true);
    try {
      // Usa PATCH per aggiornare solo i campi modificati
      const updated = await patchTodo(id, {
        title: editTitle.trim(),
        completed: editCompleted
      });
      
      // Aggiorna il todo nella lista
      setTodos(prev => prev.map(todo => 
        todo.id === id ? { ...todo, ...updated } : todo
      ));
      
      cancelEdit();
      alert('Todo aggiornato con successo!');
    } catch (err) {
      setError(err.message || 'Errore nell\'aggiornamento del todo');
      alert('Errore: ' + (err.message || 'Errore nell\'aggiornamento del todo'));
    } finally {
      setIsUpdating(false);
    }
  }

  // DELETE: Elimina un todo
  async function handleDelete(id) {
    const confirmed = window.confirm('Sei sicuro di voler eliminare questo elemento?');
    if (!confirmed) return;

    try {
      await deleteTodo(id);
      
      // Rimuovi il todo dalla lista
      setTodos(prev => prev.filter(todo => todo.id !== id));
      
      alert('Todo eliminato con successo!');
    } catch (err) {
      setError(err.message || 'Errore nell\'eliminazione del todo');
      alert('Errore: ' + (err.message || 'Errore nell\'eliminazione del todo'));
    }
  }

  return (
    <div className="page-container">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 className="page-title">Lista Dati JSONPlaceholder</h1>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            style={{ 
              padding: '12px 24px', 
              fontSize: '16px',
              backgroundColor: showAddForm ? '#6c757d' : '#e3b23c',
              border: 'none',
              borderRadius: '4px',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            {showAddForm ? 'Annulla' : '+ Nuovo Todo'}
          </button>
        </div>

        {/* Form per creare un nuovo todo (POST) */}
        {showAddForm && (
          <div className="card" style={{ marginBottom: '24px', padding: '24px' }}>
            <h2 style={{ marginBottom: '20px', fontSize: '20px' }}>Crea Nuovo Todo</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#b3b3b3' }}>
                  Titolo *
                </label>
                <input
                  type="text"
                  value={newTodoTitle}
                  onChange={(e) => setNewTodoTitle(e.target.value)}
                  placeholder="Inserisci il titolo del todo"
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#2f2f2f',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '4px',
                    color: '#fff',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <input
                  type="checkbox"
                  id="newTodoCompleted"
                  checked={newTodoCompleted}
                  onChange={(e) => setNewTodoCompleted(e.target.checked)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <label htmlFor="newTodoCompleted" style={{ fontSize: '14px', color: '#b3b3b3', cursor: 'pointer' }}>
                  Completato
                </label>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={handleCreate}
                  disabled={isCreating}
                  style={{
                    padding: '12px 24px',
                    fontSize: '14px',
                    backgroundColor: '#e3b23c',
                    border: 'none',
                    borderRadius: '4px',
                    color: '#fff',
                    cursor: isCreating ? 'not-allowed' : 'pointer',
                    opacity: isCreating ? 0.6 : 1
                  }}
                >
                  {isCreating ? 'Creazione...' : 'Crea Todo'}
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setNewTodoTitle('');
                    setNewTodoCompleted(false);
                  }}
                  style={{
                    padding: '12px 24px',
                    fontSize: '14px',
                    backgroundColor: '#6c757d',
                    border: 'none',
                    borderRadius: '4px',
                    color: '#fff',
                    cursor: 'pointer'
                  }}
                >
                  Annulla
                </button>
              </div>
            </div>
          </div>
        )}

        {loading && <div className="loading">Caricamento...</div>}
        {error && <div className="error" style={{ padding: '20px', textAlign: 'center' }}>Errore: {error}</div>}
        
        {!loading && !error && (
          <div className="todos-list">
            {todos.length === 0 ? (
              <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
                <p className="muted">Nessun todo disponibile</p>
              </div>
            ) : (
              todos.map(todo => (
                <div key={todo.id} className="card" style={{ 
                  padding: '20px', 
                  marginBottom: '12px'
                }}>
                  {editingId === todo.id ? (
                    // Form di modifica
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#b3b3b3' }}>
                          Titolo *
                        </label>
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '12px',
                            backgroundColor: '#2f2f2f',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '4px',
                            color: '#fff',
                            fontSize: '14px'
                          }}
                        />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <input
                          type="checkbox"
                          id={`editCompleted-${todo.id}`}
                          checked={editCompleted}
                          onChange={(e) => setEditCompleted(e.target.checked)}
                          style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                        />
                        <label htmlFor={`editCompleted-${todo.id}`} style={{ fontSize: '14px', color: '#b3b3b3', cursor: 'pointer' }}>
                          Completato
                        </label>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => handleUpdate(todo.id)}
                          disabled={isUpdating}
                          style={{
                            padding: '8px 16px',
                            fontSize: '14px',
                            backgroundColor: '#e3b23c',
                            border: 'none',
                            borderRadius: '4px',
                            color: '#fff',
                            cursor: isUpdating ? 'not-allowed' : 'pointer',
                            opacity: isUpdating ? 0.6 : 1
                          }}
                        >
                          {isUpdating ? 'Salvataggio...' : 'Salva'}
                        </button>
                        <button
                          onClick={cancelEdit}
                          disabled={isUpdating}
                          style={{
                            padding: '8px 16px',
                            fontSize: '14px',
                            backgroundColor: '#6c757d',
                            border: 'none',
                            borderRadius: '4px',
                            color: '#fff',
                            cursor: isUpdating ? 'not-allowed' : 'pointer'
                          }}
                        >
                          Annulla
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Visualizzazione normale
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      gap: '16px'
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
                          onClick={() => startEdit(todo)}
                          style={{ 
                            padding: '8px 16px', 
                            fontSize: '14px',
                            backgroundColor: '#e3b23c',
                            border: 'none',
                            borderRadius: '4px',
                            color: '#fff',
                            cursor: 'pointer'
                          }}
                        >
                          Modifica
                        </button>
                        <button 
                          onClick={() => handleDelete(todo.id)}
                          style={{ 
                            padding: '8px 16px', 
                            fontSize: '14px', 
                            backgroundColor: '#dc3545',
                            border: 'none',
                            borderRadius: '4px',
                            color: '#fff',
                            cursor: 'pointer'
                          }}
                        >
                          Elimina
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

