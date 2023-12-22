import { API_URL } from "../js/config/config.js";
import { getJSON } from "./helpers.js";
export const state = {
  recipe: {},
};
export const loadRecipe = async function (recipeId) {
  try {
    const data = await getJSON(`${API_URL}${recipeId}`);
    console.log(data);
    const recipe = data.data.recipe;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    console.log(state.recipe);
  } catch (error) {
    console.error(`${error} 🔥🔥🔥🔥`);
  }
};
