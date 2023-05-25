import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import countryCardTemplate from './templates/country-card.hbs';
import countryListTemplate from './templates/country-list.hbs';
const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector(`#search-box`);
const ulEl = document.querySelector('.country-list');
const divEl = document.querySelector('.country-info');

function onInputSearchCountry(evt) {
  evt.preventDefault();

  const name = evt.target.value.trim();
  divEl.innerHTML = '';
  ulEl.innerHTML = '';

  fetchCountries(name)
    .then(data => {
      if (data.length === 1) {
        return divEl.insertAdjacentHTML('beforeend', countryCardTemplate(data));
      } else if (data.length > 1 && data.length <= 10) {
        return ulEl.insertAdjacentHTML('beforeend', countryListTemplate(data));
      } else if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
    })
    .catch(error => {
      Notiflix.Notify.failure(error.message);
    });
}

inputEl.addEventListener(
  `input`,
  debounce(onInputSearchCountry, DEBOUNCE_DELAY)
);
