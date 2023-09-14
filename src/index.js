import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import throttle from 'lodash.throttle';
import { fetchImages, perPageLimit } from './js/search-api';

const form = document.querySelector('#search-form');
const inputSearchQuery = document.querySelector('input[name = "searchQuery"]');
const gallery = document.querySelector('.gallery');
const buttonLoad = document.querySelector('.load__more');
const scrollToTop = document.querySelector('.scroll__top');

let inputValue = null;
//Początkowa wartość parametru page
let pageValue = 1;
let numberOfPage = 0;
let gallerySimpleLightbox = new SimpleLightbox('.photo-card a', {
  captions: true,
  captionData: 'alt',
  captionDelay: 450,
  scrollZoom: false,
});
async function onSubmit(e) {
  e.preventDefault();
  pageValue = 1;
  cleanGallery(gallery);
  inputValue = inputSearchQuery.value;
  if (inputValue === '') {
    Notify.failure('enter any value in the search engine.');
    return false;
  }
  e.currentTarget.reset();
  try {
    await loadingImages(pageValue, inputValue);
  } catch {
    onError;
  }
}

async function loadingImages(page, value) {
  try {
    Loading.arrows('Loading data, please wait...');
    const images = await fetchImages(value, page);
    const templateReply = images.hits;
    numberOfPage = Math.ceil(images.totalHits / perPageLimit);
    if (images.totalHits === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    if (images.totalHits !== 0) {
      Notify.success(`Hooray! We found ${images.totalHits} images.`);
      pictureCardMarker(templateReply);
      gallerySimpleLightbox.refresh();
    }
    if (images.totalHits > perPageLimit) {
      window.addEventListener('scroll', throttle(onScroll, 2000));
    }
  } catch {
    onError;
  }
  Loading.remove();
}

function onScroll() {
  if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
    onLoadMore();
  }
}

async function onLoadMore() {
  if (pageValue === numberOfPage) {
    Notify.info("We're sorry, but you've reached the end of search results.");
    window.removeEventListener('scroll', onScroll);
    return;
  } else {
    Loading.arrows('Loading data, please wait...');
    pageValue += 1;
    try {
      const images = await fetchImages(inputValue, pageValue);
      const templateReply = images.hits;
      pictureCardMarker(templateReply);
      gallerySimpleLightbox.refresh();
    } catch {
      onError;
    }
    Loading.remove();
  }
}

function cleanGallery(element) {
  while (element.firstChild) {
    element.firstChild.remove();
  }
}

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
  gallery.insertAdjacentHTML('beforeend', markup.join(''));
}

function onError(error) {
  Notify.failure('Oops! something went wrong! try again!', {
    position: 'center-top',
    width: '600px',
  });
}

function onTopScroll() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
form.addEventListener('submit', onSubmit);
scrollToTop.addEventListener('click', onTopScroll);

/*Do żądań HTTP użyto biblioteki axios.
Użyto składni async/await.
Do powiadomień użyto biblioteki notiflix.
Twój klucz API:39346761-8b01f68fe4eefe6876f196ed9
*/
