import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import apiClient from './Api';

const DEVICE_ID_KEY = '@mazag_device_id';
const USER_ID_KEY = '@mazag_user_id';

export default {
  /**
   * Initializes the user session. 
   * Generates a device ID if not present, registers with the backend,
   * and stores the returned user_id.
   */
  async initialize(): Promise<void> {
    try {
      let deviceId = await AsyncStorage.getItem(DEVICE_ID_KEY);
      
      // If we don't have a device ID, create one natively
      if (!deviceId) {
        deviceId = `dev_${Platform.OS}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        await AsyncStorage.setItem(DEVICE_ID_KEY, deviceId);
      }

      // Register or login with the backend using this device ID
      const response = await apiClient.post('/auth/register', {
        device_id: deviceId,
        name: `User_${deviceId.substring(deviceId.length - 4)}`, // Basic generic name
      });
      
      if (response.data && response.data.user_id) {
        // Save the real database user_id to AsyncStorage so all other services use it
        await AsyncStorage.setItem(USER_ID_KEY, response.data.user_id);
        console.log(`[AuthService] Initialized. Real User ID: ${response.data.user_id}`);
      }
    } catch (error) {
      console.warn('[AuthService] Failed to initialize backend auth:', error);
      // We don't throw here to avoid blocking the app; the user will just remain offline/anonymous
    }
  },

  /** Get the current real user_id */
  async getUserId(): Promise<string | null> {
    return AsyncStorage.getItem(USER_ID_KEY);
  },

  /** Clear all auth data (for testing/resetting) */
  async reset(): Promise<void> {
    await AsyncStorage.removeItem(DEVICE_ID_KEY);
    await AsyncStorage.removeItem(USER_ID_KEY);
  }
};
