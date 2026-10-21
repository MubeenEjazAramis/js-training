import { useFetch } from '../hooks/useFetch';

// Component 1 using the custom useFetch hook!
// Fetches the category list from TheMealDB API
export default function CategoryFilter({ selectedCategory, onSelectCategory }) {
  // Use our custom hook!
  const { data, loading, error, refetch } = useFetch(
    'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
  );

  // Extract category names if data exists
  const categories = data && data.meals ? data.meals.map((item) => item.strCategory) : [];

  return (
    <div className="category-dropdown-wrapper">
      <select
        id="category-filter-select"
        className="category-select"
        value={selectedCategory}
        onChange={(e) => onSelectCategory(e.target.value)}
        aria-label="Filter recipes by category"
      >
        <option value="">
          {loading ? 'Loading categories...' : 'All Categories'}
        </option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <span className="category-dropdown-icon">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </span>

      {error && (
        <button
          type="button"
          onClick={refetch}
          className="retry-inline-btn"
          title="Retry loading categories"
        >
          Retry
        </button>
      )}
    </div>
  );
}
