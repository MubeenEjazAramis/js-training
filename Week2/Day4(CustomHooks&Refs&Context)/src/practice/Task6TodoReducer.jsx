import { useReducer, useState } from 'react';
import { todoReducer, initialTodos } from './todoReducer';

// Task 6: Convert Monday's to-do state to useReducer with added, toggled, deleted, cleared actions
export default function Task6TodoReducer() {
  // Step 1: Initialize state with useReducer instead of useState
  const [todos, dispatch] = useReducer(todoReducer, initialTodos);
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('Medium');

  // Handle adding new todo
  const handleAdd = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    // Dispatch 'added' action
    dispatch({
      type: 'added',
      text: text,
      priority: priority,
    });

    setText('');
  };

  // Handle toggle
  const handleToggle = (id) => {
    dispatch({ type: 'toggled', id });
  };

  // Handle delete
  const handleDelete = (id) => {
    dispatch({ type: 'deleted', id });
  };

  // Handle clear completed
  const handleClearCompleted = () => {
    dispatch({ type: 'cleared' });
  };

  // Derived state calculated during render (no extra state needed!)
  const completedCount = todos.filter((t) => t.completed).length;
  const activeCount = todos.length - completedCount;

  return (
    <div className="practice-card">
      <div className="practice-header">
        <span className="practice-badge">Task 6</span>
        <h3>To-Do State with useReducer</h3>
      </div>

      <p className="practice-desc">
        Refactored state management from multiple <code>useState</code> setters into a consolidated{' '}
        <code>useReducer</code> handling <code>added</code>, <code>toggled</code>,{' '}
        <code>deleted</code>, and <code>cleared</code> actions.
      </p>

      <div className="practice-demo">
        {/* Form to add item */}
        <form onSubmit={handleAdd} className="todo-reducer-form">
          <input
            type="text"
            className="practice-input"
            placeholder="Add new task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <select
            className="practice-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>

          <button type="submit" className="practice-btn primary">
            Add
          </button>
        </form>

        {/* Action bar */}
        <div className="todo-reducer-status-bar">
          <span>
            <strong>{activeCount}</strong> active • <strong>{completedCount}</strong> completed
          </span>

          <button
            type="button"
            className="practice-btn secondary btn-sm"
            onClick={handleClearCompleted}
            disabled={completedCount === 0}
          >
            Clear Completed
          </button>
        </div>

        {/* Todo items list */}
        <ul className="todo-reducer-list">
          {todos.length === 0 ? (
            <li className="todo-reducer-empty">All tasks cleared! Great job!</li>
          ) : (
            todos.map((todo) => {
              const priorityClass =
                todo.priority === 'High'
                  ? 'priority-high'
                  : todo.priority === 'Medium'
                  ? 'priority-medium'
                  : 'priority-low';

              return (
                <li
                  key={todo.id}
                  className={`todo-reducer-item ${todo.completed ? 'completed' : ''}`}
                >
                  <label className="todo-reducer-checkbox-label">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggle(todo.id)}
                    />
                    <span className="todo-text">{todo.text}</span>
                  </label>

                  <div className="todo-reducer-item-actions">
                    <span className={`priority-badge ${priorityClass}`}>
                      {todo.priority}
                    </span>
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => handleDelete(todo.id)}
                      title="Delete task"
                    >
                      &times;
                    </button>
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </div>

      <div className="practice-explanation">
        <strong>Beginner Note:</strong> <code>useReducer</code> is great when state transitions
        involve multiple steps or when your state logic gets complicated. Instead of telling React{' '}
        <em>"what state to set"</em>, components dispatch actions describing <em>"what happened"</em>!
      </div>
    </div>
  );
}
