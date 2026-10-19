import { useEffect, useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import RecipeGrid from './components/RecipeGrid';
import LoadingSkeleton from './components/LoadingSkeleton';
import EmptyState from './components/EmptyState';
import ErrorMessage from './components/ErrorMessage';
import RecipeDetailModal from './components/RecipeDetailModal';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMealId, setSelectedMealId] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  // Derived state: calculate debouncing state during render (You Might Not Need an Effect)
  const isDebouncing = searchTerm.trim() !== debouncedQuery.trim();

  // Requirement 1: Search runs 500 ms after you stop typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  // Requirement 6: Older, slower response never overwrites newer results (Race condition handling)
  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();

    async function fetchRecipes() {
      setLoading(true);
      setError(null);

      try {
        let url = '';
        const trimmedQuery = debouncedQuery.trim();

        if (trimmedQuery) {
          url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(trimmedQuery)}`;
        } else if (selectedCategory) {
          url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(selectedCategory)}`;
        } else {
          url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        }

        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        // Check if effect was superseded by a newer run
        if (!ignore) {
          let results = data.meals || [];

          // If searching with keyword AND category filter is active, filter client-side
          if (trimmedQuery && selectedCategory) {
            results = results.filter(
              (meal) =>
                meal.strCategory &&
                meal.strCategory.toLowerCase() === selectedCategory.toLowerCase()
            );
          }

          // If fetched via filter.php?c=, enrich with selectedCategory
          if (!trimmedQuery && selectedCategory && results.length > 0) {
            results = results.map((meal) => ({
              ...meal,
              strCategory: meal.strCategory || selectedCategory,
              strArea: meal.strArea || 'Global',
            }));
          }

          setRecipes(results);
          setLoading(false);
        }
      } catch (err) {
        if (err.name === 'AbortError') {
          return;
        }
        if (!ignore) {
          setError(
            err.message ||
              'Unable to fetch recipes from TheMealDB. Please verify your internet connection.'
          );
          setLoading(false);
        }
      }
    }

    fetchRecipes();

    // Cleanup: ignore stale response and abort network request
    return () => {
      ignore = true;
      controller.abort();
    };
  }, [debouncedQuery, selectedCategory, retryCount]);

  const handleSelectTag = (tag) => {
    setSearchTerm(tag);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setDebouncedQuery('');
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setDebouncedQuery('');
    setSelectedCategory('');
  };

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
  };

  return (
    <div className="app-wrapper">
      <Header />

      <main className="container" style={{ flex: 1, paddingBottom: '3rem' }}>
        <section className="hero-section">
          <h2 className="hero-title">Culinary Inspiration in Seconds</h2>
          <p className="hero-subtitle">
            Explore thousands of tested recipes with debounced live search,
            instant category filtering, and step-by-step instructions.
          </p>

          <div className="controls-container">
            <div className="search-filter-row">
              <div style={{ flex: 1 }}>
                <SearchBar
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  onClear={handleClearSearch}
                  isDebouncing={isDebouncing}
                  onSelectTag={handleSelectTag}
                  activeTag={searchTerm.toLowerCase()}
                />
              </div>

              <CategoryFilter
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>
          </div>
        </section>

        <div className="status-bar">
          <div className="status-indicator">
            {loading ? (
              <span>Fetching recipes from API...</span>
            ) : (
              <span>
                Showing <strong>{recipes.length}</strong>{' '}
                {recipes.length === 1 ? 'recipe' : 'recipes'}
                {debouncedQuery && ` for "${debouncedQuery}"`}
                {selectedCategory && ` in ${selectedCategory}`}
              </span>
            )}
          </div>

          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Debounce: 500ms • Auto-abort active
          </div>
        </div>

        {/* Dynamic Display: Loading Skeleton, Error with Retry, Empty State, or Results Grid */}
        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorMessage message={error} onRetry={handleRetry} />
        ) : recipes.length === 0 ? (
          <EmptyState
            query={debouncedQuery}
            selectedCategory={selectedCategory}
            onReset={handleResetFilters}
          />
        ) : (
          <RecipeGrid
            recipes={recipes}
            onSelectRecipe={(id) => setSelectedMealId(id)}
          />
        )}
      </main>

      {/* Detail Modal Dialog */}
      {selectedMealId && (
        <RecipeDetailModal
          mealId={selectedMealId}
          onClose={() => setSelectedMealId(null)}
        />
      )}

      <footer className="app-footer">
        <div className="container footer-inner">
          <div>
            <strong>Week 2 Day 3:</strong> Effects and Data Fetching (TheMealDB)
          </div>
          <div>Built with React 19 & Vite • Modern UI/UX</div>
        </div>
      </footer>
    </div>
  );
}
