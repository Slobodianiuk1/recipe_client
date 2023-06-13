import  {FC, useEffect, useState} from "react";
import axios from "axios";
import {useGetUserID} from "../hooks/useGetUserId.ts";
import {IRecipeAll} from "../types/recipe.type.ts";

const Home: FC = () => {

  const [recipes, setRecipes] = useState<IRecipeAll[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);

  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get<IRecipeAll[]>("http://localhost:4200/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4200/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, []);

  const saveRecipe = async (recipeID : string) => {
    try {
      const response = await axios.put("http://localhost:4200/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(recipes);
  const isRecipeSaved = (id: string) => savedRecipes && savedRecipes.includes(id);

  return (
    <div className="px-10">
      <h2>Recipes</h2>
      <ul className="bg-white flex flex-col gap-5 rounded">
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              <button
                className={isRecipeSaved(recipe._id) ? 'btnDis' : 'btn'}
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
              </button>
            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} width={300} />
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;