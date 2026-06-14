import SimpleLightbox from 'simple-lightbox';
import 'simple-lightbox/dist/simple-lightbox.css';

const galleryContainer = document.querySelector('.gallery');
let lightbox = null;

/**
 * Ініціалізує SimpleLightbox
 */
function initLightbox() {
  if (lightbox) {
    lightbox.destroy();
  }

  lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
    captionPosition: 'bottom',
    animationSpeed: 300,
    fadeSpeed: 300,
    close: true,
    enableKeyboard: true,
    docClose: true,
    loop: true,
  });
}

/**
 * Створює HTML-розмітку для галереї
 * @param {Array} images - Масив зображень з Pixabay API
 */
export function createGallery(images) {
  if (!galleryContainer) return;

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
                    <div class="info-item">
                        <span class="info-label">👍 Likes</span>
                        <span class="info-value">${image.likes}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">👁️ Views</span>
                        <span class="info-value">${image.views}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">💬 Comments</span>
                        <span class="info-value">${image.comments}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">📥 Downloads</span>
                        <span class="info-value">${image.downloads}</span>
                    </div>
                </div>
            </a>
        </li>
    `
    )
    .join('');

  galleryContainer.innerHTML = galleryMarkup;

  // Оновлюємо Lightbox після додавання нових елементів
  if (!lightbox) {
    initLightbox();
  } else {
    lightbox.refresh();
  }
}

/**
 * Очищає контейнер галереї
 */
export function clearGallery() {
  if (galleryContainer) {
    galleryContainer.innerHTML = '';
  }
}

/**
 * Показує індикатор завантаження
 */
export function showLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.classList.add('is-active');
  }
}

/**
 * Ховає індикатор завантаження
 */
export function hideLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.classList.remove('is-active');
  }
}
