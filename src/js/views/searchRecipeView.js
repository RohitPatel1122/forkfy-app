import icons from "../../img/icons.svg";
import View from "./view";
class SearchRecipeView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage =
    "We could not find the recipe with this keyword. Please try another keyword like pizza. !";
  _message = "";
  _generateMarkup() {
    return this._data
      .map(
        (recipe) =>
          `
        <li class="preview">
            <a class="preview__link preview__link--active" href="#${recipe.id}">
                <figure class="preview__fig">
                <img src="${recipe.image}" alt="${recipe.title}" />
                </figure>
                <div class="preview__data">
                <h4 class="preview__title">${recipe.title}</h4>
                <p class="preview__publisher">${recipe.publisher}</p>
                
                </div>
            </a>
        </li>
    `
      )
      .join("");
  }
}

export default new SearchRecipeView();
