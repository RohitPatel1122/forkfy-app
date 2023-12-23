import icons from "../../img/icons.svg";
import View from "./view";
import recipePreviewView from "./recipePreviewView";
class SearchRecipeView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage =
    "We could not find the recipe with this keyword. Please try another keyword like pizza. !";
  _message = "";
  _generateMarkup() {
    return this._data
      .map((receipe) => recipePreviewView.render(receipe, false))
      .join("");
  }
}

export default new SearchRecipeView();
