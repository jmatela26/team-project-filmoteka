import { refs } from '../references/refs';
import { readState, writeState } from './state';
import { PAGE_TYPE } from './state';
import { updateInterface } from './update';
import { handleScroll } from './scrollToTop';
import {
  addIdToLocalStorage,
  LS_KEY_TYPE,
  removeIdFromLocalStorage,
  checkIdInLocalStorage,
} from '../utils/localStorage';
import { checkStorageStatusOfFilm, removeModalBtnListeners } from '../render/renderFilmModal';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { checkOnLastCardInGallery, checkOnFullGallery } from '../utils/checkOnLastCard';
import {
  switchToNextFilmInGallery,
  switchToPrevFilmInGallery,
  checkSwitchToPrevFilmAvailable,
  checkSwitchToNextFilmAvailable,
} from '../utils/modalFilmSwitcher';

const notyf = new Notyf();

function homeLinkClick(e) {
  e.preventDefault();
  writeState({
    pageType: PAGE_TYPE.TRENDS,
    currentPage: 1,
    search: '',
    isModalOpen: false,
    modalFilmId: null,
  });
  updateInterface();
}

function myLibLinkClick(e) {
  e.preventDefault();

  writeState({
    pageType: PAGE_TYPE.LIB_WATCHED,
    currentPage: 1,
    search: '',
    isModalOpen: false,
    modalFilmId: null,
  });
  updateInterface();
}

function checkReloadSite() {
  switch (readState().pageType) {
    case PAGE_TYPE.TRENDS:
      refs.headerContainer.classList.remove('header_libr');
      refs.homePageLink.classList.add('header-nav__isActive');
      refs.myLibPageLink.classList.remove('header-nav__isActive');
      break;

    case PAGE_TYPE.SEARCH:
      refs.headerContainer.classList.remove('header_libr');
      refs.homePageLink.classList.add('header-nav__isActive');
      refs.myLibPageLink.classList.remove('header-nav__isActive');
      break;

    case PAGE_TYPE.LIB_WATCHED:
      refs.headerContainer.classList.add('header_libr');
      refs.homePageLink.classList.remove('header-nav__isActive');
      refs.myLibPageLink.classList.add('header-nav__isActive');
      break;

    case PAGE_TYPE.LIB_QUEUE:
      refs.headerContainer.classList.add('header_libr');
      refs.homePageLink.classList.remove('header-nav__isActive');
      refs.myLibPageLink.classList.add('header-nav__isActive');
      break;
  }
}

function onFormSubmit(e) {
  e.preventDefault();
  const query = e.currentTarget.elements.input.value.trim();
  if (query === '') {
    notyf.error('Search form is empty. Enter something');
    return;
  }


  writeState({
    pageType: PAGE_TYPE.SEARCH,
    currentPage: 1,
    search: e.currentTarget.elements.input.value.trim(),
    isModalOpen: false,
    modalFilmId: null,
  });
  updateInterface();
}


function libTypeWatchedBtnClick(e) {
  writeState({
    pageType: PAGE_TYPE.LIB_WATCHED,
    currentPage: 1,
    search: '',
    isModalOpen: false,
    modalFilmId: null,
  });
  updateInterface();
}
function libTypeQueueBtnClick(e) {
  writeState({
    pageType: PAGE_TYPE.LIB_QUEUE,
    currentPage: 1,
    search: '',
    isModalOpen: false,
    modalFilmId: null,
  });
  updateInterface();
}
function onPaginatorClick(page) {
  const state = readState();
  state.currentPage = page;
  writeState(state);
  updateInterface();
}

function onGalleryClick(e) {
  e.preventDefault();
  const itemLink = e.target.parentNode.parentNode;
  let filmId = null;
  if (e.target.nodeName === 'IMG' || e.target.nodeName === 'H2' || e.target.nodeName === 'P') {
    filmId = itemLink.parentNode.dataset.id;
  }
  if (e.target.nodeName === 'DIV') {
    filmId = itemLink.dataset.id;
  }
  if (!filmId) {
    return;
  }

  const state = readState();
  state.modalFilmId = filmId;
  state.isModalOpen = true;
  writeState(state);
  updateInterface();
}

function onOpenTeamModal(e) {
  e.preventDefault();
  const state = readState();
  state.modalFilmId = null;
  state.isModalOpen = true;
  writeState(state);
  updateInterface();
}

function onCloseModalWindow() {
  const state = readState();
  state.modalFilmId = null;
  state.isModalOpen = false;
  writeState(state);
  updateInterface();
}

