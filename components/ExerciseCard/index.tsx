import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Exercise } from '@/types';
import GlassCard from '@/components/GlassCard';

type Props = {
    exercise: Exercise;
    onPress?: () => void;
};

export default function ExerciseCard({ exercise, onPress }: Props) {
    return (
        <GlassCard className="mb-4">
            <TouchableOpacity onPress={onPress}>
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
                    <TouchableOpacity className="bg-buttonPrimary px-4 py-2 rounded-xl">
                        <Text className="text-white font-avenir-semibold text-body">
                            Start
                        </Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </GlassCard>
    );
}
