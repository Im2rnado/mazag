import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Therapist } from '@/types';
import GlassCard from '@/components/GlassCard';

type Props = {
    therapist: Therapist;
    onPress?: () => void;
};

export default function TherapistCard({ therapist, onPress }: Props) {
    return (
        <GlassCard className="mb-4">
            <TouchableOpacity onPress={onPress}>
                <Text className="text-lg font-avenir-semibold text-textStrong">
                    {therapist.name}
                </Text>
                <Text className="text-body font-avenir text-textLight mt-1">
                    {therapist.specialization}
                </Text>
                <Text className="text-body font-avenir text-textBody mt-2">
                    {therapist.bio}
                </Text>
                <View className="flex-row justify-between items-center mt-3">
                    <Text className="text-base font-avenir-semibold text-textStrong">
                        EGP {therapist.price}/session
                    </Text>
                    {therapist.rating && (
                        <Text className="text-body font-avenir text-textBody">
                            ⭐ {therapist.rating}
                        </Text>
                    )}
                </View>
            </TouchableOpacity>
        </GlassCard>
    );
}
