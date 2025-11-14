import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Therapist } from '@/types';
import GlassCard from '@/components/GlassCard';

type Props = {
    therapist: Therapist;
    onPress?: () => void;
};

export default function TherapistCard({ therapist, onPress }: Props) {
    const fullName = therapist.title ? `${therapist.title} ${therapist.name}` : therapist.name;

    return (
        <Pressable
            onPress={onPress}
            className="mb-4"
            style={({ pressed }) => ({
                opacity: pressed ? 0.95 : 1,
            })}
        >
            <View className="bg-white rounded-3xl p-5 border-2" style={{
                borderColor: '#E3F2FD',
                shadowColor: '#2196F3',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 12,
                elevation: 6,
            }}>
                {/* Header: Name & Rating */}
                <View className="flex-row items-start justify-between mb-3">
                    <View className="flex-1 mr-3">
                        <Text className="text-xl font-avenir-bold text-textStrong">
                            {fullName}
                        </Text>
                        <View className="flex-row items-center mt-2">
                            <View className="bg-iceBlue rounded-lg px-3 py-1">
                                <Text className="text-sm font-avenir-bold text-primaryBlue">
                                    {therapist.specialization}
                                </Text>
                            </View>
                        </View>
                    </View>
                    {therapist.rating && (
                        <View className="items-end">
                            <View className="flex-row items-center bg-iceBlue rounded-xl px-3 py-2">
                                <Ionicons name="star" size={18} color="#FFA726" />
                                <Text className="text-base font-avenir-bold text-textStrong ml-1">
                                    {therapist.rating.toFixed(1)}
                                </Text>
                            </View>
                            {therapist.reviewCount && (
                                <Text className="text-xs font-avenir text-textLight mt-1">
                                    {therapist.reviewCount} reviews
                                </Text>
                            )}
                        </View>
                    )}
                </View>

                {/* Divider */}
                <View className="border-t border-borderBlue my-3" style={{ opacity: 0.3 }} />

                {/* Bio */}
                {therapist.bio && (
                    <Text className="text-sm font-avenir text-textBody mb-3" numberOfLines={2}>
                        {therapist.bio}
                    </Text>
                )}

                {/* Tags: Languages, Experience, Age Groups */}
                <View className="flex-row flex-wrap gap-2 mb-4">
                    {therapist.languages && therapist.languages.length > 0 && (
                        <View className="flex-row items-center bg-iceBlue rounded-lg px-3 py-1.5">
                            <Ionicons name="language" size={16} color="#2196F3" />
                            <Text className="text-xs font-avenir-semibold text-primaryBlue ml-1">
                                {therapist.languages.join(', ')}
                            </Text>
                        </View>
                    )}
                    {therapist.yearsOfExperience && (
                        <View className="flex-row items-center bg-iceBlue rounded-lg px-3 py-1.5">
                            <Ionicons name="briefcase" size={16} color="#2196F3" />
                            <Text className="text-xs font-avenir-semibold text-primaryBlue ml-1">
                                {therapist.yearsOfExperience}+ years
                            </Text>
                        </View>
                    )}
                    {therapist.gender && (
                        <View className="flex-row items-center bg-iceBlue rounded-lg px-3 py-1.5">
                            <Ionicons
                                name={therapist.gender === 'Female' ? 'female' : 'male'}
                                size={16}
                                color="#2196F3"
                            />
                            <Text className="text-xs font-avenir-semibold text-primaryBlue ml-1">
                                {therapist.gender}
                            </Text>
                        </View>
                    )}
                </View>

                {/* Footer: Price & Action */}
                <View className="flex-row items-center justify-between pt-3 border-t-2" style={{
                    borderTopColor: '#E3F2FD',
                }}>
                    <View>
                        <Text className="text-xs font-avenir-medium text-textLight">
                            Session Price
                        </Text>
                        <Text className="text-2xl font-avenir-bold text-primaryBlue mt-1">
                            EGP {therapist.price}
                        </Text>
                    </View>
                    <View className="flex-row items-center bg-buttonPrimary rounded-2xl px-5 py-3" style={{
                        shadowColor: '#2196F3',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.3,
                        shadowRadius: 6,
                        elevation: 4,
                    }}>
                        <Text className="text-sm font-avenir-bold text-white mr-2">
                            View Profile
                        </Text>
                        <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
                    </View>
                </View>
            </View>
        </Pressable>
    );
}
