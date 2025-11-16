import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from 'react-native';
import Animated, {
    FadeIn,
    FadeOut,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import InfiniteCarousel, {
    CarouselItemRenderer,
} from './InfiniteCarousel';

/* ---------- Types ---------- */
export type WelcomeSlide = {
    id: number;
    title: string;
    description: string;
    image: { uri: string };
    color: string;
};

/* ---------- Background image component ---------- */
function DynamicBackground({ uri, color }: { uri?: string; color?: string }) {
    return (
        <>
            {uri && (
                <Animated.Image
                    key={uri}
                    source={{ uri }}
                    resizeMode="cover"
                    style={StyleSheet.absoluteFillObject}
                    entering={FadeIn.duration(800)}
                    exiting={FadeOut.duration(800)}
                />
            )}
            <Animated.View
                key={color}
                style={[
                    StyleSheet.absoluteFillObject,
                    { backgroundColor: color || 'rgba(33, 150, 243, 0.3)' }
                ]}
                entering={FadeIn.duration(800)}
                exiting={FadeOut.duration(800)}
            />
        </>
    );
}

/* ---------- Card shown inside the carousel ---------- */
export function WelcomeCard({ slide }: { slide: WelcomeSlide }) {
    return (
        <View className="w-full rounded-[28px] overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
            <Image
                source={slide.image}
                className="w-full h-full"
                resizeMode="cover"
            />
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)', 'rgba(0, 0, 0, 0.85)']}
                style={StyleSheet.absoluteFillObject}
                className="justify-end"
            >
                <View className="p-6">
                    <Text className="text-[26px] font-avenir-bold text-white mb-2">
                        {slide.title}
                    </Text>
                    <Text className="text-[15px] text-white leading-[22px]" style={{ opacity: 0.9 }}>
                        {slide.description}
                    </Text>
                </View>
            </LinearGradient>
        </View>
    );
}

/* ---------- Default slides data ---------- */
const defaultSlides: WelcomeSlide[] = [
    {
        id: 1,
        title: 'Welcome to Mazag',
        description: 'Your personal AI companion for mental wellness and emotional support',
        image: { uri: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&q=80' },
        color: 'rgba(100, 181, 246, 0.4)',
    },
    {
        id: 2,
        title: 'Your AI Companion',
        description: 'Chat anytime with our intelligent assistant trained to understand and support you',
        image: { uri: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80' },
        color: 'rgba(66, 165, 245, 0.4)',
    },
    {
        id: 3,
        title: 'Personalized Support',
        description: 'Get tailored exercises, therapist matches, and wellness recommendations',
        image: { uri: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80' },
        color: 'rgba(33, 150, 243, 0.4)',
    },
    {
        id: 4,
        title: "Let's Get Started",
        description: 'Help us understand you better so we can provide the best support',
        image: { uri: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80' },
        color: 'rgba(25, 118, 210, 0.4)',
    },
];

/* ---------- Main component ---------- */
export default function WelcomeCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);
    const { width } = useWindowDimensions();

    const activeSlide = useMemo(
        () => defaultSlides[activeIndex],
        [activeIndex],
    );

    const handleGetStarted = () => {
        router.replace('/onboarding/questionnaire');
    };

    return (
        <View className="flex-1 bg-[#E3F2FD]">
            <DynamicBackground uri={activeSlide?.image?.uri} color={activeSlide?.color} />

            {/* Dark overlay */}
            <View
                style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.45)' }]}
            />

            <BlurView intensity={70} style={StyleSheet.absoluteFill}>
                <SafeAreaView edges={['bottom']} className="flex-1">
                    {/* ------------ Carousel ------------ */}
                    <Animated.View
                        entering={FadeIn.springify().damping(28)}
                        className="w-full mt-[60px]"
                        style={{ height: width * 1.05 }}
                    >
                        <InfiniteCarousel<WelcomeSlide>
                            carouselItems={defaultSlides}
                            onIndexChange={setActiveIndex}
                            itemWidthRatio={0.68}
                            autoPlaySpeed={50}
                            renderItem={(({ item }) =>
                                <WelcomeCard slide={item} />) as CarouselItemRenderer<
                                    WelcomeSlide
                                >}
                        />
                    </Animated.View>

                    {/* ------------ Text & CTA ------------ */}
                    <View className="flex-1 p-5 justify-center gap-4">
                        <Text className="text-center text-[38px] font-avenir-bold text-white" style={{ letterSpacing: 0.5 }}>
                            Mazag
                        </Text>

                        <Text className="text-center text-[17px] text-white mb-5 leading-6 px-2.5" style={{ opacity: 0.85 }}>
                            Your journey to better mental health starts here. Let's personalize your experience.
                        </Text>

                        <TouchableOpacity
                            activeOpacity={0.85}
                            onPress={handleGetStarted}
                            className="w-full items-center justify-center rounded-[28px] px-[42px] py-[18px]"
                            style={{
                                backgroundColor: 'rgba(255,255,255,0.96)',
                                shadowColor: '#2196F3',
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.3,
                                shadowRadius: 12,
                                elevation: 6,
                            }}
                        >
                            <Text className="text-[18px] font-avenir-bold text-[#1976D2]">
                                Begin Your Journey
                            </Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </BlurView>
        </View>
    );
}
