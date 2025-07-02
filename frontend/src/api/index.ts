import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  // withCredentials: true, // Not needed for JWT in headers
});

export default api; 