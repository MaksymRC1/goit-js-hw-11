import axios from 'axios';

const PIXABAY_BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '48876382-0e4f5cbb23d48eb9ff8904d68';

export function getImagesByQuery(query) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query.trim(),
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
        throw new Error(`API Error: ${error.response.status}`);
      } else if (error.request) {
        throw new Error('No response from server');
      } else {
        throw new Error(`Request error: ${error.message}`);
      }
    });
}
