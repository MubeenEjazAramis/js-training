import { useRef } from 'react';

export default function SearchBar({
  searchTerm,
  onSearchChange,
  onClear,
  isDebouncing,
  onSelectTag,
  activeTag,
}) {
  // Use a ref for direct access to the search input element
  const inputRef = useRef(null);

  const quickTags = ['Chicken', 'Pasta', 'Beef', 'Soup', 'Dessert', 'Seafood'];

  const handleClear = () => {
    onClear();
    // Re-focus input after clearing so user can keep typing immediately
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
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
          ref={inputRef}
          id="recipe-search-input"
          type="text"
          className="search-input"
          placeholder="Search recipes (e.g. Pasta, Chicken, Biryani)..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search recipes"
        />

        {/* Debounce indicator badge */}
        {isDebouncing && (
          <span className="debouncing-pill" title="Waiting 500ms for pause in typing...">
            <span className="debouncing-dot"></span>
            typing...
          </span>
        )}

        {/* Clear Button */}
        {searchTerm && (
          <button
            type="button"
            className="clear-search-btn"
            onClick={handleClear}
            aria-label="Clear search input"
            title="Clear search"
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

      {/* Quick Search Tag Chips */}
      <div className="quick-tags-container">
        <span className="quick-tags-label">Popular:</span>
        <div className="quick-tags-list">
          {quickTags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`tag-chip ${activeTag === tag.toLowerCase() ? 'active' : ''}`}
              onClick={() => onSelectTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
