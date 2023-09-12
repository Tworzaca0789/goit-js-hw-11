import axios from 'axios';
import Notiflix from 'notiflix';
import { loadPhoto } from './search-api.js';
const URL_BASE = 'https://pixabay.com/api/';
const KEY_API = '39346761-8b01f68fe4eefe6876f196ed9';
axios.defaults.headers.common['x-api-key'] = KEY_API;
export { inputSearchQuery };
const searchForm = document.querySelector('#search-form');
const inputSearchQuery = document.querySelector('input[name = "searchQuery"]');
const buttonLoad = document.querySelector('.load-more');

//parametr określa liczbę elementów w odpowiedzi z backendu
export const perPage = 40;
//Początkowa wartość parametru page
export let pageInitialValue = 1;

inputSearchQuery.addEventListener('input', () => {
  pageInitialValue += 1;
  buttonLoad.textContent = pageInitialValue;
});

loadPhoto();

inputSearchQuery.addEventListener('submit');
inputSearchQuery.addEventListener('buttonLoad');

function pictureCardMarker(templateReply) {
  const markup = templateReply.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => {
      return `<div class = "photo-card"> <a href="${largeImageURL}">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        ${likes}
      </p>
      <p class="info-item">
        <b>Views</b>
        ${views}
      </p>
      <p class="info-item">
        <b>Comments</b>
        ${comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>
        ${downloads}
      </p>
    </div>
    </div>`;
    }
  );
}
export { pictureCardMarker };

/*Do żądań HTTP użyto biblioteki axios.
Użyto składni async/await.
Do powiadomień użyto biblioteki notiflix.
Twój klucz API:39346761-8b01f68fe4eefe6876f196ed9
*/
