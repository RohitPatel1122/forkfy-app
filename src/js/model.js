import { API_URL, RESULT_PER_PAGE } from "../js/config/config.js";
import { getJSON } from "./helpers.js";
export const state = {
  recipe: {},
  search: {
    result: [],
    resultPerPage: RESULT_PER_PAGE,
    currentPage: 1,
  },
};
export const loadRecipe = async function (recipeId) {
  try {
    const data = await getJSON(`${API_URL}${recipeId}`);
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
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loadSearchResult = async function (queryParam) {
  try {
    const searchResult = await getJSON(`${API_URL}?search=${queryParam}`);
    const recipes = searchResult.data.recipes;
    console.log("Loaded " + recipes.length + " recipe");
    state.search.currentPage = 1;
    state.search.result = recipes.map((recipe) => {
      return {
        id: recipe.id,
        image: recipe.image_url,
        title: recipe.title,
        publisher: recipe.publisher,
      };
    });
  } catch (error) {
    throw error;
  }
};

export const getSearchResultForPage = function (
  page = state.search.currentPage
) {
  state.search.currentPage = page;
  const startPage = (page - 1) * 10;
  const endPage = page * 10;
  return state.search.result.slice(startPage, endPage);
};
