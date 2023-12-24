import { API_URL, RESULT_PER_PAGE, API_KEY } from "../js/config/config.js";
import { AJAX } from "./helpers.js";
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
    const data = await AJAX(`${API_URL}${recipeId}?key=${API_KEY}`);
    state.recipe = createRecipeObject(data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createRecipeObject = function (data) {
  const recipe = data.data.recipe;

  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};
export const loadSearchResult = async function (queryParam) {
  try {
    const searchResult = await AJAX(
      `${API_URL}?search=${queryParam}&key=${API_KEY}`
    );
    const recipes = searchResult.data.recipes;
    console.log("Loaded " + recipes.length + " recipe");
    state.search.currentPage = 1;
    state.search.result = recipes.map((recipe) => {
      return {
        id: recipe.id,
        image: recipe.image_url,
        title: recipe.title,
        publisher: recipe.publisher,
        ...(recipe.key && { key: recipe.key }),
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

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
      .map((entry) => {
        const ing = entry[1].replaceAll(" ", "").split(",");
        if (ing.length !== 3) {
          throw new Error("Wrong input format. Please give correct input !");
        }
        const [quantity, unit, description] = ing;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      servings: +newRecipe.servings,
      cooking_time: +newRecipe.cookingTime,
      ingredients,
    };
    console.log(recipe);
    const data = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (error) {
    throw error;
  }
};

const persistBookMarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};
const loadBookMarks = function () {
  const storageData = localStorage.getItem("bookmarks");
  if (storageData) {
    state.bookmarks = JSON.parse(storageData);
  }
};
loadBookMarks();
