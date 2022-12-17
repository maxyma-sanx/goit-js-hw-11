import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export default class PixabayAPI {
  #searchQuery = '';
  #page = 1;
  #params = {
    params: {
      key: '32149017-54898b7893ffe9aab4d4c2fa3',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: '6',
    },
  };

  async getImages() {
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
}
