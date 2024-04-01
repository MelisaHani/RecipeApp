import { useState, useEffect } from 'react';
import Header from './components/Header';
import RecipeList from './components/RecipeList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeDetails from './components/RecipeDetails.jsx';

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    fetch(
      `https://api.spoonacular.com/recipes/random?number=10&apiKey=7fab15ee779d496dae604148504efc0e`
    )
      .then((response) => response.json())
      .then((data) => {
        if (!ignore) {
          setRecipes(data.recipes);
          console.log(data.recipes);
          setIsLoading(false);
        }
      })
      .catch(() => {
        console.log('error');
      });
    return () => {
      ignore = true;
    };
  }, []);

  function convertToQueryParam(inputString) {
    const substrings = inputString.split(/[\s,]+/);
    const trimmedSubstrings = substrings.map((substring) => substring.trim());
    const queryParams = trimmedSubstrings.map((substring, index) => {
      return index === 0 ? substring : `,+${substring}`;
    });
    const result = queryParams.join('');

    return result;
  }

  function handleSearch(searchIngredients) {
    const query = convertToQueryParam(searchIngredients);
    fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${query}&apiKey=7fab15ee779d496dae604148504efc0e`
    )
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
        console.log(data);
        console.log(query);
        setIsLoading(false);
      })
      .catch(() => {
        console.log('error');
      });
  }

  return (
    <main>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div className="mx-20">
                <Header onSearch={handleSearch} />
                <RecipeList recipes={recipes} isLoading={isLoading} />
                {/* {recipes.length > 0 ? (
                  <RecipeList recipes={recipes} />
                ) : (
                  <p className="text-xl font-bold px-4">
                    No recipes found with the given ingredients.
                  </p>
                )} */}
              </div>
            }
          />
          <Route path="/:id" element={<RecipeDetails />} />
        </Routes>
      </Router>
    </main>
  );
}
