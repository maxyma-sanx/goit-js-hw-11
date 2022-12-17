import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import refs from './refs';
import PixabayAPI from './pixabayAPI';
import renderImages from './render';

const pixabay = new PixabayAPI();

refs.form.addEventListener('submit', onSearchFormSubmit);
refs.button.addEventListener('click', onButtonLoadMoreClick);

function onSearchFormSubmit(e) {
  e.preventDefault();

  const { searchQuery } = e.currentTarget.elements;
  pixabay.query = searchQuery.value.trim();

  if (!pixabay.query) {
    Notify.warning('Input corrent request');
    return;
  }

  getImages();
  clear();

  e.target.reset();
}

async function getImages() {
  try {
    const images = await pixabay.getData();

    if (images.hits.length === 0) {
      refs.button.classList.add('is-hidden');
      Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    pixabay.calculatePages(images.totalHits);

    refs.gallery.insertAdjacentHTML('beforeend', renderImages(images));

    if (pixabay.isShowLoadButton()) {
      refs.button.classList.remove('is-hidden');
    }

    Notify.success(`Hooray! We found ${images.totalHits} images.`);

    const lightbox = new SimpleLightbox('.gallery .photo-card a');
  } catch (error) {
    console.log(error);
  }
}

async function onButtonLoadMoreClick() {
  try {
    pixabay.incrementPage();

    const images = await pixabay.getData();

    if (!pixabay.isShowLoadButton()) {
      refs.button.classList.add('is-hidden');
    }

    if (pixabay.pagesCheck()) {
      Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    }

    refs.gallery.insertAdjacentHTML('beforeend', renderImages(images));

    const { height: cardHeight } = document
      .querySelector('.gallery .photo-card a')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    clear();
    console.log(error);
  }
}

function clear() {
  pixabay.resetPage();
  refs.gallery.innerHTML = '';
}
