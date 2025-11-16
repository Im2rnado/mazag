import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Animated, {
    FadeIn,
    FadeInUp,
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withSequence,
    withDelay,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import AnimatedChromeOrb from '@/components/AnimatedChromeOrb';

export default function CompleteScreen() {
    const router = useRouter();
    const scale = useSharedValue(0);
    const checkmarkScale = useSharedValue(0);

    useEffect(() => {
        // Animate orb entrance
        scale.value = withSpring(1, {
            damping: 15,
            stiffness: 100,
        });

        // Animate checkmark after orb
        checkmarkScale.value = withDelay(
            400,
            withSequence(
                withSpring(1.3, { damping: 10 }),
                withSpring(1, { damping: 15 })
            )
        );
    }, []);

    const orbStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const checkmarkStyle = useAnimatedStyle(() => ({
        transform: [{ scale: checkmarkScale.value }],
    }));

    const handleStart = () => {
        router.replace('/');
    };

    return (
        <LinearGradient
            colors={['#FAFAFA', '#E3F2FD', '#BBDEFB']}
            style={{ flex: 1 }}
        >
            <SafeAreaView className="flex-1" edges={['top', 'bottom']}>
                <View className="flex-1 p-6 justify-center">
                    {/* Success Animation */}
                    <Animated.View
                        entering={FadeIn.delay(200).duration(600)}
                        className="items-center mb-10"
                    >
                        <Animated.View style={orbStyle} className="mb-[-40px]">
                            <AnimatedChromeOrb
                                size={120}
                                animationDuration={10}
                                colors={{
                                    bg: '#E3F2FD',
                                    c1: '#64B5F6',
                                    c2: '#42A5F5',
                                    c3: '#2196F3',
                                }}
                                isActive={true}
                            />
                        </Animated.View>
                    </Animated.View>

                    {/* Success Message */}
                    <Animated.View
                        entering={FadeInUp.delay(800).duration(600)}
                        className="items-center my-8"
                    >
                        <View className="flex-row items-center justify-center">
                            <View className="relative z-10">
                                <View
                                    className="w-12 h-12 rounded-full items-center justify-center mr-3 mb-2"
                                    style={{
                                        backgroundColor: '#4CAF50',
                                        shadowColor: '#4CAF50',
                                        shadowOffset: { width: 0, height: 4 },
                                        shadowOpacity: 0.4,
                                        shadowRadius: 12,
                                        elevation: 8,
                                    }}
                                >
                                    <Ionicons name="checkmark" size={30} color="#fff" />
                                </View>
                            </View>

                            <Text className="text-[32px] font-avenir-bold text-[#1976D2] mb-3">
                                Profile Created!
                            </Text>
                        </View>
                        <Text className="text-base text-[#546E7A] text-center leading-6 px-5">
                            Thank you for sharing with us. We'll use this information to personalize your Mazag experience.
                        </Text>
                    </Animated.View>

                    {/* Summary Cards */}
                    <Animated.View
                        entering={FadeInUp.delay(1000).duration(600)}
                        className="gap-3 mb-8"
                    >
                        <View
                            className="flex-row items-center bg-white rounded-[20px] p-5"
                            style={{
                                shadowColor: '#2196F3',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.08,
                                shadowRadius: 8,
                                elevation: 3,
                            }}
                        >
                            <Ionicons name="heart" size={28} color="#E91E63" />
                            <View className="flex-1 ml-4">
                                <Text className="text-base font-avenir-bold text-[#1976D2] mb-1">
                                    Personalized Support
                                </Text>
                                <Text className="text-sm text-[#546E7A] leading-5">
                                    Exercises & therapists matched to you
                                </Text>
                            </View>
                        </View>

                        <View
                            className="flex-row items-center bg-white rounded-[20px] p-5"
                            style={{
                                shadowColor: '#2196F3',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.08,
                                shadowRadius: 8,
                                elevation: 3,
                            }}
                        >
                            <Ionicons name="chatbubbles" size={28} color="#2196F3" />
                            <View className="flex-1 ml-4">
                                <Text className="text-base font-avenir-bold text-[#1976D2] mb-1">
                                    AI Companion
                                </Text>
                                <Text className="text-sm text-[#546E7A] leading-5">
                                    Mazag learns your communication style
                                </Text>
                            </View>
                        </View>

                        <View
                            className="flex-row items-center bg-white rounded-[20px] p-5"
                            style={{
                                shadowColor: '#2196F3',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.08,
                                shadowRadius: 8,
                                elevation: 3,
                            }}
                        >
                            <Ionicons name="trending-up" size={28} color="#4CAF50" />
                            <View className="flex-1 ml-4">
                                <Text className="text-base font-avenir-bold text-[#1976D2] mb-1">
                                    Track Progress
                                </Text>
                                <Text className="text-sm text-[#546E7A] leading-5">
                                    Monitor your wellness journey
                                </Text>
                            </View>
                        </View>
                    </Animated.View>

                    {/* CTA Button */}
                    <Animated.View
                        entering={FadeInUp.delay(1200).duration(600)}
                        className="mt-auto"
                    >
                        <TouchableOpacity
                            onPress={handleStart}
                            activeOpacity={0.85}
                            className="rounded-[28px] overflow-hidden"
                            style={{
                                shadowColor: '#2196F3',
                                shadowOffset: { width: 0, height: 6 },
                                shadowOpacity: 0.4,
                                shadowRadius: 16,
                                elevation: 8,
                            }}
                        >
                            <LinearGradient
                                colors={['#42A5F5', '#2196F3', '#1976D2']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16, paddingHorizontal: 32, gap: 8 }}
                            >
                                <Text className="text-lg font-avenir-bold text-white">
                                    Start Your Wellness Journey
                                </Text>
                                <Ionicons name="arrow-forward" size={24} color="#fff" />
                            </LinearGradient>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
}
