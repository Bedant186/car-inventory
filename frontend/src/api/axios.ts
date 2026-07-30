import axios from 'axios';

// Fallback to localhost during local dev, use production URL in Vercel
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include if you are using HTTP-only cookies
});
