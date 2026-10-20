export default function RecipeCard({ recipe, onSelectRecipe }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelectRecipe(recipe.idMeal);
    }
  };

  return (
    <article
      className="recipe-card"
      onClick={() => onSelectRecipe(recipe.idMeal)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View recipe details for ${recipe.strMeal}`}
    >
      <div className="card-image-container">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="card-image"
          loading="lazy"
        />
        {recipe.strCategory && (
          <span className="card-category-badge">{recipe.strCategory}</span>
        )}
        {recipe.strArea && (
          <span className="card-area-badge">{recipe.strArea}</span>
        )}
      </div>

      <div className="card-content">
        <h3 className="card-title" title={recipe.strMeal}>
          {recipe.strMeal}
        </h3>
        <div className="card-footer">
          <span style={{ color: 'var(--text-muted)' }}>ID: #{recipe.idMeal}</span>
          <button
            type="button"
            className="view-btn"
            onClick={(e) => {
              e.stopPropagation();
              onSelectRecipe(recipe.idMeal);
            }}
          >
            <span>View Recipe</span>
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
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
