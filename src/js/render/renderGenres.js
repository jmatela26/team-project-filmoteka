import { getGenres } from '../api/api-service';
import { refs } from '../references/refs';
import { updateInterface } from '../base/update';
import { readState, writeState } from '../base/state';

let activeGenreId = null;
let genreListShown = false;

async function onDropBtnClick(e) {
  if (!genreListShown) {
    genreListShown = true;
    const data = await getGenres();
    renderGenres(data.genres);
    // Toggle the visibility of the genres list
    refs.genresList[0].classList.add('show');
    refs.genresList[0].addEventListener('click', onGenresClick);

    // Animate the dropdown
    refs.genresDropdown.classList.add('show');

    if (activeGenreId) {
      // Existing logic to highlight the active genre
    }
  } else {
    hideGenres();
  }
}

function hideGenres() {
  if (refs.genresList[0]) {
    refs.genresList[0].classList.remove('show');
    refs.genresList[0].removeEventListener('click', onGenresClick);
  }
  refs.genresDropdown.classList.remove('show');
  genreListShown = false;
}


function renderGenres(data) {
  const markup = data
    .map(genre => {
      return `<li class="genres_item" data-id="${genre.id}">
      <a href="" class="genres_link"> ${genre.name}</a>
    </li>
      `;
    })
    .join('');
  refs.genresDropdown.innerHTML = `<ul class="genres_list" name="genres_list">` + markup + `</ul>`;

  const header = document.querySelector('.header');

  // Change border to 0 using JavaScript
  header.style.border = '0';
}

// function onGenresClick(e) {
//   e.preventDefault();
//   const state = readState();
//   state.currentPage = 1;
//   writeState(state);

//   if (e.target.classList.contains('active')) {
//     activeGenreId = null;
//     e.target.classList.remove('active');
//     updateInterface();
//     return;
//   }
//   for (let i = 0; i < refs.genresList[0].children.length; i++) {
//     if (refs.genresList[0].children[i] !== e.target.parentNode) {
//       refs.genresList[0].children[i].firstElementChild.classList.remove('active');

//       activeGenreId = null;
//     }
//   }
//   e.target.classList.add('active');
//   const genreId = e.target.parentNode.dataset.id;
//   activeGenreId = genreId;
//   updateInterface();
// }

function onGenresClick(e) {
  e.preventDefault(); // Prevent the default link behavior

  const state = readState();
  state.currentPage = 1;
  writeState(state);

  if (e.target.classList.contains('active')) {
    activeGenreId = null;
    e.target.classList.remove('active');
    updateInterface();
    // No need to scroll if deselecting an active genre, so return early
    return;
  }

  // Deactivate previously active genre and activate the clicked one
  for (let i = 0; i < refs.genresList[0].children.length; i++) {
    if (refs.genresList[0].children[i] !== e.target.parentNode) {
      refs.genresList[0].children[i].firstElementChild.classList.remove('active');
    }
  }

  e.target.classList.add('active');
  activeGenreId = e.target.parentNode.dataset.id; // Update activeGenreId with the clicked genre's ID
  updateInterface();

  // After updating the interface, scroll to the gallery section
  document.getElementById('gallery_container').scrollIntoView({
    behavior: 'smooth'
  });
}
export { activeGenreId, onDropBtnClick, hideGenres };
