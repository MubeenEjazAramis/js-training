import { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import RecipeGrid from './components/RecipeGrid';
import LoadingSkeleton from './components/LoadingSkeleton';
import EmptyState from './components/EmptyState';
import ErrorMessage from './components/ErrorMessage';
import RecipeDetailModal from './components/RecipeDetailModal';
import FavoritesDrawer from './components/FavoritesDrawer';
import Footer from './components/Footer';
import PracticeDashboard from './practice/PracticeDashboard';

// Custom Hooks
import { useDebounce } from './hooks/useDebounce';
import { useFetch } from './hooks/useFetch';

export default function App() {
  // Navigation view: 'recipes' (Recipe App v2) or 'practice' (Practice Lab 6 tasks)
  const [activeView, setActiveView] = useState('recipes');

  // Search input state
  const [searchTerm, setSearchTerm] = useState('');

  // Requirement: useDebounce custom hook powering search (500ms delay)
  const debouncedQuery = useDebounce(searchTerm, 500);

  // Derived debounce state during render
  const isDebouncing = searchTerm.trim() !== debouncedQuery.trim();

  // Category filter state
  const [selectedCategory, setSelectedCategory] = useState('');

  // Modal detail ID
  const [selectedMealId, setSelectedMealId] = useState(null);

  // Calculate API URL for TheMealDB based on search or category
  const trimmedQuery = debouncedQuery.trim();
  let apiUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  if (trimmedQuery) {
    apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(trimmedQuery)}`;
  } else if (selectedCategory) {
    apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(selectedCategory)}`;
  }

  // Requirement: useFetch custom hook returning { data, loading, error, refetch }
  // Used in App.jsx, CategoryFilter.jsx, and RecipeDetailModal.jsx (3 components!)
  const { data, loading, error, refetch } = useFetch(apiUrl);

  // Process recipes from API response
  let recipes = data?.meals || [];

  // If both a search query and category filter are active, filter client-side
  if (trimmedQuery && selectedCategory && recipes.length > 0) {
    recipes = recipes.filter(
      (meal) =>
        meal.strCategory &&
        meal.strCategory.toLowerCase() === selectedCategory.toLowerCase()
    );
  }

  // If fetched by category filter, assign category name fallback
  if (!trimmedQuery && selectedCategory && recipes.length > 0) {
    recipes = recipes.map((meal) => ({
      ...meal,
      strCategory: meal.strCategory || selectedCategory,
      strArea: meal.strArea || 'International',
    }));
  }

  // Handler functions for controls
  const handleSelectTag = (tag) => {
    setSearchTerm(tag);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
  };

  return (
    <div className="app-wrapper">
      {/* Header with ThemeContext & FavoritesContext integrations */}
      <Header activeView={activeView} onViewChange={setActiveView} />

      <main className="container" style={{ flex: 1, paddingBottom: '3rem' }}>
        {activeView === 'practice' ? (
          // View 2: Interactive Practice Lab (All 6 Day 4 tasks)
          <PracticeDashboard />
        ) : (
          // View 1: Recipe App v2 (Refactored with custom hooks and context)
          <>
            <section className="hero-section">
              <h2 className="hero-title">Culinary Inspiration in Seconds</h2>
              <p className="hero-subtitle">
                Explore thousands of tested recipes with custom hooks (<code>useFetch</code>,{' '}
                <code>useDebounce</code>), <code>ThemeContext</code>, and persistent{' '}
                <code>FavoritesContext</code> with zero prop drilling!
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

            {/* Status bar */}
            <div className="status-bar">
              <div className="status-indicator">
                {loading ? (
                  <span>Fetching recipes via <code>useFetch</code>...</span>
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
                Powered by <code>useDebounce(500ms)</code> • <code>useFetch()</code>
              </div>
            </div>

            {/* Content states */}
            {loading ? (
              <LoadingSkeleton />
            ) : error ? (
              <ErrorMessage message={error} onRetry={refetch} />
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
          </>
        )}
      </main>

      {/* Global Favorites Slide-out Drawer */}
      <FavoritesDrawer onSelectRecipe={(id) => setSelectedMealId(id)} />

      {/* Global Recipe Detail Modal */}
      {selectedMealId && (
        <RecipeDetailModal
          mealId={selectedMealId}
          onClose={() => setSelectedMealId(null)}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
