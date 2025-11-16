import AsyncStorage from '@react-native-async-storage/async-storage';
import { OnboardingResponse } from '@/types/onboarding';

const ONBOARDING_KEY = '@mazag_onboarding';

export default {
    async saveOnboardingData(data: OnboardingResponse): Promise<void> {
        try {
            const dataWithTimestamp = {
                ...data,
                completedAt: new Date().toISOString(),
            };
            await AsyncStorage.setItem(ONBOARDING_KEY, JSON.stringify(dataWithTimestamp));
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
        } catch (error) {
            console.error('Failed to check onboarding status:', error);
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

