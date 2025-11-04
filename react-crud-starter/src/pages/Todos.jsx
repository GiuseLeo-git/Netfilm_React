import { useEffect, useState } from 'react';
import { getTodos } from '../api/jsonplaceholder';
import { logout, getUser } from '../utils/auth';

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = getUser();

  useEffect(() => {
    let active = true;
    setLoading(true);
    getTodos(10)
      .then(data => { if (active) setTodos(data); })
      .catch(err => { if (active) setError(err.message || 'Errore'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  function logoutAndGoLogin() {
    logout();
    window.location.href = '/login';
  }

  return (
    <div className="container">
      <header className="row" style={{ marginBottom: 16 }}>
        <h1>Dashboard</h1>
        <div>
          <span style={{ marginRight: 12 }}>Ciao, <strong>{user?.username}</strong></span>
          <button onClick={logoutAndGoLogin}>Logout</button>
        </div>
      </header>

      <section>
        <p>
          Questa lista è caricata via <code>GET</code> da JSONPlaceholder.
          Implementate voi <code>POST</code>, <code>PUT/PATCH</code> e <code>DELETE</code>.
        </p>

        {loading && <p>Caricamento…</p>}
        {error && <p className="error">Errore: {error}</p>}

        {!loading && !error && (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {todos.map(t => (
              <li key={t.id} className="card" style={{ marginBottom: 8 }}>
                <div className="row">
                  <div>
                    <strong>#{t.id}</strong> {t.title}
                    <div className="muted">completed: {String(t.completed)}</div>
                  </div>
                  <div className="row" style={{ gap: 8 }}>
                    <button disabled title="TODO: implementa POST per creare">Aggiungi</button>
                    <button disabled title="TODO: implementa PUT/PATCH per aggiornare">Modifica</button>
                    <button disabled title="TODO: implementa DELETE per cancellare">Elimina</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
