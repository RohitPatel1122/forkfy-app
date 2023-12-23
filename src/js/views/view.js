import icons from "../../img/icons.svg";

export default class View {
  _data;
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clear();
    this._addMarkUpToParent(markup);
  }

  update(data) {
    this._data = data;
    const markup = this._generateMarkup();
    const updatedDOM = document.createRange().createContextualFragment(markup);
    const updatedDOMElements = Array.from(updatedDOM.querySelectorAll("*"));
    const oldDOMElements = Array.from(
      this._parentElement.querySelectorAll("*")
    );
    updatedDOMElements.forEach((newEle, i) => {
      const oldEle = oldDOMElements[i];
      if (!newEle.isEqualNode(oldEle)) {
        //for updating attributes
        Array.from(newEle.attributes).forEach((attr) => {
          oldEle.setAttribute(attr.name, attr.value);
        });
        //for updating text
        if (newEle.firstChild?.nodeValue.trim() !== "") {
          oldEle.textContent = newEle.textContent;
        }
      }
    });
  }
  _clear() {
    this._parentElement.innerHTML = "";
  }
  renderSpinner() {
    const markup = `
      <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
      </div>
    `;
    this._clear();
    this._addMarkUpToParent(markup);
  }
  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
            <div>
              <svg>
                <use href="${icons}.svg#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `;
    this._clear();
    this._addMarkUpToParent(markup);
  }

  renderMessage(message = this._message) {
    const markup = `
    <div class="message">
            <div>
              <svg>
                <use href="${icons}.svg#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `;
    this._clear();
    this._addMarkUpToParent(markup);
  }
  _addMarkUpToParent(markup) {
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
