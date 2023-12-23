import icons from "../../img/icons.svg";
import View from "./view";
class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  _generateMarkup() {
    const currentPage = this._data.currentPage;
    const totalPages = Math.ceil(
      this._data.result.length / this._data.resultPerPage
    );
    //on last page
    if (currentPage === totalPages && totalPages > 1) {
      return `
        <button data-goto=${
          currentPage - 1
        } class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
        </button>
      `;
    }

    //on 1st page, more pages
    if (currentPage === 1 && totalPages > 1) {
      return `
      <button data-goto=${
        currentPage + 1
      } class="btn--inline pagination__btn--next">
      <span>Page ${currentPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
      `;
    }

    //on other pages
    if (currentPage > 1 && currentPage < totalPages) {
      return `
        <button data-goto=${
          currentPage - 1
        } class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
        </button>
        <button data-goto=${
          currentPage + 1
        } class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
      `;
    }
    return "";
  }

  addHandlerPagination(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;
      const gotoPage = +btn.dataset.goto;
      handler(gotoPage);
    });
  }
}

export default new PaginationView();
