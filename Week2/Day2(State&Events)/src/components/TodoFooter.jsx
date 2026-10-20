export default function TodoFooter({
  tasksLeft,
  completedCount,
  onClearCompleted,
}) {
  const countLabel = tasksLeft === 1 ? "1 task left" : `${tasksLeft} tasks left`;

  return (
    <footer className="todo-footer">
      <span className="tasks-left">{countLabel}</span>
      <button
        type="button"
        className="clear-completed-btn"
        onClick={onClearCompleted}
        disabled={completedCount === 0}
      >
        Clear completed
      </button>
    </footer>
  );
}
