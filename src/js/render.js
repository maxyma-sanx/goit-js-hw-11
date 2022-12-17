export default function renderImages({ hits }) {
  return hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
        <div class="photo-card">
          <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          </a>
          <div class="info">
            <p class="info-item">
              <b>Likes</b>
              <span class="info-item-value">${likes}</span>
            </p>
            <p class="info-item">
              <b>Views</b>
              <span class="info-item-value">${views}</span>
            </p>
            <p class="info-item">
              <b>Comments</b>
              <span class="info-item-value">${comments}</span>
            </p>
            <p class="info-item">
              <b>Downloads</b>
              <span class="info-item-value">${downloads}</span>
            </p>
          </div>
        </div>
      `;
      }
    )
    .join('');
}
