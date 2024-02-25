// Get the element based on ID
const checkbox = document.getElementById('switch');
// Apply retrived them to the website
checkbox.addEventListener('change', onChangeThemeClick);

function onChangeThemeClick() {
  let theme = localStorage.getItem('data-theme'); // Retrieve saved them from local storage

  if (theme === 'dark') {
    changeThemeToLight();
  } else {
    changeThemeToDark();
  }
}

function setDefaultTheme() {
  let theme = localStorage.getItem('data-theme'); // Retrieve saved them from local storage

  if (!theme) {
    localStorage.setItem('data-theme', 'light');

    theme = 'light';
  }
  if (theme === 'dark') {
    checkbox.checked = true;
    changeThemeToDark();
  } else {
    changeThemeToLight();
  }
}

const changeThemeToDark = () => {
  document.body.setAttribute('data-theme', 'dark'); // set theme to dark
  document.querySelector('.footer').setAttribute('data-theme', 'dark');
  document
    .querySelectorAll('.footer-box__text')
    .forEach(el => el.setAttribute('data-theme', 'dark'));
  document.querySelector('.footer-box__text--after').setAttribute('data-theme', 'dark');
  document.querySelector('.footer__link').setAttribute('data-theme', 'dark');
 
  if (document.querySelector('.modal_film_card')) {
    document.querySelector('.modal_film_card').setAttribute('data-theme', 'dark');
    document
      .querySelectorAll('.modal__param-titel')
      .forEach(el => el.setAttribute('data-theme', 'dark'));
  }
  document.querySelectorAll('.header').forEach(el => el.setAttribute('data-theme', 'dark'));
  document.querySelectorAll('.wrapper').forEach(el => el.setAttribute('data-theme', 'dark'));
  document.querySelectorAll('.gallery__title').forEach(el => el.setAttribute('data-theme', 'dark'));
  document.querySelectorAll('footer-modal__window').forEach(el => el.setAttribute('data-theme', 'dark'));
  localStorage.setItem('data-theme', 'dark'); // save theme to local storage
};

const changeThemeToLight = () => {
  document.body.setAttribute('data-theme', 'light'); // set theme light
  document.querySelector('.footer').setAttribute('data-theme', 'light');
  document
    .querySelectorAll('.footer-box__text')
    .forEach(el => el.setAttribute('data-theme', 'light'));

  document.querySelector('.footer-box__text--after').setAttribute('data-theme', 'light');
  document.querySelector('.footer__link').setAttribute('data-theme', 'light');
  
  localStorage.setItem('data-theme', 'light'); // save theme to local storage
  document.querySelectorAll('.wrapper').forEach(el => el.setAttribute('data-theme', 'light'));
  document
    .querySelectorAll('.gallery__title')
    .forEach(el => el.setAttribute('data-theme', 'light'));

  document.querySelectorAll('.header').forEach(el => el.setAttribute('data-theme', 'light'));
  document.querySelectorAll('footer-modal__window').forEach(el => el.setAttribute('data-theme', 'light'));
};

export { setDefaultTheme };
