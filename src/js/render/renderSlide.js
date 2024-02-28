import { getPopularFilms, getFilmById } from '../api/api-service';
import { renderFilmModal, addModalBtnListeners } from './renderFilmModal'
import images from '../../images/plug/notfound.jpg';
import Glide from '@glidejs/glide';
import { openModal } from '../base/handlers';
import { setDefaultTheme } from '../base/themePreference'

const config = {
    type: 'carousel', // Specify the type of GlideJS carousel
    perView: 6, // Number of slides per view
    autoplay: 3000, // Autoplay interval in milliseconds
    breakpoints: {
      800: {
        perView: 1 // Adjust the number of slides per view for smaller screens
      }
    }
  };

// Populate carousel with popular films
export async function populateCarousel(page) {
    try {
      const popularFilms = await getPopularFilms(page);
      const glide = document.querySelector('.glide__slides');
  
      popularFilms.data.results.forEach(async (film) => {
        const createListItem = document.createElement('li');
        const posterPath = !film.poster_path ? images : `https://image.tmdb.org/t/p/w500${film.poster_path}`;
        createListItem.innerHTML = `
              <img class="trending__image" src="${posterPath}" alt="${film.title}" data-id="${film.id}" />
        `;
        glide.appendChild(createListItem);
      });

    // Initialize 
    let glid = new Glide('.images', config);
    glid.mount();


    // Add event listener to each image
    const trendingImages = document.querySelectorAll('.trending__image');
    trendingImages.forEach(image => {
        image.addEventListener('click', () => {
            // Get the film ID from the data-id attribute
            const filmId = image.getAttribute('data-id');

            // Set initial state
            const initialState = {
              pageType: "TRENDS_PAGE",
              currentPage: 1,
              search: "",
              isModalOpen: true,
              modalFilmId: filmId // Assuming filmId is already defined
            };

            // Store initial state in session storage
            sessionStorage.setItem('state', JSON.stringify(initialState));

             // Update the modalFilmId in session storage
            const state = JSON.parse(sessionStorage.getItem('state'));
            state.modalFilmId = filmId;
            sessionStorage.setItem('state', JSON.stringify(state));
            
            getFilmById(filmId)
            .then(renderFilmModal)
            .then(addModalBtnListeners)
            .then(setDefaultTheme);

            openModal();
        });
    });

    } catch (error) {
      console.error('Error populating carousel: ', error.message);
    }
  }



 