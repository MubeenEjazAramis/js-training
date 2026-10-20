export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="message-container error-state" role="alert">
      <div className="message-icon" style={{ color: 'var(--color-danger, #ef4444)' }}>
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h2 className="message-title">Failed to Load Recipes</h2>
      <p className="message-text">
        {message || 'An unexpected error occurred while communicating with TheMealDB.'}
      </p>
      {onRetry && (
        <button
          id="error-retry-btn"
          type="button"
          className="retry-button"
          onClick={onRetry}
        >
          Retry Connection
        </button>
      )}
    </div>
  );
}
