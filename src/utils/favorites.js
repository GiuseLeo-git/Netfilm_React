// Gestione preferiti in localStorage

const STORAGE_KEY = 'favorites';
const UPDATE_EVENT = 'favorites:update';

function saveFavorites(favorites) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  try {
    window.dispatchEvent(new CustomEvent(UPDATE_EVENT, { detail: favorites }));
  } catch (err) {
    // In ambienti senza window (ad es. test), ignora
  }
}

export function getFavorites() {
  try {
    const favorites = localStorage.getItem(STORAGE_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (err) {
    console.error('Impossibile leggere i preferiti:', err);
    return [];
  }
}

export function addFavorite(film) {
  const favorites = getFavorites();
  const index = favorites.findIndex((f) => f.id === film.id);

  if (index >= 0) {
    favorites[index] = { ...favorites[index], ...film };
  } else {
    favorites.push(film);
  }

  saveFavorites(favorites);
  return true;
}

export function removeFavorite(id) {
  const favorites = getFavorites();
  const filtered = favorites.filter((f) => f.id !== id);
  saveFavorites(filtered);
}

export function isFavorite(id) {
  return getFavorites().some((f) => f.id === id);
}

export function subscribeToFavorites(callback) {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const handler = (event) => {
    callback(event.detail ?? getFavorites());
  };

  window.addEventListener(UPDATE_EVENT, handler);
  return () => window.removeEventListener(UPDATE_EVENT, handler);
}

