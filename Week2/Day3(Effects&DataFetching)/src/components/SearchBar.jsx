export default function SearchBar({
  searchTerm,
  onSearchChange,
  onClear,
  isDebouncing,
  onSelectTag,
  activeTag,
}) {
  const quickTags = ['Chicken', 'Pasta', 'Beef', 'Seafood', 'Dessert', 'Curry'];

  return (
    <div className="search-bar-section">
      <div className="search-box-wrapper">
        <span className="search-icon">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          id="recipe-search-input"
          type="text"
          className="search-input"
          placeholder="Search recipes (e.g., Chicken Alfredo, Brownie, Curry)..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          autoComplete="off"
        />
        {searchTerm && (
          <button
            id="clear-search-btn"
            type="button"
            className="clear-search-btn"
            onClick={onClear}
            title="Clear search input"
            aria-label="Clear search"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      <div className="quick-tags-wrapper" style={{ marginTop: '0.85rem' }}>
        <span className="quick-tags-label">Quick Suggestions:</span>
        {quickTags.map((tag) => (
          <button
            key={tag}
            type="button"
            className={`quick-tag-chip ${activeTag === tag.toLowerCase() ? 'active' : ''}`}
            onClick={() => onSelectTag(tag)}
          >
            {tag}
          </button>
        ))}
        {isDebouncing && (
          <span className="debounce-indicator" title="Waiting 500ms after typing before triggering search">
            Typing (500ms debounce)...
          </span>
        )}
      </div>
    </div>
  );
}
