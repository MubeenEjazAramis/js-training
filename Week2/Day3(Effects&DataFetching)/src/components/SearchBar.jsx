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
        <span className="search-icon">🔍</span>
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
            ✕
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
            ⏳ Typing (500ms debounce)...
          </span>
        )}
      </div>
    </div>
  );
}
