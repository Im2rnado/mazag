import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Exercise } from '@/types';
import GlassCard from '@/components/GlassCard';

type Props = {
    exercise: Exercise;
    onPress?: () => void;
};

export default function ExerciseCard({ exercise, onPress }: Props) {
    return (
        <GlassCard className="mb-4">
            <Pressable
                onPress={onPress}
                style={({ pressed }) => ({
                    opacity: pressed ? 0.7 : 1,
                })}
            >
                <Text className="text-lg font-avenir-semibold text-textStrong">
                    {exercise.title}
                </Text>
                <Text className="text-body font-avenir text-textLight mt-1 capitalize">
                    {exercise.type}
                </Text>
                {exercise.description && (
                    <Text className="text-body font-avenir text-textBody mt-2">
                        {exercise.description}
                    </Text>
                )}
                <View className="flex-row justify-between items-center mt-3">
                    {exercise.durationMinutes && (
                        <Text className="text-body font-avenir text-textBody">
                            {exercise.durationMinutes} minutes
                        </Text>
                    )}
                    <Pressable
                        className="bg-buttonPrimary px-4 py-2 rounded-xl"
                        style={({ pressed }) => ({
                            opacity: pressed ? 0.8 : 1,
                        })}
                    >
                        <Text className="text-white font-avenir-semibold text-body">
                            Start
                        </Text>
                    </Pressable>
                </View>
            </Pressable>
        </GlassCard>
    );
}
