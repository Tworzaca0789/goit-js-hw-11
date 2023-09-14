import axios from 'axios';
export { fetchPhoto, perPageLimit };
const perPageLimit = 40;

const KEY_API = '39346761-8b01f68fe4eefe6876f196ed9';
const URL_BASE = 'https://pixabay.com/api/';

const fetchPhoto = async (searchQueryFetch, pageToFetch) => {
  try {
    const photoData = await axios.get(URL_BASE, {
      paramObjectTasks: {
        key: KEY_API,
        q: searchQueryFetch,
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
