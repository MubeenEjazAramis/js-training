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
          ✕
        </button>

        {loading ? (
          <div style={{ padding: '4rem', textAlign: 'center' }}>
            <div className="message-icon">⏳</div>
            <h3>Loading recipe details...</h3>
          </div>
        ) : error ? (
          <div style={{ padding: '3rem', textAlign: 'center' }}>
            <div className="message-icon">⚠️</div>
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
                      📂 {mealDetails.strCategory}
                    </span>
                  )}
                  {mealDetails.strArea && (
                    <span className="modal-badge badge-area">
                      🌍 {mealDetails.strArea} Cuisine
                    </span>
                  )}
                  {mealDetails.strTags && (
                    <span
                      className="modal-badge"
                      style={{ background: 'rgba(255,255,255,0.1)' }}
                    >
                      🏷️ {mealDetails.strTags.split(',').join(', ')}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="modal-body">
              <section className="modal-section">
                <h3 className="modal-section-title">
                  <span>🥕</span> Ingredients & Measurements
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
                  <span>📖</span> Cooking Instructions
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
                    ▶ Watch Video on YouTube
                  </a>
                )}
                {mealDetails.strSource && (
                  <a
                    href={mealDetails.strSource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-link link-source"
                  >
                    🔗 View Original Source
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
