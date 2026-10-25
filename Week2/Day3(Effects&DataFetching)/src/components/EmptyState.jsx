export default function EmptyState({ query, selectedCategory, onReset }) {
  return (
    <div className="message-container" role="status">
      <div className="message-icon" style={{ color: 'var(--text-muted)' }}>
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
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
          <line x1="8" y1="11" x2="14" y2="11" />
        </svg>
      </div>
      <h2 className="message-title">No Recipes Found</h2>
      <p className="message-text">
        {query
          ? `We couldn't find any recipes matching "${query}"${
              selectedCategory ? ` in category "${selectedCategory}"` : ''
            }.`
          : selectedCategory
          ? `No recipes found in category "${selectedCategory}".`
          : 'No recipes found matching your criteria.'}
        <br />
        Try searching for popular ingredients like <strong>Chicken</strong>, <strong>Pasta</strong>, <strong>Beef</strong>, or select <strong>All Categories</strong>.
      </p>
      <button
        id="empty-reset-btn"
        type="button"
        className="retry-button"
        onClick={onReset}
      >
        Reset Filters & Show All
      </button>
    </div>
  );
}
