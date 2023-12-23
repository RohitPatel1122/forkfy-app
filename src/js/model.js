import { API_URL, RESULT_PER_PAGE } from "../js/config/config.js";
import { getJSON } from "./helpers.js";
export const state = {
  recipe: {},
  search: {
    result: [],
    resultPerPage: RESULT_PER_PAGE,
    currentPage: 1,
  },
  bookmarks: [],
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
      bookMarked: state.bookmarks.some((rec) => rec.id === recipe.id),
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

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(
    (ing) =>
      (ing.quantity = (ing.quantity * newServings) / state.recipe.servings)
  );
  state.recipe.servings = newServings;
};

export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) {
    state.recipe.bookMarked = true;
  }
  persistBookMarks();
};
export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex((ele) => ele.id === id);
  state.bookmarks.splice(index, 1);
  if (id === state.recipe.id) {
    state.recipe.bookMarked = false;
  }
  persistBookMarks();
};

const persistBookMarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};
const loadBookMarks = function () {
  const storageData = localStorage.getItem("bookmarks");
  if (storageData) {
    state.bookmarks = JSON.parse(storageData);
  }
  console.log(state.bookmarks);
};
loadBookMarks();
