import { useFavorites } from '../context/FavoritesContext';

export default function RecipeCard({ recipe, onSelectRecipe }) {
  // Directly consume FavoritesContext without receiving it through props!
  // This solves prop drilling (> 2 levels)!
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(recipe.idMeal);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelectRecipe(recipe.idMeal);
    }
  };

  const handleHeartClick = (e) => {
    // Stop click from triggering card selection
    e.stopPropagation();
    toggleFavorite(recipe);
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

        {/* Favorite Heart Button overlaid on card image */}
        <button
          type="button"
          className={`card-heart-btn ${favorite ? 'active' : ''}`}
          onClick={handleHeartClick}
          title={favorite ? 'Remove from favorites' : 'Add to favorites'}
          aria-label={favorite ? `Remove ${recipe.strMeal} from favorites` : `Add ${recipe.strMeal} to favorites`}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={favorite ? '#ef4444' : 'none'}
            stroke={favorite ? '#ef4444' : '#ffffff'}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>

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
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            ID: #{recipe.idMeal}
          </span>
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
