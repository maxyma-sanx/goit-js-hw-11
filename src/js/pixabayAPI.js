import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export default class PixabayAPI {
  #searchQuery = '';
  #page = 1;
  #totalPages = null;
  #perPage = 40;
  #params = {
    params: {
      key: '32149017-54898b7893ffe9aab4d4c2fa3',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: this.#perPage,
    },
  };

  async getData() {
    const url = `?q=${this.#searchQuery}&page=${this.#page}`;

    const { data } = await axios.get(url, this.#params);

    return data;
  }

  get query() {
    return this.#searchQuery;
  }

  set query(newQuery) {
    this.#searchQuery = newQuery;
  }

  incrementPage() {
    this.#page += 1;
  }

  resetPage() {
    this.#page = 1;
  }

  calculatePages(total) {
    this.#totalPages = Math.ceil(total / this.#perPage);
  }

  pagesCheck() {
    return this.#page === this.#totalPages;
  }

  isShowLoadButton() {
    return this.#page < this.#totalPages;
  }
}
