import './sass/index.scss';
import './js/api/api-service';
import './js/base/spinner';
import './js/base/handlers.js';
import './js/base/state';
import './js/base/listeners';
import { updateInterface } from './js/base/update';
import './js/base/scrollToTop';
import './js/base/themePreference';
import { populateCarousel } from './js/render/renderSlide';
import { setDefaultTheme } from './js/base/themePreference';
import './js/utils/headerPositionFixed';

updateInterface();
setDefaultTheme();
populateCarousel(1);
