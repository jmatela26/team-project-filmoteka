import { onfetchTrailers, getPopularFilms } from '../api/api-service';
import images from '../../images/plug/notfound.jpg';
import Glide from '@glidejs/glide';

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
        // const trailers = await onfetchTrailers(film.id);
        const createListItem = document.createElement('li');
        // const trailerKey = trailers.length > 0 ? trailers[0].key : ''; // Assuming you want to use the first trailer key if available
        const posterPath = !film.poster_path ? images : `https://image.tmdb.org/t/p/w500${film.poster_path}`;
        // <iframe width="560" height="315" src="https://www.youtube.com/embed/${trailerKey}" frameborder="0" allowfullscreen></iframe>
        createListItem.innerHTML = `
              <img class="trending__image" src="${posterPath}" alt="${film.title}" />
        `;
        glide.appendChild(createListItem);
      });



    // Initialize 
    let glid = new Glide('.images', config);
    glid.mount();

    } catch (error) {
      console.error('Error populating carousel: ', error.message);
    }
  }



 