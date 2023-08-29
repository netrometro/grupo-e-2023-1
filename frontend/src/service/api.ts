import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cleanconnect-api.onrender.com/', 
});

export default api;
