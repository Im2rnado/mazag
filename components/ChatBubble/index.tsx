import React from 'react';
import { View, Text } from 'react-native';

export default function ChatBubble({ text, fromUser }: { text: string; fromUser?: boolean }) {
    return (
        <View className={`${fromUser ? 'items-end' : 'items-start'} my-2`}>
            <View className={`px-4 py-3 rounded-2xl max-w-[80%] shadow-soft ${fromUser
                ? 'bg-buttonPrimary'
                : 'bg-glassBg border border-glassBorder'
                }`}>
                <Text className={`font-avenir text-body ${fromUser ? 'text-white' : 'text-textStrong'
                    }`}>
                    {text}
                </Text>
            </View>
        </View>
    );
}
