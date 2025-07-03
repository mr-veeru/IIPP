import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  // withCredentials: true, // Not needed for JWT in headers
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

// Record a submission
export const recordSubmission = (user_id: number, question_id: number, status: string = 'attempted') =>
  api.post('/submissions/record', { user_id, question_id, status });

// Get user submissions
export const getUserSubmissions = (user_id: number) =>
  api.get(`/submissions/user/${user_id}`);

// Get recommendations for a user
export const getRecommendations = (user_id: number) =>
  api.get(`/recommendations/?user_id=${user_id}`);

// Get all questions
export const getQuestions = () => api.get('/questions/');

// Delete all submissions for a user
export const deleteUserSubmissions = (user_id: number) =>
  api.delete(`/submissions/user/${user_id}`);

// Delete a single submission
export const deleteSubmission = (submission_id: number) =>
  api.delete(`/submissions/${submission_id}`); 