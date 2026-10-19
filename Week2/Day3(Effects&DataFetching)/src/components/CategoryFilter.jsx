import { useEffect, useState } from 'react';

export default function CategoryFilter({ selectedCategory, onSelectCategory }) {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();

    async function fetchCategories() {
      try {
        const response = await fetch(
          'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
          { signal: controller.signal }
        );
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        if (!ignore && data.meals) {
          setCategories(data.meals.map((item) => item.strCategory));
          setLoadingCategories(false);
        }
      } catch (err) {
        if (err.name === 'AbortError') return;
        if (!ignore) {
          setLoadingCategories(false);
        }
      }
    }

    fetchCategories();

    return () => {
      ignore = true;
      controller.abort();
    };
  }, []);

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
          {loadingCategories ? 'Loading categories...' : 'All Categories'}
        </option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <span className="category-dropdown-icon">▼</span>
    </div>
  );
}
