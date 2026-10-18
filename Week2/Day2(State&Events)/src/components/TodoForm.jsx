import { useState } from "react";

export default function TodoForm({ onAddTodo }) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("Medium");

  function handleSubmit(e) {
    e.preventDefault();
    const cleanText = text.trim();
    if (!cleanText) return;

    onAddTodo(cleanText, priority);
    setText("");
    setPriority("Medium");
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder="What needs to be done?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select
        className="priority-select"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="High">High Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="Low">Low Priority</option>
      </select>
      <button type="submit" className="add-btn">
        Add Task
      </button>
    </form>
  );
}
