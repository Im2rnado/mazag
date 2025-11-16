import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';

type ProgressBarProps = {
    currentStep: number;
    totalSteps: number;
};

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
    const progress = useSharedValue(0);
    const percentage = Math.round((currentStep / totalSteps) * 100);

    useEffect(() => {
        progress.value = withSpring((currentStep / totalSteps) * 100, {
            damping: 20,
            stiffness: 90,
        });
    }, [currentStep, totalSteps]);

    const animatedStyle = useAnimatedStyle(() => ({
        width: `${progress.value}%`,
    }));

    return (
        <View className="px-6 py-4">
            <View className="flex-row justify-between items-center mb-3">
                <Text className="text-base font-avenir-semibold text-[#1976D2]">
                    Question {currentStep} of {totalSteps}
                </Text>
                <Text className="text-base font-avenir-bold text-primaryBlue">
                    {percentage}%
                </Text>
            </View>

            <View className="h-2 bg-[#E3F2FD] rounded-lg overflow-hidden">
                <Animated.View style={[animatedStyle]} className="h-full rounded-lg">
                    <LinearGradient
                        colors={['#42A5F5', '#2196F3', '#1976D2']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={StyleSheet.absoluteFill}
                    />
                </Animated.View>
            </View>
        </View>
    );
}
