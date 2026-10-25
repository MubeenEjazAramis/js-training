import { useEffect, useState } from 'react';

export default function RecipeDetailModal({ mealId, onClose }) {
  const [mealDetails, setMealDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Close modal when pressing the Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Fetch recipe details by ID using lookup.php?i=
  useEffect(() => {
    if (!mealId) return;

    let ignore = false;
    const controller = new AbortController();

    async function fetchMealDetails() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`,
          { signal: controller.signal }
        );
        if (!response.ok) throw new Error('Failed to load recipe details');
        const data = await response.json();

        if (!ignore) {
          if (data.meals && data.meals.length > 0) {
            setMealDetails(data.meals[0]);
          } else {
            setError('Recipe details not found');
          }
          setLoading(false);
        }
      } catch (err) {
        if (err.name === 'AbortError') return;
        if (!ignore) {
          setError(err.message || 'Error loading recipe');
          setLoading(false);
        }
      }
    }

    fetchMealDetails();

    return () => {
      ignore = true;
      controller.abort();
    };
  }, [mealId]);

  // Extract ingredients and corresponding measurements
  const getIngredients = (meal) => {
    if (!meal) return [];
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          id: i,
          name: ingredient.trim(),
          measure: measure ? measure.trim() : '',
        });
      }
    }
    return ingredients;
  };

  const ingredientsList = mealDetails ? getIngredients(mealDetails) : [];

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="recipe-modal-title"
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          id="close-modal-btn"
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal (Escape)"
        >
          <svg
            width="16"
            height="16"
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

        {loading ? (
          <div style={{ padding: '4rem', textAlign: 'center' }}>
            <div className="message-icon" style={{ color: 'var(--accent-primary)' }}>
              <svg
                width="44"
                height="44"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h3>Loading recipe details...</h3>
          </div>
        ) : error ? (
          <div style={{ padding: '3rem', textAlign: 'center' }}>
            <div className="message-icon" style={{ color: '#ef4444' }}>
              <svg
                width="44"
                height="44"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <h3>{error}</h3>
            <button
              type="button"
              className="retry-button"
              style={{ marginTop: '1rem' }}
              onClick={onClose}
            >
              Close
            </button>
          </div>
        ) : mealDetails ? (
          <>
            <div className="modal-header-hero">
              <img
                src={mealDetails.strMealThumb}
                alt={mealDetails.strMeal}
                className="modal-hero-img"
              />
              <div className="modal-hero-overlay">
                <h2 id="recipe-modal-title" className="modal-title">
                  {mealDetails.strMeal}
                </h2>
                <div className="modal-badges">
                  {mealDetails.strCategory && (
                    <span className="modal-badge badge-cat">
                      Category: {mealDetails.strCategory}
                    </span>
                  )}
                  {mealDetails.strArea && (
                    <span className="modal-badge badge-area">
                      {mealDetails.strArea} Cuisine
                    </span>
                  )}
                  {mealDetails.strTags && (
                    <span
                      className="modal-badge"
                      style={{ background: 'rgba(255,255,255,0.1)' }}
                    >
                      Tags: {mealDetails.strTags.split(',').join(', ')}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="modal-body">
              <section className="modal-section">
                <h3 className="modal-section-title">
                  Ingredients & Measurements
                </h3>
                <div className="ingredients-grid">
                  {ingredientsList.map((item) => (
                    <div key={item.id} className="ingredient-item">
                      <span className="ingredient-name">{item.name}</span>
                      <span className="ingredient-measure">{item.measure}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="modal-section">
                <h3 className="modal-section-title">
                  Cooking Instructions
                </h3>
                <p className="instructions-text">{mealDetails.strInstructions}</p>
              </section>

              <div className="modal-actions">
                {mealDetails.strYoutube && (
                  <a
                    href={mealDetails.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-link link-youtube"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      style={{ marginRight: '0.25rem' }}
                    >
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    </svg>
                    Watch Video on YouTube
                  </a>
                )}
                {mealDetails.strSource && (
                  <a
                    href={mealDetails.strSource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-link link-source"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ marginRight: '0.25rem' }}
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    View Original Source
                  </a>
                )}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
