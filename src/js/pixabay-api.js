// pixabay-api.js
import axios from 'axios';

const PIXABAY_BASE_URL = 'https://pixabay.com/api/';
const API_KEY = 'your_pixabay_api_key_here'; // Замініть на ваш реальний ключ

/**
 * Отримує зображення з Pixabay за пошуковим запитом
 * @param {string} query - Пошукове слово (рядок)
 * @returns {Promise<object>} - Повертає властивість data з відповіді API
 */
async function getImagesByQuery(query) {
  try {
    if (!query || typeof query !== 'string' || query.trim() === '') {
      throw new Error('Query parameter must be a non-empty string');
    }

    const response = await axios.get(PIXABAY_BASE_URL, {
      params: {
        key: API_KEY,
        q: query.trim(),
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        `Pixabay API error: ${error.response.status} - ${error.response.statusText}`
      );
    } else if (error.request) {
      throw new Error('No response received from Pixabay API');
    } else {
      throw new Error(`Request error: ${error.message}`);
    }
  }
}

export { getImagesByQuery };
