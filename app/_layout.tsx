import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { Tabs, useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AnimatedChromeOrb from '@/components/AnimatedChromeOrb';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync().catch(() => { });

// Custom Floating Tab Bar Component
function CustomTabBar() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { name: '/', icon: 'home', iconOutline: 'home-outline', label: 'Home' },
    { name: '/therapists', icon: 'people', iconOutline: 'people-outline', label: 'Therapists' },
    { name: 'chatbot-orb', icon: '', iconOutline: '', label: 'Chatbot' },
    { name: '/exercises', icon: 'fitness', iconOutline: 'fitness-outline', label: 'Exercises' },
    { name: '/settings', icon: 'person-circle', iconOutline: 'person-circle-outline', label: 'Account' },
  ];

  const isActive = (tabName: string) => {
    if (tabName === '/') return pathname === '/' || pathname === '/index';
    if (tabName === 'chatbot-orb') return pathname === '/chat' || pathname === '/chat/index';
    return pathname?.startsWith(tabName);
  };

  const handlePress = (tabName: string) => {
    if (tabName === 'chatbot-orb') {
      router.push('/chat');
    } else {
      router.push(tabName as any);
    }
  };

  return (
    <View className="absolute bottom-0 left-0 right-0 pb-6 px-4">
      {/* Floating Orb - Chatbot */}
      <View className="items-center mb-[-36px] z-10">
        <TouchableOpacity
          onPress={() => handlePress('chatbot-orb')}
          activeOpacity={0.9}
        >
          <AnimatedChromeOrb
            size={65}
            animationDuration={7}
            colors={{
              bg: '#BEE3FF',
              c1: '#A8D8FF', // Pastel pink
              c2: '#92C7E8', // Pastel blue
              c3: '#A8D8FF', // Pastel purple/lavender
            }}
            isActive={isActive('chatbot-orb')}
          />
        </TouchableOpacity>
      </View>

      {/* Main Tab Bar */}
      <View
        className="bg-bgWhite border border-glassBorder rounded-3xl mx-2 px-2 py-4"
        style={{
          shadowColor: '#64B5F6',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 1.0,
          shadowRadius: 22,
          elevation: 22,
        }}
      >
        <View className="flex-row justify-between items-center">
          {tabs.map((tab, index) => {
            if (tab.name === 'chatbot-orb') {
              // Empty space for the floating orb
              return <View key={tab.name} className="w-16" />;
            }

            const active = isActive(tab.name);

            return (
              <TouchableOpacity
                key={tab.name}
                onPress={() => handlePress(tab.name)}
                className="items-center flex-1 py-1"
                activeOpacity={0.6}
                hitSlop={{ top: 10, bottom: 10, left: 5, right: 5 }}
              >
                <Ionicons
                  name={active ? tab.icon : tab.iconOutline}
                  size={26}
                  color={active ? '#64B5F6' : '#8FA9B8'}
                />
                <Text
                  className={`text-base mt-1 font-avenir-medium ${active ? 'text-primaryBlue' : 'text-textLight'}`}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    'AvenirNext-Light': require('../assets/fonts/AvenirNext-Light.ttf'),
    'AvenirNext-Regular': require('../assets/fonts/AvenirNext-Regular.ttf'),
    'AvenirNext-Medium': require('../assets/fonts/AvenirNext-Medium.ttf'),
    'AvenirNext-Demi': require('../assets/fonts/AvenirNext-Demi.ttf'),
  });

  // Disable font scaling globally
  interface TextWithDefaultProps extends Text {
    defaultProps?: { allowFontScaling?: boolean };
  }

  interface TextInputWithDefaultProps extends TextInput {
    defaultProps?: { allowFontScaling?: boolean };
  }

  ((Text as unknown) as TextWithDefaultProps).defaultProps = ((Text as unknown) as TextWithDefaultProps).defaultProps || {};
  ((Text as unknown) as TextWithDefaultProps).defaultProps!.allowFontScaling = false;
  ((TextInput as unknown) as TextInputWithDefaultProps).defaultProps = ((TextInput as unknown) as TextInputWithDefaultProps).defaultProps || {};
  ((TextInput as unknown) as TextInputWithDefaultProps).defaultProps!.allowFontScaling = false;

  // Handle font loading error
  useEffect(() => {
    if (fontError) console.error('Error loading fonts:', fontError);
  }, [fontError]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && !isReady) {
      await SplashScreen.hideAsync();
      setIsReady(true);
    }
  }, [fontsLoaded, isReady]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <StatusBar
        animated={true}
        style="dark"
        translucent={false}
        backgroundColor="#FFFFFF"
      />
      <View onLayout={onLayoutRootView} className="flex-1">
        <Tabs
          screenOptions={{
            headerShown: false,
          }}
          tabBar={() => <CustomTabBar />}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
            }}
          />
          <Tabs.Screen
            name="therapists/index"
            options={{
              title: 'Therapists',
            }}
          />
          <Tabs.Screen
            name="chat/index"
            options={{
              title: 'Chatbot',
            }}
          />
          <Tabs.Screen
            name="exercises/index"
            options={{
              title: 'Exercises',
            }}
          />
          <Tabs.Screen
            name="settings/index"
            options={{
              title: 'Account',
            }}
          />
        </Tabs>
      </View>
    </SafeAreaProvider>
  );
}
