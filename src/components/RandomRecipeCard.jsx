import defaultImage from '../assets/default.png';
import { Link } from 'react-router-dom';

export default function RandomRecipeCard({ recipe }) {
  const uniqueIngredients = recipe.extendedIngredients.filter(
    (ingredient, index, self) =>
      index === self.findIndex((t) => t.id === ingredient.id)
  );

  return (
    <div className="bg-white rounded overflow-hidden shadow-md h-full">
      <div className="w-full">
        <Link to={`/${recipe.id}`}>
          <img
            className="w-full h-44 object-cover rounded-t"
            src={recipe.image || defaultImage}
            alt={recipe.title}
          />
        </Link>
      </div>
      <div className="p-4">
        {/* <h1 className="text-xl font-bold mb-2 truncate">{recipe.title}</h1> */}
        <div className="group flex relative">
          <h1 className="text-xl font-bold mb-2 w-full truncate">
            {recipe.title}
          </h1>
          <div
            className="group-hover:opacity-100 transition-opacity bg-slate-700 text-slate-100 text-md rounded-md px-4 py-2 absolute left-1/2 
          -translate-x-1/2 translate-y-1/4 opacity-0"
          >
            {recipe.title}
          </div>
        </div>
        <h2 className="text-lg font-semibold mb-2">Ingredients:</h2>
        <ul className="overflow-y-auto max-h-56">
          {uniqueIngredients.map((ingredient) => (
            <li key={ingredient.id} className="mb-1">
              {ingredient.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
