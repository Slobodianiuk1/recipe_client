export interface IRecipe {
  name: string
  description: string
  ingredients: string[],
  instructions: string,
  imageUrl?: string,
  cookingTime: number,
  userOwner: string | null,
}



export interface IRecipeAll extends IRecipe{
 __v: number
  _id: string
}


export interface ISavedRecipes {
  savedRecipes: IRecipeAll[]
}

