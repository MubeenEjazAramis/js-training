export default function EmptyState({ query, selectedCategory, onReset }) {
  return (
    <div className="message-container" role="status">
      <div className="message-icon">🍲</div>
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
