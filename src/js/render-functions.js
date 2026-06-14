// render-functions.js
import SimpleLightbox from 'simple-lightbox';
import 'simple-lightbox/dist/simple-lightbox.css';

const galleryContainer = document.querySelector('.gallery');

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
  close: true,
  enableKeyboard: true,
  docClose: true,
  loop: true,
  animationSpeed: 300,
  fadeSpeed: 300,
});

function createGallery(images) {
  const galleryMarkup = images
    .map(
      image => `
        <li class="gallery-item">
            <a href="${image.largeImageURL}" class="gallery-link">
                <img 
                    src="${image.webformatURL}" 
                    alt="${image.tags}" 
                    title="${image.tags}"
                    loading="lazy"
                />
                <div class="image-info">
                    <p class="info-item">
                        <span class="info-label">👍 Likes</span>
                        <span class="info-value">${image.likes}</span>
                    </p>
                    <p class="info-item">
                        <span class="info-label">👁️ Views</span>
                        <span class="info-value">${image.views}</span>
                    </p>
                    <p class="info-item">
                        <span class="info-label">💬 Comments</span>
                        <span class="info-value">${image.comments}</span>
                    </p>
                    <p class="info-item">
                        <span class="info-label">📥 Downloads</span>
                        <span class="info-value">${image.downloads}</span>
                    </p>
                </div>
            </a>
        </li>
    `
    )
    .join('');

  galleryContainer.innerHTML = galleryMarkup;
  lightbox.refresh();
}

function clearGallery() {
  galleryContainer.innerHTML = '';
}

function showLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.classList.add('show');
  }
}

function hideLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.classList.remove('show');
  }
}

export { createGallery, clearGallery, showLoader, hideLoader };
