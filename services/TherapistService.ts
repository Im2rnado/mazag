// services/TherapistService.ts
import apiClient from './Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Therapist } from '@/types';

const USER_ID_KEY = '@mazag_user_id';

// Normalise API response (snake_case) → frontend type (camelCase)
function normalizeTherapist(raw: any): Therapist {
  return {
    id: raw.id,
    name: raw.name,
    title: raw.title ?? '',
    specialization: raw.specialization,
    price: raw.price,
    rating: raw.rating,
    reviewCount: raw.review_count ?? raw.reviewCount,
    bio: raw.bio,
    languages: raw.languages ?? [],
    gender: raw.gender,
    ageGroups: raw.age_groups ?? raw.ageGroups ?? [],
    yearsOfExperience: raw.years_of_experience ?? raw.yearsOfExperience,
    qualifications: raw.qualifications ?? [],
    approach: raw.approach,
    availableSlots: raw.available_slots ?? raw.availableSlots ?? [],
    image: raw.image,
  };
}

export default {
  async fetchAll(filters?: {
    gender?: string;
    language?: string;
    specialization?: string;
    search?: string;
  }): Promise<Therapist[]> {
    try {
      const response = await apiClient.get('/therapists', { params: filters });
      return (response.data as any[]).map(normalizeTherapist);
    } catch (error) {
      console.error('Failed to fetch therapists from API:', error);
      // Fallback to local JSON if backend unreachable
      const fallback = require('@/assets/data/therapists.json');
      return fallback as Therapist[];
    }
  },

  async fetchRecommended(): Promise<Array<Therapist & { matchScore: number; matchReasons: string[] }>> {
    try {
      const userId = await AsyncStorage.getItem(USER_ID_KEY);
      if (!userId) {
        // No user ID yet — return regular sorted list
        const all = await this.fetchAll();
        return all.map((t) => ({ ...t, matchScore: 0, matchReasons: [] }));
      }
      const response = await apiClient.get('/therapists/recommended', {
        params: { user_id: userId },
      });
      return (response.data as any[]).map((raw) => ({
        ...normalizeTherapist(raw),
        matchScore: raw.match_score ?? 0,
        matchReasons: raw.match_reasons ?? [],
      }));
    } catch (error) {
      console.error('Failed to fetch recommended therapists:', error);
      const all = await this.fetchAll();
      return all.map((t) => ({ ...t, matchScore: 0, matchReasons: [] }));
    }
  },

  async getById(id: string): Promise<Therapist | null> {
    try {
      const response = await apiClient.get(`/therapists/${id}`);
      return normalizeTherapist(response.data);
    } catch {
      return null;
    }
  },

  async bookSession(therapistId: string, datetime: string): Promise<any> {
    const userId = await AsyncStorage.getItem(USER_ID_KEY);
    const response = await apiClient.post('/bookings', {
      therapist_id: therapistId,
      user_id: userId ?? 'anonymous',
      datetime,
    });
    return response.data;
  },

  async getBookings(): Promise<any[]> {
    const userId = await AsyncStorage.getItem(USER_ID_KEY);
    if (!userId) return [];
    try {
      const response = await apiClient.get(`/bookings/${userId}`);
      return response.data;
    } catch {
      return [];
    }
  },
};
