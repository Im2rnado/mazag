import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';

export default function ChatBubble({
    text,
    fromUser,
    timestamp
}: {
    text: string;
    fromUser?: boolean;
    timestamp?: number;
}) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                tension: 50,
                friction: 7,
                useNativeDriver: true,
            })
        ]).start();
    }, []);

    const formatTime = (ts?: number) => {
        if (!ts) return '';
        const date = new Date(ts);
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <Animated.View
            className={`${fromUser ? 'items-end' : 'items-start'} my-1.5`}
            style={{
                opacity: fadeAnim,
                transform: [{
                    translateY: slideAnim
                }, {
                    translateX: fromUser ? slideAnim : slideAnim.interpolate({
                        inputRange: [0, 20],
                        outputRange: [0, -20]
                    })
                }]
            }}
        >
            {fromUser ? (
                // User message - Enhanced gradient
                <View style={{ maxWidth: '85%' }}>
                    <ExpoLinearGradient
                        colors={['#42A5F5', '#2196F3', '#1976D2']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{
                            shadowColor: '#2196F3',
                            shadowOffset: { width: 0, height: 3 },
                            shadowOpacity: 0.3,
                            shadowRadius: 10,
                            elevation: 5,
                            borderBottomRightRadius: 6,
                            paddingHorizontal: 16,
                            paddingVertical: 12,
                            borderRadius: 20,
                        }}
                    >
                        <Text className="font-avenir-semibold text-white" style={{ fontSize: 15 }}>
                            {text}
                        </Text>
                    </ExpoLinearGradient>
                    {timestamp && (
                        <Text className="text-xs font-avenir-medium mt-1 mr-1" style={{ color: '#90A4AE', textAlign: 'right' }}>
                            {formatTime(timestamp)}
                        </Text>
                    )}
                </View>
            ) : (
                // Bot message - Enhanced glass effect
                <View style={{ maxWidth: '85%' }}>
                    <View className="px-4 py-3.5 rounded-3xl" style={{
                        backgroundColor: 'rgba(255,255,255,0.98)',
                        borderWidth: 1.5,
                        borderColor: 'rgba(100, 181, 246, 0.3)',
                        shadowColor: '#64B5F6',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.12,
                        shadowRadius: 10,
                        elevation: 3,
                        borderBottomLeftRadius: 6,
                    }}>
                        <Text className="font-avenir-medium text-textStrong" style={{ fontSize: 15 }}>
                            {text}
                        </Text>
                    </View>
                    {timestamp && (
                        <Text className="text-xs font-avenir-medium mt-1 ml-1" style={{ color: '#90A4AE' }}>
                            {formatTime(timestamp)}
                        </Text>
                    )}
                </View>
            )}
        </Animated.View>
    );
}
