// services/api.js
import axios from 'axios';
import BASE_URL from '../config';

const api = axios.create({
  baseURL: BASE_URL,  // This will use the BASE_URL you set in config.js
});

export default api;
