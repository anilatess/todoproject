const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

renderTodos();

addBtn.addEventListener("click", () => {
  const todoText = todoInput.value.trim();
  if (todoText === "") return;

  const todo = {
    id: Date.now(),
    text: todoText
  };

  todos.push(todo);
  saveAndRender();
  todoInput.value = "";
});

function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach(todo => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${todo.text}</span>
      <div class="actions">
        <button onclick="editTodo(${todo.id})">✏️</button>
        <button onclick="deleteTodo(${todo.id})">🗑️</button>
      </div>
    `;
    todoList.appendChild(li);
  });
}

function editTodo(id) {
  const newText = prompt("Todo'yu düzenle:");
  if (!newText) return;

  todos = todos.map(todo =>
    todo.id === id ? { ...todo, text: newText } : todo
  );

  saveAndRender();
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}
