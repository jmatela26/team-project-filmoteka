import FilmsApiService from '../api/api-service.js';
import * as basicLightbox from 'basiclightbox';

const filmTrailers = new FilmsApiService();

export async function trailer(e) {
  filmTrailers
    .onfetchTrailers(Number(e.target.dataset.id))
    .then(data => {
      trailerRender(data);
    })
    .catch(console.log);
}

function trailerRender(data) {
  const btnModalTrailer = document.querySelector('.open-trailer__icon');

  const instance = basicLightbox.create(
    `<div class="modal-trailer__backdrop">
          <iframe class="iframe" width="640" height="480" frameborder="0" allowfullscreen allow='autoplay'
            src="https://www.youtube.com/embed/${data.results[0].key}?autoplay=1" >
          </iframe>
    </div>`,
    {
      onShow: instance => {
        instance.element().onclick = instance.close;
        document.addEventListener('keydown', onEscClose);
      },
    },
    {
      onClose: instance => {
        document.removeEventListener('keydown', onEscClose);
        console.log(instance);
      },
    },
  );
  function onEscClose(event) {
    if (event.code === 'Escape') {
      instance.close();
    }
  }
  btnModalTrailer.addEventListener('click', () => {
    instance.show();
  });
}