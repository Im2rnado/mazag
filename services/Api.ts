// services/Api.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Local backend — change this if running on a different port
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30s for LLM responses
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach user_id to every request if we have one stored
apiClient.interceptors.request.use(
  async (config) => {
    const userId = await AsyncStorage.getItem('@mazag_user_id');
    if (userId) {
      config.headers['X-User-ID'] = userId;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 404) {
      console.warn('Resource not found:', error.config?.url);
    } else if (!error.response) {
      console.error('Network error — is the backend running on', API_BASE_URL, '?');
    }
    return Promise.reject(error);
  }
);

export { API_BASE_URL };
export default apiClient;
