// =============================================================================
// Week 1 Day 4: To-Do App
// Concepts: DOM Selection, Events, Event Bubbling/Delegation, and localStorage
// =============================================================================

// 1. App State (Single source of truth)
let todos = [];
let currentFilter = 'all'; // Can be 'all', 'active', or 'done'
let editingId = null;      // Keeps track of which task is being edited

// 2. Select DOM Elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const tasksLeftSpan = document.getElementById('tasks-left');
const clearCompletedBtn = document.getElementById('clear-completed-btn');
const filterButtons = document.querySelectorAll('.filter-btn');

// 3. LocalStorage Helpers
function saveTodos() {
  localStorage.setItem('todos_data', JSON.stringify(todos));
}

function loadTodos() {
  const savedData = localStorage.getItem('todos_data');
  if (savedData) {
    todos = JSON.parse(savedData);
  } else {
    // Default starter tasks for first-time view
    todos = [
      { id: 1, text: 'Learn JavaScript DOM basics', completed: true },
      { id: 2, text: 'Build simple To-Do application', completed: false }
    ];
    saveTodos();
  }
}

// 4. Helper to prevent HTML injection in text
function sanitizeText(str) {
  const temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
}

// 5. Single Render Function
// Redraws the whole list based on the todos array and current filter
function render() {
  // Clear the list
  todoList.innerHTML = '';

  // Filter tasks based on selected filter
  let filteredTodos = todos;
  if (currentFilter === 'active') {
    filteredTodos = todos.filter(task => !task.completed);
  } else if (currentFilter === 'done') {
    filteredTodos = todos.filter(task => task.completed);
  }

  // Show message if list is empty
  if (filteredTodos.length === 0) {
    const emptyLi = document.createElement('li');
    emptyLi.className = 'empty-msg';
    emptyLi.textContent = 'No tasks to show.';
    todoList.appendChild(emptyLi);
  } else {
    // Create elements for each task
    filteredTodos.forEach(task => {
      const li = document.createElement('li');
      li.className = 'todo-item' + (task.completed ? ' completed' : '');
      li.dataset.id = task.id;

      // If user is double-clicking to edit this task
      if (editingId === task.id) {
        li.innerHTML = `
          <input type="text" class="todo-edit-input" value="${sanitizeText(task.text)}">
        `;
      } else {
        // Normal display mode
        li.innerHTML = `
          <input type="checkbox" class="todo-checkbox" ${task.completed ? 'checked' : ''}>
          <span class="todo-text">${sanitizeText(task.text)}</span>
          <button type="button" class="delete-btn">Delete</button>
        `;
      }

      todoList.appendChild(li);
    });
  }

  // If in edit mode, focus the input field automatically
  if (editingId !== null) {
    const editInput = todoList.querySelector('.todo-edit-input');
    if (editInput) {
      editInput.focus();
      editInput.select();
    }
  }

  // Update footer: active tasks left
  const activeCount = todos.filter(task => !task.completed).length;
  const word = activeCount === 1 ? 'task' : 'tasks';
  tasksLeftSpan.textContent = `${activeCount} ${word} left`;

  // Update "Clear completed" button (disabled if no completed tasks)
  const completedCount = todos.filter(task => task.completed).length;
  clearCompletedBtn.disabled = completedCount === 0;
}

// 6. Action Functions
function addTask(text) {
  const trimmed = text.trim();
  // Ignore empty input
  if (trimmed === '') return;

  const newTask = {
    id: Date.now(), // Unique ID using timestamp
    text: trimmed,
    completed: false
  };

  todos.push(newTask);
  saveTodos();
  render();
}

function toggleTask(id) {
  const task = todos.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTodos();
    render();
  }
}

function deleteTask(id) {
  todos = todos.filter(task => task.id !== id);
  if (editingId === id) editingId = null;
  saveTodos();
  render();
}

function startEditing(id) {
  editingId = id;
  render();
}

function finishEditing(id, newText) {
  const trimmed = newText.trim();
  if (trimmed === '') {
    // If text is cleared, delete the task
    deleteTask(id);
  } else {
    const task = todos.find(t => t.id === id);
    if (task) {
      task.text = trimmed;
    }
    editingId = null;
    saveTodos();
    render();
  }
}

function cancelEditing() {
  editingId = null;
  render();
}

function clearCompletedTasks() {
  todos = todos.filter(task => !task.completed);
  saveTodos();
  render();
}

// 7. Event Listeners

// A. Form Submit (Enter key or Add button)
// We use e.preventDefault() so the browser doesn't reload the page
todoForm.addEventListener('submit', function (e) {
  e.preventDefault();
  addTask(todoInput.value);
  todoInput.value = '';
});

// B. Event Delegation on the To-Do List (Event Bubbling)
// Instead of adding listeners to every single item, we listen on the parent <ul>

// Handle Click (Delete button)
todoList.addEventListener('click', function (e) {
  if (e.target.classList.contains('delete-btn')) {
    const li = e.target.closest('.todo-item');
    const id = Number(li.dataset.id);
    deleteTask(id);
  }
});

// Handle Checkbox Change (Toggle completed)
todoList.addEventListener('change', function (e) {
  if (e.target.classList.contains('todo-checkbox')) {
    const li = e.target.closest('.todo-item');
    const id = Number(li.dataset.id);
    toggleTask(id);
  }
});

// Handle Double-Click (Stretch requirement: edit task)
todoList.addEventListener('dblclick', function (e) {
  if (e.target.classList.contains('todo-text')) {
    const li = e.target.closest('.todo-item');
    const id = Number(li.dataset.id);
    startEditing(id);
  }
});

// Handle Keydown in edit input (Enter to save, Escape to cancel)
todoList.addEventListener('keydown', function (e) {
  if (e.target.classList.contains('todo-edit-input')) {
    const li = e.target.closest('.todo-item');
    const id = Number(li.dataset.id);

    if (e.key === 'Enter') {
      finishEditing(id, e.target.value);
    } else if (e.key === 'Escape') {
      cancelEditing();
    }
  }
});

// Handle Blur (Save edit when user clicks outside)
todoList.addEventListener('focusout', function (e) {
  if (e.target.classList.contains('todo-edit-input')) {
    const li = e.target.closest('.todo-item');
    const id = Number(li.dataset.id);
    finishEditing(id, e.target.value);
  }
});

// C. Filter Buttons
filterButtons.forEach(button => {
  button.addEventListener('click', function () {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    // Add active class to clicked button
    this.classList.add('active');
    // Set current filter
    currentFilter = this.dataset.filter;
    // Re-render
    render();
  });
});

// D. Clear Completed Button
clearCompletedBtn.addEventListener('click', clearCompletedTasks);

// 8. Initial Load
loadTodos();
render();
