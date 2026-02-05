
const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

const editModal = document.getElementById("editModal");
const editInput = document.getElementById("editInput");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");


let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentTodoId = null;


renderTodos();


addBtn.addEventListener("click", () => {
  const text = todoInput.value.trim();

  if (text === "") return;

  const newTodo = {
    id: Date.now(),
    text: text
  };

  todos.push(newTodo);
  todoInput.value = "";

  saveAndRender();
});


function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach(todo => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${todo.text}</span>
      <div class="actions">
        <button onclick="openEditModal(${todo.id})">✏️</button>
        <button onclick="deleteTodo(${todo.id})">🗑️</button>
      </div>
    `;

    todoList.appendChild(li);
  });
}


function openEditModal(id) {
  const todo = todos.find(t => t.id === id);
  if (!todo) return;

  currentTodoId = id;
  editInput.value = todo.text;
  editModal.style.display = "flex";
  editInput.focus();
}

saveBtn.addEventListener("click", () => {
  const newText = editInput.value.trim();
  if (newText === "") return;

  todos = todos.map(todo =>
    todo.id === currentTodoId
      ? { ...todo, text: newText }
      : todo
  );

  closeModal();
  saveAndRender();
});

cancelBtn.addEventListener("click", closeModal);


function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  saveAndRender();
}


function closeModal() {
  editModal.style.display = "none";
  editInput.value = "";
  currentTodoId = null;
}


function saveAndRender() {
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}
