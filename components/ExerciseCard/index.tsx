import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Exercise } from '@/types';

type Props = {
    exercise: Exercise;
    onPress?: () => void;
};

const TYPE_CONFIG = {
    breathing: {
        icon: 'cloud-outline' as const,
        gradient: ['#E1F5FE', '#B3E5FC'],
        color: '#0288D1',
        bgColor: 'rgba(2, 136, 209, 0.08)',
    },
    meditation: {
        icon: 'body-outline' as const,
        gradient: ['#F3E5F5', '#E1BEE7'],
        color: '#7B1FA2',
        bgColor: 'rgba(123, 31, 162, 0.08)',
    },
    journaling: {
        icon: 'book-outline' as const,
        gradient: ['#FFF3E0', '#FFE0B2'],
        color: '#EF6C00',
        bgColor: 'rgba(239, 108, 0, 0.08)',
    },
    relaxation: {
        icon: 'leaf-outline' as const,
        gradient: ['#E8F5E9', '#C8E6C9'],
        color: '#388E3C',
        bgColor: 'rgba(56, 142, 60, 0.08)',
    },
    movement: {
        icon: 'walk' as const,
        gradient: ['#FCE4EC', '#F8BBD0'],
        color: '#C2185B',
        bgColor: 'rgba(194, 24, 91, 0.08)',
    },
};

const DIFFICULTY_COLORS = {
    beginner: '#4CAF50',
    intermediate: '#FF9800',
    advanced: '#F44336',
};

export default function ExerciseCard({ exercise, onPress }: Props) {
    const config = TYPE_CONFIG[exercise.type as keyof typeof TYPE_CONFIG] || TYPE_CONFIG.breathing;

    return (
        <View className="mb-4" style={{
            borderRadius: 20,
            shadowColor: config.color,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 12,
            elevation: 5,
        }}>
            <ExpoLinearGradient
                colors={config.gradient as [string, string]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ borderRadius: 20 }}
            >
                <Pressable
                    onPress={onPress}
                    className="p-5"
                    style={({ pressed }) => ({
                        opacity: pressed ? 0.85 : 1,
                    })}
                >
                    {/* Header Row */}
                    <View className="flex-row items-center justify-between mb-3">
                        <View className="flex-row items-center flex-1">
                            {/* Icon */}
                            <View className="w-12 h-12 rounded-2xl items-center justify-center mr-3" style={{
                                backgroundColor: config.bgColor,
                            }}>
                                <Ionicons name={config.icon} size={24} color={config.color} />
                            </View>

                            {/* Title & Type */}
                            <View className="flex-1">
                                <Text className="text-lg font-avenir-bold text-textStrong" numberOfLines={1}>
                                    {exercise.title}
                                </Text>
                                <Text className="text-sm font-avenir-medium capitalize mt-0.5" style={{ color: config.color }}>
                                    {exercise.type}
                                </Text>
                            </View>
                        </View>

                        {/* Difficulty Badge */}
                        {exercise.difficulty && (
                            <View className="px-3 py-1.5 rounded-full" style={{
                                backgroundColor: `${DIFFICULTY_COLORS[exercise.difficulty as keyof typeof DIFFICULTY_COLORS]}20`,
                            }}>
                                <Text className="text-xs font-avenir-bold capitalize" style={{
                                    color: DIFFICULTY_COLORS[exercise.difficulty as keyof typeof DIFFICULTY_COLORS]
                                }}>
                                    {exercise.difficulty}
                                </Text>
                            </View>
                        )}
                    </View>

                    {/* Description */}
                    {exercise.description && (
                        <Text className="text-sm font-avenir-medium text-textBody mb-3 leading-5">
                            {exercise.description}
                        </Text>
                    )}

                    {/* Benefits Tags */}
                    {exercise.benefits && exercise.benefits.length > 0 && (
                        <View className="flex-row flex-wrap gap-2 mb-4">
                            {exercise.benefits.slice(0, 3).map((benefit, idx) => (
                                <View key={idx} className="px-2.5 py-1 rounded-full" style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                }}>
                                    <Text className="text-xs font-avenir-medium text-textLight">
                                        {benefit}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Bottom Row */}
                    <View className="flex-row justify-between items-center">
                        {/* Duration */}
                        <View className="flex-row items-center">
                            <MaterialCommunityIcons name="clock-outline" size={16} color={config.color} />
                            <Text className="text-sm font-avenir-semibold ml-1.5" style={{ color: config.color }}>
                                {exercise.durationMinutes} min
                            </Text>
                        </View>

                        {/* Start Button */}
                        <View style={{
                            borderRadius: 16,
                            shadowColor: config.color,
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.25,
                            shadowRadius: 8,
                            elevation: 3,
                        }}>
                            <ExpoLinearGradient
                                colors={[config.color, config.color + 'DD']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{ borderRadius: 16 }}
                            >
                                <Pressable
                                    className="px-6 py-2.5 flex-row items-center"
                                    style={({ pressed }) => ({
                                        opacity: pressed ? 0.8 : 1,
                                    })}
                                >
                                    <MaterialCommunityIcons name="play" size={18} color="#FFFFFF" />
                                    <Text className="text-white font-avenir-bold ml-1.5">
                                        Start
                                    </Text>
                                </Pressable>
                            </ExpoLinearGradient>
                        </View>
                    </View>
                </Pressable>
            </ExpoLinearGradient>
        </View>
    );
}
