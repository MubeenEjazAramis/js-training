export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="message-container" role="alert">
      <div className="message-icon">⚠️</div>
      <h2 className="message-title" style={{ color: '#ef4444' }}>
        Unable to Load Recipes
      </h2>
      <p className="message-text">
        {message || 'A network error occurred while fetching data from TheMealDB API.'}
      </p>
      <button
        id="retry-fetch-btn"
        type="button"
        className="retry-button"
        onClick={onRetry}
      >
        🔄 Retry Search
      </button>
    </div>
  );
}
