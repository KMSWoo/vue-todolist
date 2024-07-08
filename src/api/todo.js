function getAllTodos() {
  return JSON.parse(localStorage.getItem('todos') || '[]');
}

function getCompletedTodos() {
  return getAllTodos().filter((todo) => todo.completed);
}

function getIncompleteTodos() {
  return getAllTodos().filter((todo) => !todo.completed);
}
function addTodo(title, deadline = '') {
  const todos = getAllTodos();
  const newTodo = {
    id: Date.now().toString(),
    title,
    completed: false,
    createdAt: new Date().toLocaleString(),
    completedAt: null,
    deadline,
  };
  todos.push(newTodo);
  localStorage.setItem('todos', JSON.stringify(todos));
  return newTodo;
}

function updateTodo(id, updates) {
  const todos = getAllTodos();
  const index = todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    todos[index] = { ...todos[index], ...updates };
    localStorage.setItem('todos', JSON.stringify(todos));
    return todos[index];
  }
  return null;
}

function deleteTodo(id) {
  const todos = getAllTodos();
  const filteredTodos = todos.filter((todo) => todo.id !== id);
  localStorage.setItem('todos', JSON.stringify(filteredTodos));
}

function toggleTodoComplete(id) {
  const todos = getAllTodos();
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    todo.completedAt = todo.completed ? new Date().toLocaleString() : null;
    localStorage.setItem('todos', JSON.stringify(todos));
    return todo;
  }
  return null;
}

function getTodoById(id) {
  const todos = getAllTodos();
  return todos.find((todo) => todo.id === id) || null;
}

export {
  getCompletedTodos,
  getIncompleteTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  toggleTodoComplete,
  getTodoById,
};
