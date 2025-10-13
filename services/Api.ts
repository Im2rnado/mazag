// services/Api.ts
import axios from 'axios';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.mazag.app';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth tokens
apiClient.interceptors.request.use(
  async (config) => {
    // TODO: Add auth token from AsyncStorage
    // const token = await AsyncStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      console.log('Unauthorized access - redirect to login');
    }
    return Promise.reject(error);
  }
);

export default {
  // Auth endpoints
  async login(email: string, password: string) {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  },

  async register(userData: any) {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },

  // Chat endpoints
  async sendChatMessage(message: string, conversationId?: string) {
    const response = await apiClient.post('/chat/message', { 
      message, 
      conversationId 
    });
    return response.data;
  },

  // Therapists endpoints
  async getTherapists(filters?: any) {
    const response = await apiClient.get('/therapists', { params: filters });
    return response.data;
  },

  async bookSession(therapistId: string, datetime: string) {
    const response = await apiClient.post('/bookings', { 
      therapistId, 
      datetime 
    });
    return response.data;
  },

  // Exercises endpoints
  async getExercises(type?: string) {
    const response = await apiClient.get('/exercises', { 
      params: type ? { type } : {} 
    });
    return response.data;
  }
};
