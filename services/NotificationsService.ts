// services/NotificationsService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export default {
  async scheduleReminder(title: string, body: string, datetime: Date) {
    // TODO: Integrate with expo-notifications
    // For now, just store the reminder locally
    const reminders = JSON.parse((await AsyncStorage.getItem('reminders')) || '[]');
    const reminder = {
      id: Date.now().toString(),
      title,
      body,
      datetime: datetime.toISOString(),
      created: new Date().toISOString()
    };
    reminders.push(reminder);
    await AsyncStorage.setItem('reminders', JSON.stringify(reminders));
    return reminder;
  },

  async getReminders() {
    return JSON.parse((await AsyncStorage.getItem('reminders')) || '[]');
  },

  async cancelReminder(id: string) {
    const reminders = JSON.parse((await AsyncStorage.getItem('reminders')) || '[]');
    const filtered = reminders.filter((r: any) => r.id !== id);
    await AsyncStorage.setItem('reminders', JSON.stringify(filtered));
  }
};
