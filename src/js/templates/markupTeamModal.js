import image from '../../images/team/teamlogo.png';
import josh from '../../images/team/josiahmatela.jpg';
import lesjohnpaul from '../../images/team/lesjohnpaul.png';
import rubymateo from '../../images/team/rubymateo.jpg';
import michelle from '../../images/team/michelle.png';
import rene from '../../images/team/rene.jpg';
import cindy from '../../images/team/cindy.png';

const teamModalMarkup = `

<div class="footer-modal__window">
    <a href=""  target="_blank" class="social-list__item" >
        <img src="${image}" alt="team logo" class="team__logo">
        <h3 class="team-logo__name">Our team </h3>
    </a>
    <ul class="team">
        <li class="team__list">
            <a href="" target="_blank" class="social-list__item">
                <img src="${josh}" alt="Josiah Matela" class="team__img">
                <div class="team__box">
                    <h3 class="team__name">Josiah Matela </h3>
                    <p class="team__work">Team Lead</p>
                </div>
            </a>
        </li>
        <li class="team__list">
            <a href="" target="_blank" class="social-list__item">
                <img src="${lesjohnpaul}" alt="Les John Paul" class="team__img ">
                <div class="team__box">
                    <h3 class="team__name">Les John Paul</h3>
                    <p class="team__work">Scrum Master</p>
                </div>
            </a>
        </li>
        <li class="team__list">
            <a href="" target="_blank" class="social-list__item">
                <img src="${rubymateo}" alt="Ruby Mateo" width=100 height=100 class="team__img">
                <div class="team__box">
                    <h3 class="team__name">Ruby Mateo</h3>
                    <p class="team__work">Developer</p>
                </div>
            </a>
        </li>
        <li class="team__list">
            <a href="" target="_blank" class="social-list__item">
                <img src="${michelle}" alt="" class="team__img">
                <div class="team__box">
                    <h3 class="team__name">Michelle Jean Sudaria</h3>
                    <p class="team__work">Developer</p>
                </div>
            </a>
        </li>
        <li class="team__list">
            <a href="h" target="_blank" class="social-list__item">
                <img src="${rene}" alt="" class="team__img">
                <div class="team__box">
                    <h3 class="team__name">Rene Fernandez</h3>
                    <p class="team__work">Developer</p>
                </div>
            </a>
        </li>
        <li class="team__list">
            <a href="h" target="_blank" class="social-list__item">
                <img src="${cindy}" alt="" class="team__img">
                <div class="team__box">
                    <h3 class="team__name">Cindy Ruth Orllena</h3>
                    <p class="team__work">Developer</p>
                </div>
            </a>
        </li>
    </ul>
</div>`;

export { teamModalMarkup };
