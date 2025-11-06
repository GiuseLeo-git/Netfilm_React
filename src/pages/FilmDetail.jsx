import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTodos } from '../api/jsonplaceholder';
import Navbar from '../components/Navbar';
import img01 from '../assets/57 secondi.jpg';
import img02 from '../assets/argo.jpg';
import img03 from '../assets/dracula.jpg';
import img04 from '../assets/gladiatore.jpg';
import img05 from '../assets/inception.jpg';
import img06 from '../assets/king conqueror.jpg';
import img07 from '../assets/Oppenheimer.jpg';
import img08 from '../assets/prophecy.jpg';
import img09 from '../assets/Titanic.jpg';
import img10 from '../assets/un delitto ideale.jpg';
import './FilmDetail.css';

const filmImages = {
  1: img01,
  2: img02,
  3: img03,
  4: img04,
  5: img05,
  6: img06,
  7: img07,
  8: img08,
  9: img09,
  10: img10,
};

export default function FilmDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [todosForMapping, setTodosForMapping] = useState([]);
  const [rating, setRating] = useState(() => {
    try {
      const stored = localStorage.getItem('filmRatings');
      if (!stored) return {};
      return JSON.parse(stored);
    } catch (err) {
      console.error('Impossibile leggere le recensioni salvate', err);
      return {};
    }
  });
  
  const todoId = parseInt(id, 10);

  const currentRating = rating[todoId] || 0;

  function handleRate(stars) {
    const next = { ...rating, [todoId]: stars };
    setRating(next);
    try {
      localStorage.setItem('filmRatings', JSON.stringify(next));
    } catch (err) {
      console.error('Impossibile salvare la recensione', err);
    }
  }

  useEffect(() => {
    if (todoId) {
      loadTodo();
    }
  }, [todoId]);

  async function loadTodo() {
    try {
      setLoading(true);
      setError(null);
      // Carica tutti i todos e trova quello con l'ID corrispondente
      const todos = await getTodos(10);
      const foundTodo = todos.find(t => t.id === todoId);
      
      if (foundTodo) {
        setTodo(foundTodo);
        // Salva anche tutti i todos per la mappatura delle immagini
        setTodosForMapping(todos);
      } else {
        setError('Film non trovato');
      }
    } catch (err) {
      setError(err.message || 'Errore nel caricamento del film');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="app-layout">
        <div className="app-content-wrapper">
          <Navbar />
          <div className="film-detail-container">
            <div className="loading">Caricamento...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-layout">
        <div className="app-content-wrapper">
          <Navbar />
          <div className="film-detail-container">
            <h1>{error}</h1>
            <button className="film-back-button" onClick={() => navigate('/home')}>
              <span className="film-back-arrow"></span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!todo) {
    return (
      <div className="app-layout">
        <div className="app-content-wrapper">
          <Navbar />
          <div className="film-detail-container">
            <div className="loading">Film non trovato...</div>
            <button className="film-back-button" onClick={() => navigate('/home')}>
              <span className="film-back-arrow"></span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Crea la stessa mappatura della Home solo quando abbiamo i dati
  let image = filmImages[1]; // Default
  let title = todo.title;
  
  if (todosForMapping.length > 0) {
    const todoIndex = todosForMapping.findIndex(t => t.id === todo.id);
    if (todoIndex !== -1) {
      if (todoIndex < 5) {
        image = filmImages[todoIndex + 1];
      } else {
        image = filmImages[todoIndex - 5 + 6];
      }
    }
  } else {
    // Fallback: usa l'ID direttamente se non abbiamo ancora i todos per la mappatura
    if (todo.id <= 5) {
      image = filmImages[todo.id];
    } else {
      image = filmImages[todo.id - 5 + 6];
    }
  }

  return (
    <div className="app-layout">
      <div className="app-content-wrapper">
        <Navbar />
        <div className="film-detail-container">
          <button className="film-back-button" onClick={() => navigate('/home')} aria-label="Torna alla Home">
            <span className="film-back-arrow"></span>
          </button>
          <div className="film-detail-image-wrapper">
            <img src={image} alt={title} className="film-detail-image" />
          </div>
          <div className="film-detail-content">
            <div className="film-detail-info">
              <h1 className="film-detail-title">{title}</h1>
              <div className="film-detail-meta">
                <div className="film-detail-meta-left">
                  <span className={`film-status ${todo.completed ? 'completed' : 'in-progress'}`}>
                    {todo.completed ? '✓ Completato' : '○ In corso'}
                  </span>
                  <span className="film-id">ID: {todo.id}</span>
                </div>
                <div className="film-detail-rating" role="radiogroup" aria-label="Valutazione film">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`film-rating-star ${currentRating >= star ? 'active' : ''}`}
                      onClick={() => handleRate(star)}
                      aria-label={`Valuta ${star} su 5`}
                      aria-checked={currentRating === star}
                      role="radio"
                    >
                      {currentRating >= star ? '★' : '☆'}
                    </button>
                  ))}
                  <span className="film-rating-label">
                    {currentRating ? `${currentRating} / 5` : 'Nessuna recensione'}
                  </span>
                </div>
              </div>
              <p className="film-detail-description">
                Questo è il dettaglio del film "{title}" dalla lista. 
                Qui puoi aggiungere informazioni aggiuntive come descrizione, cast, regista, anno di uscita, ecc.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

