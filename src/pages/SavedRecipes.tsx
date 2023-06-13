import {FC, useEffect, useState} from "react";

import axios from "axios";
import {useGetUserID} from "../hooks/useGetUserId.ts";
import {IRecipeAll, ISavedRecipes} from "../types/recipe.type.ts";


const SavedRecipes: FC= () => {
  const [savedRecipes, setSavedRecipes] = useState<IRecipeAll[]>([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get<ISavedRecipes>(
          `http://localhost:4200/recipes/savedRecipes/${userID}`
        );
        console.log(response);
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, []);
  return (
    <div className='px-10'>
      <h1 className="text-3xl text-center mb-10">Saved Recipes</h1>
      <ul className="bg-white rounded">
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
            </div>
            {
              recipe.ingredients.map(ing => (
                <p className="text-red-500" key={ing}>{ing}</p>
              ))
            }
            <img src={recipe.imageUrl} alt={recipe.name} width={300}/>
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedRecipes