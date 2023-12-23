import View from "./view";
class SearchBarView extends View {
  _parentElement = document.querySelector(".search");

  getQuery() {
    const query = this._parentElement.querySelector(".search__field").value;
    this.#clearQuery();
    return query;
  }
  #clearQuery() {
    this._parentElement.querySelector(".search__field").value = "";
  }
  addHandlerSearch(handler) {
    ["submit"].forEach((ev) =>
      this._parentElement.addEventListener(ev, function (e) {
        e.preventDefault();
        handler();
      })
    );
  }
}

export default new SearchBarView();
