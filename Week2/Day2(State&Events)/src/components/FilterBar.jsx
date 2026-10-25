export default function FilterBar({
  filter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  sortByPriority,
  onSortChange,
}) {
  return (
    <div className="filter-bar">
      <div className="search-box">
        <input
          type="text"
          className="search-input"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <button
            type="button"
            className="clear-search-btn"
            onClick={() => onSearchChange("")}
          >
            ×
          </button>
        )}
      </div>

      <div className="filter-controls">
        <div className="filter-buttons">
          <button
            type="button"
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => onFilterChange("all")}
          >
            All
          </button>
          <button
            type="button"
            className={`filter-btn ${filter === "active" ? "active" : ""}`}
            onClick={() => onFilterChange("active")}
          >
            Active
          </button>
          <button
            type="button"
            className={`filter-btn ${filter === "done" ? "active" : ""}`}
            onClick={() => onFilterChange("done")}
          >
            Done
          </button>
        </div>

        <select
          className="sort-select"
          value={sortByPriority}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="none">Sort: Default</option>
          <option value="high-to-low">Priority: High → Low</option>
          <option value="low-to-high">Priority: Low → High</option>
        </select>
      </div>
    </div>
  );
}
