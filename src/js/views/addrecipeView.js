import icons from "../../img/icons.svg";
import View from "./view";
class AddRecipeView extends View {
  _parentElement = document.querySelector(".upload");
  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _showButton = document.querySelector(".nav__btn--add-recipe");
  _closeButton = document.querySelector(".btn--close-modal");

  _errorMessage = "Could Not Upload the recipe !";
  _message = "Recipe was successfully uploaded ⬆️";

  constructor() {
    super();
    this._addHandlerShowModel();
    this._addHandlerCloseModel();
  }
  toggleHidden() {
    this._window.classList.toggle("hidden");
    this._overlay.classList.toggle("hidden");
  }

  _addHandlerShowModel() {
    this._showButton.addEventListener("click", this.toggleHidden.bind(this));
  }
  _addHandlerCloseModel() {
    this._closeButton.addEventListener("click", this.toggleHidden.bind(this));
    this._overlay.addEventListener("click", this.toggleHidden.bind(this));
  }
  addHandlerRecipeUpload(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
  _generateMarkup() {}
}

export default new AddRecipeView();
