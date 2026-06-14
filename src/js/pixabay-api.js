import axios from 'axios';

const PIXABAY_BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '48876382-0e4f5cbb23d48eb9ff8904d68';

/**
 * Виконує HTTP-запит до Pixabay API для пошуку зображень
 * @param {string} query - Пошуковий запит
 * @returns {Promise<object>} - Promise з даними відповіді
 * @throws {Error} - Якщо query не є рядком або порожній
 */
export function getImagesByQuery(query) {
  // Перевірка на коректність вхідного параметру
  if (typeof query !== 'string') {
    return Promise.reject(new Error('Query must be a string'));
  }

  const trimmedQuery = query.trim();

  if (trimmedQuery === '') {
    return Promise.reject(new Error('Query cannot be empty'));
  }

  const params = new URLSearchParams({
    key: API_KEY,
    q: trimmedQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
  });

  return axios
    .get(`${PIXABAY_BASE_URL}?${params}`)
    .then(response => response.data)
    .catch(error => {
      if (error.response) {
        throw new Error(
          `API Error: ${error.response.status} - ${error.response.statusText}`
        );
      } else if (error.request) {
        throw new Error(
          'No response received from Pixabay API. Please check your internet connection.'
        );
      } else {
        throw new Error(`Request error: ${error.message}`);
      }
    });
}
