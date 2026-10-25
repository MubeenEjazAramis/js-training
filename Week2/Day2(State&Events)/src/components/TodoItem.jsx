import { useState } from "react";

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftText, setDraftText] = useState(todo.text);

  function handleSave() {
    const clean = draftText.trim();
    if (clean) {
      onEdit(todo.id, clean);
      setIsEditing(false);
    } else {
      onDelete(todo.id);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setDraftText(todo.text);
      setIsEditing(false);
    }
  }

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      {isEditing ? (
        <div className="edit-container">
          <input
            type="text"
            className="edit-input"
            value={draftText}
            onChange={(e) => setDraftText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <button type="button" className="save-btn" onClick={handleSave}>
            Save
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => {
              setDraftText(todo.text);
              setIsEditing(false);
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <div className="todo-left">
            <input
              type="checkbox"
              className="todo-checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
            />
            <span
              className={`priority-dot priority-${todo.priority.toLowerCase()}`}
              title={`Priority: ${todo.priority}`}
            ></span>
            <span
              className="todo-text"
              onDoubleClick={() => setIsEditing(true)}
              title="Double-click to edit"
            >
              {todo.text}
            </span>
          </div>

          <div className="todo-right">
            <span className={`priority-tag tag-${todo.priority.toLowerCase()}`}>
              {todo.priority}
            </span>
            <button
              type="button"
              className="edit-btn"
              onClick={() => setIsEditing(true)}
              title="Edit task"
            >
              Edit
            </button>
            <button
              type="button"
              className="delete-btn"
              onClick={() => onDelete(todo.id)}
              title="Delete task"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}
