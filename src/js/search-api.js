import axios from 'axios';
import { perPage, pageInitialValue } from './index.js';
export { loadPhoto } from './index.js';
export { inputSearchQuery, pageInitialValue } from './index.js';
const URL_BASE = 'https://pixabay.com/api/';
const KEY_API = '39346761-8b01f68fe4eefe6876f196ed9';
const paramObjectTasks = {
  key: KEY_API,
  q: inputSearchQuery.value,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: perPage,
  page: pageInitialValue,
};

const loadPhoto = async (inputSearchQuery, pageInitialValue) => {
  try {
    const photoData = await axios.get(`${URL_BASE}/?${paramObjectTasks}`);
    return photoData;
  } catch (error) {
    throw new Error(response.status);
  }
};
