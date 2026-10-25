import RecipeCard from './RecipeCard';

// RecipeGrid does not need to handle favorites props, because RecipeCard uses FavoritesContext!
export default function RecipeGrid({ recipes, onSelectRecipe }) {
  return (
    <section className="recipe-grid" aria-label="Recipe Results">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.idMeal}
          recipe={recipe}
          onSelectRecipe={onSelectRecipe}
        />
      ))}
    </section>
  );
}
