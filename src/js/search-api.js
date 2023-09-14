import axios from 'axios';
export { fetchImages, perPageLimit };
const perPageLimit = 40;
const KEY_API = '39346761-8b01f68fe4eefe6876f196ed9';
const URL_BASE = 'https://pixabay.com/api/';

const fetchImages = async (searchQuery, pageToFetch) => {
  try {
    const { data } = await axios.get(URL_BASE, {
      params: {
        key: KEY_API,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: perPageLimit,
        page: pageToFetch,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};
