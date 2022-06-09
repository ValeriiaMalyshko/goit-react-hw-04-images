import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '26220765-cdaab7d653fcbdddd91e4a753';

const fetchImages = ({ searchQuery = '', currentPage = 1, pageSize = 12 }) => {
  const params = {
    key: KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: currentPage,
    per_page: pageSize,
  };

  return axios({ params }).then(response => response.data);
};
export default fetchImages;
