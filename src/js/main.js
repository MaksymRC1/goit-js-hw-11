// main.js
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './render-functions.js';

// DOM елементи - адаптовано під вашу HTML структуру
const searchForm = document.querySelector('.form');
const searchInput = document.querySelector('input[name="search-text"]');

// Змінні для пагінації
let currentQuery = '';
let currentPage = 1;
let isLoading = false;

/**
 * Показує повідомлення про помилку
 * @param {string} message - Текст помилки
 */
function showError(message) {
  iziToast.error({
    title: '❌ Error',
    message: message,
    position: 'topRight',
    backgroundColor: '#ef4444',
    titleColor: '#fff',
    messageColor: '#fff',
    iconColor: '#fff',
    timeout: 5000,
    transitionIn: 'bounceInLeft',
  });
}

/**
 * Показує повідомлення про попередження
 * @param {string} message - Текст попередження
 */
function showWarning(message) {
  iziToast.warning({
    title: '⚠️ Warning',
    message: message,
    position: 'topRight',
    backgroundColor: '#f59e0b',
    titleColor: '#fff',
    messageColor: '#fff',
    timeout: 3000,
  });
}

/**
 * Показує інформаційне повідомлення
 * @param {string} message - Текст повідомлення
 */
function showInfo(message) {
  iziToast.info({
    title: 'ℹ️ Info',
    message: message,
    position: 'topRight',
    backgroundColor: '#3b82f6',
    titleColor: '#fff',
    messageColor: '#fff',
    timeout: 4000,
  });
}

/**
 * Показує успішне повідомлення
 * @param {string} message - Текст повідомлення
 */
function showSuccess(message) {
  iziToast.success({
    title: '✅ Success',
    message: message,
    position: 'topRight',
    backgroundColor: '#10b981',
    titleColor: '#fff',
    messageColor: '#fff',
    timeout: 2000,
  });
}

/**
 * Основна функція пошуку зображень
 * @param {string} query - Пошуковий запит
 */
async function searchImages(query) {
  // Перевірка на порожній запит
  if (!query || query.trim() === '') {
    showWarning('Please enter a search query');
    return;
  }

  try {
    // Очищуємо галерею перед новим пошуком
    clearGallery();

    // Показуємо лоадер
    showLoader();

    // Отримуємо зображення
    const data = await getImagesByQuery(query);

    // ПЕРЕВІРКА НА ДОВЖИНУ МАСИВУ (вимога завдання)
    if (!data.hits || data.hits.length === 0) {
      iziToast.show({
        title: '🔍 No results',
        message: `Sorry, no images found for "${query}". Please try another search term.`,
        position: 'topRight',
        backgroundColor: '#3b82f6',
        titleColor: '#fff',
        messageColor: '#fff',
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/2748/2748614.png',
        timeout: 5000,
      });
      return;
    }

    // Створюємо галерею
    createGallery(data.hits);

    // Показуємо повідомлення про успіх з кількістю знайдених зображень
    showSuccess(`Found ${data.totalHits} beautiful images!`);

    // Оновлюємо поточний запит для пагінації
    currentQuery = query;
    currentPage = 1;

    // Плавна прокрутка до галереї
    const gallery = document.querySelector('.gallery');
    if (gallery) {
      gallery.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } catch (error) {
    console.error('Search error:', error);
    showError(error.message);
  } finally {
    // Ховаємо лоадер
    hideLoader();
  }
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
 * Очищення форми (опціонально)
 */
function resetForm() {
  searchInput.value = '';
  searchInput.focus();
}

/**
 * Ініціалізація додатка
 */
function init() {
  // Перевірка наявності необхідних елементів
  if (!searchForm) {
    console.error('Form with class "form" not found');
    return;
  }

  if (!searchInput) {
    console.error('Input with name "search-text" not found');
    return;
  }

  // Додаємо обробник події submit
  searchForm.addEventListener('submit', onSearchFormSubmit);

  // Додаємо можливість пошуку по Enter (вже працює через submit)
  // Додаємо додаткові стилі для форми
  searchForm.addEventListener('keypress', event => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      searchImages(searchInput.value);
    }
  });

  console.log('App initialized successfully');
}

// Запускаємо додаток після завантаження DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Експорт функцій для тестування (опціонально)
export { searchImages, resetForm };
