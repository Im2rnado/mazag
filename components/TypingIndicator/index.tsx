import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';

export default function TypingIndicator() {
    const dot1 = useRef(new Animated.Value(0)).current;
    const dot2 = useRef(new Animated.Value(0)).current;
    const dot3 = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const createBounceAnimation = (dotAnim: Animated.Value, delay: number) => {
            return Animated.loop(
                Animated.sequence([
                    Animated.delay(delay),
                    Animated.timing(dotAnim, {
                        toValue: 1,
                        duration: 400,
                        easing: Easing.ease,
                        useNativeDriver: true,
                    }),
                    Animated.timing(dotAnim, {
                        toValue: 0,
                        duration: 400,
                        easing: Easing.ease,
                        useNativeDriver: true,
                    }),
                ])
            );
        };

        const animation1 = createBounceAnimation(dot1, 0);
        const animation2 = createBounceAnimation(dot2, 150);
        const animation3 = createBounceAnimation(dot3, 300);

        animation1.start();
        animation2.start();
        animation3.start();

        return () => {
            animation1.stop();
            animation2.stop();
            animation3.stop();
        };
    }, []);

    const animateDot = (dotAnim: Animated.Value) => ({
        opacity: dotAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.3, 1],
        }),
        transform: [
            {
                translateY: dotAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -6],
                }),
            },
            {
                scale: dotAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1.1],
                }),
            },
        ],
    });

    return (
        <View className="items-start my-2">
            <View className="px-5 py-3.5 rounded-3xl" style={{
                backgroundColor: 'rgba(255,255,255,0.98)',
                borderWidth: 1.5,
                borderColor: 'rgba(129, 212, 250, 0.4)',
                shadowColor: '#64B5F6',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.12,
                shadowRadius: 10,
                elevation: 3,
            }}>
                <View className="flex-row gap-1.5" style={{ height: 16, alignItems: 'center' }}>
                    <Animated.View
                        className="w-2.5 h-2.5 rounded-full"
                        style={[
                            { backgroundColor: '#64B5F6' },
                            animateDot(dot1),
                        ]}
                    />
                    <Animated.View
                        className="w-2.5 h-2.5 rounded-full"
                        style={[
                            { backgroundColor: '#42A5F5' },
                            animateDot(dot2),
                        ]}
                    />
                    <Animated.View
                        className="w-2.5 h-2.5 rounded-full"
                        style={[
                            { backgroundColor: '#2196F3' },
                            animateDot(dot3),
                        ]}
                    />
                </View>
            </View>
        </View>
    );
}

