import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import defaultImage from '../assets/default.png';

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipeDetail, setRecipeDetail] = useState(null);

  useEffect(() => {
    let ignore = false;
    axios
      .get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=7fab15ee779d496dae604148504efc0e`
      )
      .then(function (response) {
        if (!ignore) {
          console.log(response);
          setRecipeDetail(response.data);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
    return () => {
      ignore = true;
    };
  }, [id]);

  if (!recipeDetail) {
    return <div>Loading...</div>;
  }

  const uniqueIngredients = recipeDetail.extendedIngredients.filter(
    (ingredient, index, self) =>
      index === self.findIndex((t) => t.id === ingredient.id)
  );

  function removeHtmlTags(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.innerText;
  }

  return (
    <main className="mx-auto lg:px-12 max-w-5xl">
      <div className="flex flex-col items-center justify-center bg-white text-darkCharcoal md:rounded-lg md:my-24 md:mx-auto md:max-w-3xl md:p-8 md:text-lg">
        <img
          className="w-full md:rounded-lg"
          src={recipeDetail.image ?? defaultImage}
          alt={recipeDetail.title}
        />
        <div className="space-y-4 p-8 md:px-0">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold">{recipeDetail.title}</h1>
            <p className="text-sm space-y-1">
              {removeHtmlTags(recipeDetail.summary)}
            </p>
          </div>
          <hr />
          <div className="space-y-3">
            <h2 className="font-semibold text-xl">Ingredients</h2>
            <ul className="list-disc space-y-2 pl-6 text-sm">
              {uniqueIngredients.map((ingredient) => (
                <li key={ingredient.id} className="mb-1">
                  {ingredient.name}
                </li>
              ))}
            </ul>
          </div>
          <hr />
          <div className="space-y-3">
            <h2 className="font-semibold text-xl">Instructions</h2>
            <p className="text-sm">
              {recipeDetail.instructions
                ? removeHtmlTags(recipeDetail.instructions)
                : 'There are no given instructions for this recipe!'}
            </p>
          </div>
          <hr />
          <div className="flex flex-col sm:flex-row justify-between space-y-3 ">
            <Link
              className="font-medium text-slate-600 dark:text-blue-500 hover:underline pt-3"
              to="/"
            >
              Back to recipe list
            </Link>
            <a
              className="font-medium text-slate-600 dark:text-blue-500 hover:underline"
              href={recipeDetail.sourceUrl}
              target="_blank"
            >
              View source page of the recipe
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
