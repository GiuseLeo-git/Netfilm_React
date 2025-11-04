// Gestione preferiti in localStorage

export function getFavorites() {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
}

export function addFavorite(film) {
  const favorites = getFavorites();
  const exists = favorites.some(f => f.id === film.id);
  if (!exists) {
    favorites.push(film);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    return true;
  }
  return false;
}

export function removeFavorite(id) {
  const favorites = getFavorites();
  const filtered = favorites.filter(f => f.id !== id);
  localStorage.setItem('favorites', JSON.stringify(filtered));
}

export function isFavorite(id) {
  const favorites = getFavorites();
  return favorites.some(f => f.id === id);
}

