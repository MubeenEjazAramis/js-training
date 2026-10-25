import RecipeCard from './RecipeCard';

export default function RecipeGrid({ recipes, onSelectRecipe }) {
  return (
    <section className="recipes-grid" aria-label="Recipe search results">
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
