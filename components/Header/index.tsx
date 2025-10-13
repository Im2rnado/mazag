import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Header({ title = 'Mazag' }: { title?: string }) {
    return (
        <View className="flex-row items-center justify-between py-4 px-3">
            <Text className="text-textTitle text-xl font-bold">{title}</Text>
            <View className="flex-row items-center">
                <TouchableOpacity className="p-2 bg-glassBg border border-glassBorder rounded-2xl shadow-glassSoft">
                    <Ionicons name="notifications-outline" size={20} color="#F5F7F5" />
                </TouchableOpacity>
            </View>
        </View>
    );
}
