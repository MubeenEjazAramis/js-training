import { useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';
import { useFavorites } from '../context/FavoritesContext';

// Component 2 using the custom useFetch hook!
// Fetches full recipe details (ingredients, measurements, instructions) by ID
export default function RecipeDetailModal({ mealId, onClose }) {
  // Use custom hook useFetch!
  const apiUrl = mealId
    ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    : null;

  const { data, loading, error, refetch } = useFetch(apiUrl);

  // Consume FavoritesContext to allow favoriting directly inside modal
  const { isFavorite, toggleFavorite } = useFavorites();

  const meal = data && data.meals && data.meals.length > 0 ? data.meals[0] : null;
  const isFav = meal ? isFavorite(meal.idMeal) : false;

  // Close modal when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!mealId) return null;

  // Extract ingredients and measurements from TheMealDB format (strIngredient1-20)
  const ingredients = [];
  if (meal) {
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          ingredient: ingredient.trim(),
          measure: measure ? measure.trim() : '',
        });
      }
    }
  }

  // Split instructions into clear readable paragraphs
  const instructionsList = meal?.strInstructions
    ? meal.strInstructions
        .split(/\r?\n/)
        .map((p) => p.trim())
        .filter((p) => p.length > 0)
    : [];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-recipe-title"
      >
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close recipe details"
        >
          &times;
        </button>

        {loading ? (
          <div className="modal-loading-state">
            <div className="loading-spinner"></div>
            <p>Loading recipe secrets from TheMealDB...</p>
          </div>
        ) : error ? (
          <div className="modal-error-state">
            <h3>Could not load recipe details</h3>
            <p>{error}</p>
            <button
              type="button"
              className="practice-btn primary"
              onClick={refetch}
            >
              Retry
            </button>
          </div>
        ) : !meal ? (
          <div className="modal-empty-state">
            <p>No recipe found with ID #{mealId}.</p>
          </div>
        ) : (
          <div className="modal-body">
            {/* Modal Hero Banner */}
            <div className="modal-hero">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="modal-hero-image"
              />
              <div className="modal-hero-overlay">
                <div className="modal-hero-tags">
                  {meal.strCategory && (
                    <span className="card-category-badge">{meal.strCategory}</span>
                  )}
                  {meal.strArea && (
                    <span className="card-area-badge">{meal.strArea} Cuisine</span>
                  )}
                </div>
                <h2 id="modal-recipe-title" className="modal-hero-title">
                  {meal.strMeal}
                </h2>
              </div>
            </div>

            {/* Modal Controls Bar */}
            <div className="modal-actions-bar">
              <button
                type="button"
                className={`modal-favorite-btn ${isFav ? 'active' : ''}`}
                onClick={() => toggleFavorite(meal)}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill={isFav ? '#ef4444' : 'none'}
                  stroke={isFav ? '#ef4444' : 'currentColor'}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                <span>{isFav ? 'Favorited' : 'Add to Favorites'}</span>
              </button>

              {meal.strYoutube && (
                <a
                  href={meal.strYoutube}
                  target="_blank"
                  rel="noreferrer"
                  className="modal-video-link"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  <span>Watch Video</span>
                </a>
              )}
            </div>

            {/* Two-Column Details: Ingredients & Instructions */}
            <div className="modal-content-grid">
              {/* Ingredients List */}
              <div className="modal-ingredients-column">
                <h3 className="section-title">Ingredients ({ingredients.length})</h3>
                <ul className="ingredients-list">
                  {ingredients.map((item, index) => (
                    <li key={index} className="ingredient-item">
                      <span className="ingredient-bullet"></span>
                      <span className="ingredient-name">{item.ingredient}</span>
                      {item.measure && (
                        <span className="ingredient-measure">{item.measure}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cooking Instructions */}
              <div className="modal-instructions-column">
                <h3 className="section-title">Step-by-Step Instructions</h3>
                <div className="instructions-body">
                  {instructionsList.map((paragraph, index) => (
                    <p key={index} className="instruction-step">
                      <strong className="step-number">Step {index + 1}: </strong>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
