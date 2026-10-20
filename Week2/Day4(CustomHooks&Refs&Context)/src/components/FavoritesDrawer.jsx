import { useEffect } from 'react';
import { useFavorites } from '../context/FavoritesContext';

export default function FavoritesDrawer({ onSelectRecipe }) {
  const {
    favorites,
    favoritesCount,
    isDrawerOpen,
    closeDrawer,
    removeFavorite,
    clearFavorites,
  } = useFavorites();

  // Close drawer on 'Escape' key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        closeDrawer();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen, closeDrawer]);

  if (!isDrawerOpen) return null;

  return (
    <div className="drawer-overlay" onClick={closeDrawer}>
      <aside
        className="drawer-panel"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        aria-label="Favorites panel"
      >
        <div className="drawer-header">
          <div className="drawer-header-title">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="#ef4444"
              stroke="#ef4444"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            <h3>Favorite Recipes ({favoritesCount})</h3>
          </div>

          <button
            type="button"
            className="drawer-close-btn"
            onClick={closeDrawer}
            aria-label="Close favorites panel"
          >
            &times;
          </button>
        </div>

        <div className="drawer-content">
          {favorites.length === 0 ? (
            <div className="drawer-empty-state">
              <div className="empty-heart-icon">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--text-muted)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <h4>No favorites yet!</h4>
              <p>
                Click the heart icon on any recipe card to save your favorite dishes here.
                They will stay saved even when you refresh the page!
              </p>
            </div>
          ) : (
            <div className="drawer-list">
              {favorites.map((meal) => (
                <div key={meal.idMeal} className="drawer-item">
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="drawer-item-thumb"
                  />

                  <div className="drawer-item-info">
                    <h4 className="drawer-item-title" title={meal.strMeal}>
                      {meal.strMeal}
                    </h4>
                    <span className="drawer-item-category">
                      {meal.strCategory || 'General'}
                    </span>

                    <div className="drawer-item-actions">
                      <button
                        type="button"
                        className="drawer-view-btn"
                        onClick={() => {
                          onSelectRecipe(meal.idMeal);
                          closeDrawer();
                        }}
                      >
                        View
                      </button>
                      <button
                        type="button"
                        className="drawer-remove-btn"
                        onClick={() => removeFavorite(meal.idMeal)}
                        title="Remove from favorites"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {favorites.length > 0 && (
          <div className="drawer-footer">
            <button
              type="button"
              className="drawer-clear-btn"
              onClick={clearFavorites}
            >
              Clear All Favorites
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
