import "core-js/stable";
import "regenerator-runtime/runtime";
import icons from "url:../img/icons.svg";
import { MODEL_CLOSE_TIMEOUT_IN_SEC } from "./config/config.js";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchRecipeView from "./views/searchRecipeView.js";
import searchBarView from "./views/searchBarView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import addrecipeView from "./views/addrecipeView.js";
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const recipeId = window.location.hash.slice(1);
    // console.log(recipeId);
    if (!recipeId) return;
    recipeView.renderSpinner();
    //fetch recipe
    await model.loadRecipe(recipeId);
    searchRecipeView.update(model.getSearchResultForPage());
    bookmarksView.update(model.state.bookmarks);
    //Render receipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};
const constrolSearchRecipes = async function () {
  try {
    searchRecipeView.renderSpinner();
    const query = searchBarView.getQuery();
    if (!query) return;
    await model.loadSearchResult(query);
    searchRecipeView.render(model.getSearchResultForPage());
    paginationView.render(model.state.search);
  } catch (error) {
    searchRecipeView.renderError();
  }
};
const controlPagination = function (gotoPage) {
  try {
    searchRecipeView.render(model.getSearchResultForPage(gotoPage));
    paginationView.render(model.state.search);
  } catch (error) {
    searchRecipeView.renderError();
  }
};
const controlUpdateServings = function (newServings) {
  //update serving
  model.updateServings(newServings);
  // re-render the view
  recipeView.update(model.state.recipe);
};

const controlBookMarking = function () {
  if (model.state.recipe.bookMarked) {
    model.deleteBookmark(model.state.recipe.id);
  } else {
    model.addBookmark(model.state.recipe);
  }
  //2. Update the recipe view
  recipeView.update(model.state.recipe);
  //3. Uupdate the bookmark view
  bookmarksView.render(model.state.bookmarks);
};
const controlBookMark = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlUploadRecipe = async function (newRecipe) {
  try {
    debugger;
    addrecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);
    addrecipeView.renderMessage();
    //render recipe view and bookmark view
    window.history.pushState(null, "", `#${model.state.recipe.id}`);
    recipeView.render(model.state.recipe);
    bookmarksView.render(model.state.bookmarks);
    setTimeout(function () {
      addrecipeView.toggleHidden();
    }, MODEL_CLOSE_TIMEOUT_IN_SEC * 1000);
  } catch (error) {
    console.error("🔥", error);
    addrecipeView.renderError(error);
  }
};
const init = function () {
  bookmarksView.addHandleRender(controlBookMark);
  recipeView.addHandlerRender(controlRecipes);
  searchBarView.addHandlerSearch(constrolSearchRecipes);
  paginationView.addHandlerPagination(controlPagination);
  recipeView.addHandlerUpdateServings(controlUpdateServings);
  recipeView.addHandlerBookMark(controlBookMarking);
  addrecipeView.addHandlerRecipeUpload(controlUploadRecipe);
};
init();
