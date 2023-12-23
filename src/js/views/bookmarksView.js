import icons from "../../img/icons.svg";
import View from "./view";
import recipePreviewView from "./recipePreviewView";
class BookMarksView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it ";
  _message = "";
  _generateMarkup() {
    return this._data
      .map((bookMark) => recipePreviewView.render(bookMark, false))
      .join("");
  }

  addHandleRender(handler) {
    window.addEventListener("load", handler);
  }
}

export default new BookMarksView();
