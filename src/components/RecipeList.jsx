import RecipeCard from './RecipeCard';
import RandomRecipeCard from './RandomRecipeCard';

export default function RecipeList({ recipes, isLoading }) {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!isLoading && recipes.length === 0) {
    return <p>No recipes found</p>;
  }

  return (
    <div className="flex flex-wrap">
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4"
        >
          {recipe.missedIngredientCount !== undefined ? (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ) : (
            <RandomRecipeCard key={recipe.id} recipe={recipe} />
          )}
        </div>
      ))}
    </div>
  );
}
