import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';

export default function ChatBubble({ text, fromUser }: { text: string; fromUser?: boolean }) {
    return (
        <View className={`${fromUser ? 'items-end' : 'items-start'} my-2`}>
            {fromUser ? (
                // User message - Gradient blue
                <ExpoLinearGradient
                    colors={['#2196F3', '#1976D2']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        shadowColor: '#2196F3',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 8,
                        elevation: 4,
                        borderBottomRightRadius: 4,
                        paddingHorizontal: 16,
                        paddingVertical: 12,
                        borderRadius: 24,
                        maxWidth: '80%',
                    }}
                >
                    <Text className="font-avenir-medium text-subheading text-white text-sm">
                        {text}
                    </Text>
                </ExpoLinearGradient>
            ) : (
                // Bot message - Glass effect with subtle gradient
                <View className="px-4 py-3 rounded-2xl max-w-[80%] border" style={{
                    backgroundColor: 'rgba(255,255,255,0.95)',
                    borderWidth: 1.5,
                    borderColor: 'rgba(129, 212, 250, 0.4)',
                    shadowColor: '#64B5F6',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.15,
                    shadowRadius: 8,
                    elevation: 3,
                    borderBottomLeftRadius: 4,
                }}>
                    <Text className="font-avenir-medium text-subheading text-textStrong text-sm">
                        {text}
                    </Text>
                </View>
            )}
        </View>
    );
}
