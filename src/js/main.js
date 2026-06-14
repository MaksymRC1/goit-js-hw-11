import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'pure-css-loader/dist/css-loader.css';

import { getImagesByQuery } from './pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './render-functions.js';

// DOM елементи
const searchForm = document.querySelector('.form');
const searchInput = document.querySelector('input[name="search-text"]');

/**
 * Показує повідомлення про помилку
 * @param {string} message - Текст помилки
 */
function showError(message) {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
    backgroundColor: '#ef4444',
    titleColor: '#FFFFFF',
    messageColor: '#FFFFFF',
    iconColor: '#FFFFFF',
    timeout: 5000,
    transitionIn: 'bounceInLeft',
  });
}

/**
 * Показує повідомлення про відсутність результатів
 * @param {string} query - Пошуковий запит
 */
function showNoResults(query) {
  iziToast.info({
    title: 'No Results',
    message: `Sorry, no images found for "${query}". Please try another search term.`,
    position: 'topRight',
    backgroundColor: '#3b82f6',
    titleColor: '#FFFFFF',
    messageColor: '#FFFFFF',
    timeout: 5000,
    transitionIn: 'fadeInUp',
  });
}

/**
 * Показує повідомлення про успішне завантаження
 * @param {number} count - Кількість знайдених зображень
 */
function showSuccessMessage(count) {
  iziToast.success({
    title: 'Success',
    message: `Found ${count} beautiful images!`,
    position: 'topRight',
    backgroundColor: '#10b981',
    titleColor: '#FFFFFF',
    messageColor: '#FFFFFF',
    timeout: 3000,
    transitionIn: 'fadeInUp',
  });
}

/**
 * Виконує пошук зображень
 * @param {string} query - Пошуковий запит
 */
function searchImages(query) {
  // Валідація запиту
  if (!query || query.trim() === '') {
    showError('Please enter a search query');
    return;
  }

  // Очищаємо попередні результати
  clearGallery();

  // Показуємо індикатор завантаження
  showLoader();

  // Виконуємо HTTP-запит
  getImagesByQuery(query)
    .then(data => {
      // Перевіряємо наявність результатів
      if (!data.hits || data.hits.length === 0) {
        showNoResults(query);
        return;
      }

      // Відображаємо галерею
      createGallery(data.hits);

      // Показуємо повідомлення про успіх
      showSuccessMessage(data.totalHits);

      // Плавна прокрутка до галереї
      const gallery = document.querySelector('.gallery');
      if (gallery && gallery.children.length > 0) {
        gallery.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    })
    .catch(error => {
      console.error('Search error:', error);
      showError(error.message);
    })
    .finally(() => {
      // Ховаємо індикатор завантаження
      hideLoader();
    });
}

/**
 * Обробник відправки форми
 * @param {Event} event - Подія submit
 */
function onSearchFormSubmit(event) {
  event.preventDefault();
  const query = searchInput.value;
  searchImages(query);
}

/**
 * Ініціалізація додатку
 */
function init() {
  if (!searchForm) {
    console.error('Form with class "form" not found');
    return;
  }

  if (!searchInput) {
    console.error('Input with name "search-text" not found');
    return;
  }

  searchForm.addEventListener('submit', onSearchFormSubmit);
}

// Запускаємо додаток після завантаження DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
