import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Settings() {
  const settingsItems = [
    { id: '1', title: 'Profile', icon: 'person-outline' as const, onPress: () => console.log('Profile') },
    { id: '2', title: 'Notifications', icon: 'notifications-outline' as const, onPress: () => console.log('Notifications') },
    { id: '3', title: 'Privacy Policy', icon: 'shield-outline' as const, onPress: () => console.log('Privacy') },
    { id: '4', title: 'Terms of Service', icon: 'document-text-outline' as const, onPress: () => console.log('Terms') },
    { id: '5', title: 'Help & Support', icon: 'help-circle-outline' as const, onPress: () => console.log('Help') },
    { id: '6', title: 'About', icon: 'information-circle-outline' as const, onPress: () => console.log('About') },
  ];

  return (
    <ExpoLinearGradient
      colors={['#FFFFFF', '#E3F2FD']}
      style={{ flex: 1 }}
      locations={[0, 1]}
    >
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <ScrollView className="flex-1 p-6 pb-28">
          <Text className="text-heading-main font-avenir-bold text-textStrong mb-4">
            Account
          </Text>

          <View className="bg-glassBg rounded-2xl p-5 border border-glassBorder mb-4">
            <Text className="text-lg font-avenir-semibold text-textStrong mb-2">
              Settings
            </Text>
            <Text className="text-body font-avenir text-textBody">
              Manage your account settings and preferences
            </Text>
          </View>

          {settingsItems.map((item) => (
            <View
              key={item.id}
              className="bg-glassBg rounded-xl p-4 border border-glassBorder mb-3"
            >
              <Pressable
                onPress={item.onPress}
                className="flex-row items-center justify-between"
                style={({ pressed }) => ({
                  opacity: pressed ? 0.7 : 1,
                })}
              >
                <View className="flex-row items-center">
                  <Ionicons name={item.icon} size={24} color="#64B5F6" />
                  <Text className="text-base font-avenir text-textStrong ml-3">
                    {item.title}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#8FA9B8" />
              </Pressable>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </ExpoLinearGradient>
  );
}
