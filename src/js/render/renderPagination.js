import Pagination from 'tui-pagination';
import { onPaginatorClick } from '../base/handlers';
import '../../sass/layout/_pagination.scss';

let pagination = null;

function renderPagination(pageAmount, currentPage = 1) {
  if (pageAmount === 0) {
    pagination = null;
    document.querySelector('#pagination').innerHTML = '';
    return;
  }

  document.querySelector('#pagination').innerHTML = `
    <div class="pagination">
      <div id="tui-pagination-container" class="tui-pagination"></div>
    </div>
  `;

  pagination = new Pagination('tui-pagination-container', {
    totalItems: pageAmount,
    itemsPerPage: 1,
    visiblePages: 5,
    page: currentPage,
    centerAlign: true,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      moveButton:
        '<a href="#" class="tui-page-btn tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</span>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip">...</span>' +
        '</a>',
    },
  });

  pagination.on('afterMove', ({ page }) => {
    onPaginatorClick(page);
    // Smoothly scroll to the gallery container after the page content has been updated
    document.getElementById('gallery_container').scrollIntoView({
      behavior: 'smooth'
    });
  });

  if (pageAmount === 1) {
    document.querySelector('#tui-pagination-container').style.display = 'none';
  }
}

export { renderPagination, pagination };
