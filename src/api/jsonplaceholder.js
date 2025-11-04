const BASE = 'https://jsonplaceholder.typicode.com';

export async function getTodos(limit = 2) {
  const res = await fetch(`${BASE}/todos?_limit=${limit}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}


// export async function createTodo(payload) { ... }
// export async function updateTodo(id, payload) { ... }
// export async function deleteTodo(id) { ... }