function onKeyBoardClick(e) {
  const ESC_KEY_CODE = 'Escape';
  const arrowRight = 'ArrowRight';
  const arrowLeft = 'ArrowLeft';
  if (e.code === ESC_KEY_CODE) {
    onCloseModalWindow();
  }
  if (e.code === arrowRight) {
    if (!readState().modalFilmId) {
      return;
    }
    if (!checkSwitchToNextFilmAvailable()) {
      switchToNextFilmInGallery();
    }
  }
  if (e.code === arrowLeft) {
    if (!readState().modalFilmId) {
      return;
    }
    if (!checkSwitchToPrevFilmAvailable()) {
      switchToPrevFilmInGallery();
    }
  }
}

function onModalBackdropClick(e) {
  if (e.currentTarget === e.target) {
    onCloseModalWindow();
  }
}

function openModal() {
  var header = document.querySelector('.header');
  header.classList.remove('fixed');
  refs.modal.classList.remove('is-hidden');
  refs.scrollLock.classList.add('modal-open');
  refs.scrolltop.classList.remove('showBtn');
  refs.backdrop.addEventListener('click', onModalBackdropClick);
  window.addEventListener('keydown', onKeyBoardClick);
}

function closeModal() {
  refs.modal.classList.add('is-hidden');
  refs.scrollLock.classList.remove('modal-open');
  handleScroll();
  refs.backdrop.removeEventListener('click', onModalBackdropClick);
  window.removeEventListener('keydown', onKeyBoardClick);
  refs.modalContent.innerHTML = '';
  if (!readState().modalFilmId) {
    return;
  }
  removeModalBtnListeners();
}

function onModalBtnWatchedClick() {
  const state = readState();
  const filmId = state.modalFilmId;
  let isInWatched = checkIdInLocalStorage(filmId, LS_KEY_TYPE.WATCHED);
  if (isInWatched) {
    removeIdFromLocalStorage(filmId, LS_KEY_TYPE.WATCHED);
    checkOnLastCardInGallery();
  } else {
    addIdToLocalStorage(filmId, LS_KEY_TYPE.WATCHED);
    if (checkIdInLocalStorage(filmId, LS_KEY_TYPE.QUEUE)) {
      removeIdFromLocalStorage(filmId, LS_KEY_TYPE.QUEUE);
      checkOnLastCardInGallery();
      refs.modalBtnQueueTextField[0].textContent = 'REMOVING FROM QUEUE';
    }
  }
  const watchedBtnText = isInWatched ? 'REMOVING FROM WATCHED' : 'ADDING TO WATCHED';
  refs.modalBtnWatchedTextField[0].textContent = watchedBtnText;
  setTimeout(() => {
    checkStorageStatusOfFilm();
    if (state.pageType === PAGE_TYPE.LIB_WATCHED || state.pageType === PAGE_TYPE.LIB_QUEUE)
      updateInterface(false);
  }, 500);
}

function onModalBtnQueueClick() {
  const state = readState();
  const filmId = state.modalFilmId;
  let isInQueue = checkIdInLocalStorage(filmId, LS_KEY_TYPE.QUEUE);
  if (isInQueue) {
    removeIdFromLocalStorage(filmId, LS_KEY_TYPE.QUEUE);
    checkOnLastCardInGallery();
  } else {
    addIdToLocalStorage(filmId, LS_KEY_TYPE.QUEUE);
    if (checkIdInLocalStorage(filmId, LS_KEY_TYPE.WATCHED)) {
      removeIdFromLocalStorage(filmId, LS_KEY_TYPE.WATCHED);
      checkOnLastCardInGallery();
      refs.modalBtnWatchedTextField[0].textContent = 'REMOVING FROM WATCHED';
    }
  }
  const queueBtnText = isInQueue ? 'REMOVING FROM QUEUE' : 'ADDING TO QUEUE';
  refs.modalBtnQueueTextField[0].textContent = queueBtnText;
  setTimeout(() => {
    checkStorageStatusOfFilm();
    if (state.pageType === PAGE_TYPE.LIB_WATCHED || state.pageType === PAGE_TYPE.LIB_QUEUE)
      updateInterface(false);
  }, 500);
}

export {
  onFormSubmit,
  homeLinkClick,
  myLibLinkClick,
  libTypeWatchedBtnClick,
  libTypeQueueBtnClick,
  onPaginatorClick,
  onGalleryClick,
  onCloseModalWindow,
  onOpenTeamModal,
  openModal,
  closeModal,
  onModalBtnWatchedClick,
  onModalBtnQueueClick,
  checkReloadSite,
  notyf
};
