import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import refs from './refs';
import PixabayAPI from './pixabayAPI';
import renderImages from './render';

const pixabay = new PixabayAPI();

refs.form.addEventListener('submit', onSearchFormSubmit);
refs.button.addEventListener('click', onButtonLoadMoreClick);

async function onSearchFormSubmit(e) {
  e.preventDefault();

  const { searchQuery } = e.currentTarget.elements;
  pixabay.query = searchQuery.value.trim();

  if (!pixabay.query) {
    Notify.warning('Input corrent request');
    return;
  }

  const images = await pixabay.getImages();

  if (images.hits.length === 0) {
    Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  refs.gallery.insertAdjacentHTML('beforeend', renderImages(images));
  Notify.success(`Hooray! We found ${images.totalHits} images.`);

  const lightbox = new SimpleLightbox('.gallery .photo-card a');
}

async function onButtonLoadMoreClick() {
  pixabay.incrementPage();
  const images = await pixabay.getImages();
  refs.gallery.insertAdjacentHTML('beforeend', renderImages(images));
}
