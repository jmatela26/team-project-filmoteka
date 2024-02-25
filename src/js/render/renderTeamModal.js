import { teamModalMarkup } from '../templates/markupTeamModal';
import { refs } from '../references/refs';

function renderTeamModal() {
 // Set the modal content
 refs.modalContent.innerHTML = teamModalMarkup;
  
 // Retrieve the saved theme from local storage
 let savedTheme = localStorage.getItem('data-theme');
 
 // Find the element with the class 'footer-modal__window' within the modal content
 refs.modalContent.querySelectorAll('.footer-modal__window').forEach(el => el.setAttribute('data-theme', savedTheme));
}

export { renderTeamModal };
