import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, Alert, Modal } from 'react-native';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import OnboardingService from '@/services/OnboardingService';

export default function Settings() {
  const router = useRouter();
  const [showRetakeModal, setShowRetakeModal] = useState(false);

  const handleRetakeOnboarding = async () => {
    setShowRetakeModal(false);
    await OnboardingService.clearOnboarding();
    // Navigate to onboarding
    router.replace('/onboarding/welcome');
  };

  const settingsItems = [
    { id: '1', title: 'Profile', icon: 'person-outline' as const, onPress: () => console.log('Profile') },
    { id: '2', title: 'Notifications', icon: 'notifications-outline' as const, onPress: () => console.log('Notifications') },
    { id: '3', title: 'Update Profile Quiz', icon: 'clipboard-outline' as const, onPress: () => setShowRetakeModal(true), subtitle: 'Retake the personalization quiz' },
    { id: '4', title: 'Privacy Policy', icon: 'shield-outline' as const, onPress: () => console.log('Privacy') },
    { id: '5', title: 'Terms of Service', icon: 'document-text-outline' as const, onPress: () => console.log('Terms') },
    { id: '6', title: 'Help & Support', icon: 'help-circle-outline' as const, onPress: () => console.log('Help') },
    { id: '7', title: 'About', icon: 'information-circle-outline' as const, onPress: () => console.log('About') },
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
                <View className="flex-row items-center flex-1">
                  <Ionicons name={item.icon} size={24} color="#64B5F6" />
                  <View className="ml-3 flex-1">
                    <Text className="text-base font-avenir-medium text-textStrong">
                      {item.title}
                    </Text>
                    {'subtitle' in item && (
                      <Text className="text-sm font-avenir text-textLight mt-1">
                        {item.subtitle}
                      </Text>
                    )}
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#8FA9B8" />
              </Pressable>
            </View>
          ))}
        </ScrollView>

        {/* Retake Onboarding Confirmation Modal */}
        <Modal
          visible={showRetakeModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowRetakeModal(false)}
        >
          <View className="flex-1 bg-black/50 justify-center items-center p-5">
            <View className="bg-white rounded-3xl p-7 w-full max-w-[400px] items-center">
              <Ionicons name="refresh-circle-outline" size={56} color="#2196F3" />
              <Text className="text-[22px] font-avenir-bold text-[#1976D2] mt-4 mb-3 text-center">
                Update Your Profile?
              </Text>
              <Text className="text-base text-textStrong text-center leading-6 mb-6">
                Retaking the profile quiz will help us better personalize your experience. Your current preferences will be updated.
              </Text>
              <View className="flex-row gap-3 w-full">
                <Pressable
                  onPress={() => setShowRetakeModal(false)}
                  className="flex-1 p-3.5 rounded-2xl items-center bg-[#F5F5F5]"
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.7 : 1,
                  })}
                >
                  <Text className="text-base font-avenir-bold text-textStrong">
                    Cancel
                  </Text>
                </Pressable>
                <Pressable
                  onPress={handleRetakeOnboarding}
                  className="flex-1 p-3.5 rounded-2xl items-center bg-primaryBlue"
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.85 : 1,
                  })}
                >
                  <Text className="text-base font-avenir-bold text-white">
                    Continue
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ExpoLinearGradient>
  );
}
