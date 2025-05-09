import axios from 'axios';
const API = 'https://self-improvement-eubrics-backend.onrender.com';

const api = axios.create({ baseURL: `${API}/api` });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.log('No token found in localStorage'); // Debug
  }
  return config;
});

export default api;