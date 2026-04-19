// services/OnboardingService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from './Api';
import { OnboardingResponse } from '@/types/onboarding';

const ONBOARDING_KEY = '@mazag_onboarding';
const USER_ID_KEY = '@mazag_user_id';

export default {
  async saveOnboardingData(data: OnboardingResponse): Promise<void> {
    try {
      const dataWithTimestamp = {
        ...data,
        completedAt: new Date().toISOString(),
      };

      // Save locally first (always reliable)
      await AsyncStorage.setItem(ONBOARDING_KEY, JSON.stringify(dataWithTimestamp));

      // Also sync to backend (best-effort)
      const userId = await AsyncStorage.getItem(USER_ID_KEY);
      if (userId) {
        await apiClient
          .post('/onboarding', {
            user_id: userId,
            primary_concern: data.primaryConcern,
            severity_level: data.severityLevel,
            therapy_experience: data.therapyExperience,
            therapy_approach: data.therapyApproach,
            mood_patterns: data.moodPatterns,
            sleep_quality: data.sleepQuality,
            support_system: data.supportSystem,
            wellness_goals: data.wellnessGoals,
            preferred_exercises: data.preferredExercises,
            communication_style: data.communicationStyle,
          })
          .catch((err) =>
            console.warn('Could not sync onboarding to backend (will retry next time):', err.message)
          );
      }
    } catch (error) {
      console.error('Failed to save onboarding data:', error);
      throw error;
    }
  },

  async getOnboardingData(): Promise<OnboardingResponse | null> {
    try {
      const data = await AsyncStorage.getItem(ONBOARDING_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to get onboarding data:', error);
      return null;
    }
  },

  async hasCompletedOnboarding(): Promise<boolean> {
    try {
      const data = await AsyncStorage.getItem(ONBOARDING_KEY);
      return data !== null;
    } catch {
      return false;
    }
  },

  async clearOnboarding(): Promise<void> {
    try {
      await AsyncStorage.removeItem(ONBOARDING_KEY);
    } catch (error) {
      console.error('Failed to clear onboarding data:', error);
      throw error;
    }
  },
};
