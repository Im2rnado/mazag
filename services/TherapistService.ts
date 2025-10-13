// services/TherapistService.ts
import therapistsData from '@/assets/data/therapists.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default {
  async fetchAll() {
    // For MVP, read local JSON. Later replace with real backend API.
    return therapistsData;
  },

  async registerTherapist(payload: any) {
    // MVP: store in AsyncStorage & return success
    const all = await this.fetchAll();
    const newT = { id: Date.now().toString(), ...payload };
    all.unshift(newT);
    // in production persist to server
    return newT;
  },

  async bookSession(therapistId: string, userId: string, datetime: string) {
    const bookings = JSON.parse((await AsyncStorage.getItem('bookings')) || '[]');
    const booking = { id: Date.now().toString(), therapistId, userId, datetime };
    bookings.push(booking);
    await AsyncStorage.setItem('bookings', JSON.stringify(bookings));
    return booking;
  },

  async getBookings() {
    return JSON.parse((await AsyncStorage.getItem('bookings')) || '[]');
  }
};
