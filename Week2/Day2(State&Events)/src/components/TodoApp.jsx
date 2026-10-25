import { useState } from "react";
import TodoForm from "./TodoForm";
import FilterBar from "./FilterBar";
import TodoList from "./TodoList";
import TodoFooter from "./TodoFooter";

const initialTodos = [
  { id: 1, text: "Learn React state and events", completed: true, priority: "High" },
  { id: 2, text: "Build React To-Do application", completed: false, priority: "High" },
  { id: 3, text: "Master lifting state up to parent", completed: false, priority: "Medium" },
  { id: 4, text: "Explore derived state during render", completed: false, priority: "Low" },
];

function getSavedTodos() {
  const saved = localStorage.getItem("todos_react_v2");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return initialTodos;
    }
  }
  return initialTodos;
}

export default function TodoApp() {
  const [todos, setTodos] = useState(getSavedTodos);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortByPriority, setSortByPriority] = useState("none");

  function saveAndSetTodos(nextTodos) {
    setTodos(nextTodos);
    localStorage.setItem("todos_react_v2", JSON.stringify(nextTodos));
  }

  function handleAddTodo(text, priority) {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false,
      priority: priority,
    };
    saveAndSetTodos([newTodo, ...todos]);
  }

  function handleToggleTodo(id) {
    const nextTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    saveAndSetTodos(nextTodos);
  }

  function handleDeleteTodo(id) {
    const nextTodos = todos.filter((todo) => todo.id !== id);
    saveAndSetTodos(nextTodos);
  }

  function handleEditTodo(id, newText) {
    const nextTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, text: newText };
      }
      return todo;
    });
    saveAndSetTodos(nextTodos);
  }

  function handleClearCompleted() {
    const nextTodos = todos.filter((todo) => !todo.completed);
    saveAndSetTodos(nextTodos);
  }

  const priorityWeights = { High: 3, Medium: 2, Low: 1 };

  const filteredTodos = todos
    .filter((todo) => {
      const matchesFilter =
        filter === "active"
          ? !todo.completed
          : filter === "done"
          ? todo.completed
          : true;

      const matchesSearch = todo.text
        .toLowerCase()
        .includes(searchQuery.toLowerCase().trim());

      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      if (sortByPriority === "high-to-low") {
        return priorityWeights[b.priority] - priorityWeights[a.priority];
      }
      if (sortByPriority === "low-to-high") {
        return priorityWeights[a.priority] - priorityWeights[b.priority];
      }
      return 0;
    });

  const tasksLeft = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="todo-app-card">
      <header className="todo-header">
        <h1>React To-Do App</h1>
        <p className="subtitle">Week 2 Day 2 · State & Events</p>
      </header>

      <TodoForm onAddTodo={handleAddTodo} />

      <FilterBar
        filter={filter}
        onFilterChange={setFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortByPriority={sortByPriority}
        onSortChange={setSortByPriority}
      />

      <TodoList
        todos={filteredTodos}
        onToggle={handleToggleTodo}
        onDelete={handleDeleteTodo}
        onEdit={handleEditTodo}
      />

      <TodoFooter
        tasksLeft={tasksLeft}
        completedCount={completedCount}
        onClearCompleted={handleClearCompleted}
      />
    </div>
  );
}
