import React, { useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import {useGetUserID} from "../hooks/useGetUserId.ts";

interface IRecipe {
  name: string
  description: string
  ingredients: string[],
  instructions: string,
  imageUrl?: string,
  cookingTime: number,
  userOwner: string | null,
}

export const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState<IRecipe>({
    name: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange:React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;
    setRecipe({...recipe, [name]: value});
  };

  const handleIngredientChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const {value} = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({...recipe, ingredients});
  };

  const handleAddIngredient = ():void => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({...recipe, ingredients});
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:4200/recipes",
        {...recipe},
        {
          headers: {authorization: cookies.access_token},
        }
      );

      alert("Recipe Created");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-recipe px-10">
      <h2>Create Recipe</h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={recipe.name}
          onChange={handleChange}
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={recipe.description}
          onChange={handleChange}
        ></textarea>
        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredient, index) => (
          <input
            key={index}
            type="text"
            name="ingredients"
            value={ingredient}
            onChange={(event) => handleIngredientChange(event, index)}
          />
        ))}
        <button className="btn" type="button" onClick={handleAddIngredient}>
          Add Ingredient
        </button>
        <label htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          name="instructions"
          value={recipe.instructions}
          onChange={handleChange}
        ></textarea>
        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={recipe.imageUrl}
          onChange={handleChange}
        />
        <label htmlFor="cookingTime">Cooking Time (minutes)</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          value={recipe.cookingTime}
          onChange={handleChange}
        />
        <button className='btn' type="submit">Create Recipe</button>
      </form>
    </div>
  );
};