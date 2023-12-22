import "core-js/stable";
import "regenerator-runtime/runtime";
import icons from "url:../img/icons.svg";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
const recipeContainer = document.querySelector(".recipe");

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
console.log("Starting fecth of recipe");

const controlRecipes = async function () {
  try {
    const recipeId = window.location.hash.slice(1);
    console.log(recipeId);
    if (!recipeId) return;
    recipeView.renderSpinner();
    //fetch recipe
    await model.loadRecipe(recipeId);
    //Render receipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    console.error(error);
  }
};
["hashchange", "load"].forEach((ev) =>
  window.addEventListener(ev, controlRecipes)
);
