const BASE = 'https://jsonplaceholder.typicode.com';

// Trasforma i post di jsonplaceholder in formato film
function transformToFilm(post, index) {
  const genres = ['Sci-Fi', 'Azione', 'Crime', 'Dramma', 'Thriller', 'Fantasy', 'Horror', 'Commedia'];
  const years = [2010, 2008, 1994, 1999, 2014, 1972, 1990, 1982, 2015, 2000];
  const ratings = ['9.0', '9.2', '8.9', '8.8', '8.7', '8.6', '9.2', '8.7', '8.1', '9.3'];
  
  // Estrai le prime parole del titolo come nome del film
  const titleWords = post.title.split(' ').slice(0, 3).join(' ');
  
  return {
    id: post.id,
    title: titleWords,
    year: years[index % years.length],
    genre: genres[index % genres.length],
    rating: ratings[index % ratings.length],
    description: post.body
  };
}

export async function getFilms(limit = 10) {
  const res = await fetch(`${BASE}/posts?_limit=${limit}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const posts = await res.json();
  return posts.map((post, index) => transformToFilm(post, index));
}

// export async function createFilm(payload) { ... }
// export async function updateFilm(id, payload) { ... }
// export async function deleteFilm(id) { ... }

