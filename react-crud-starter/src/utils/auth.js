export function login(username) {
  localStorage.setItem('user', JSON.stringify({ username }));
}

export function logout() {
  localStorage.removeItem('user');
}

export function getUser() {
  const raw = localStorage.getItem('user');
  return raw ? JSON.parse(raw) : null;
}

export function isAuthenticated() {
  return Boolean(getUser());
}
