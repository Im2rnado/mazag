import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type Mood = 'happy' | 'joyful' | 'neutral' | 'sad' | 'angry' | null;

export default function Home() {
    const router = useRouter();
    const [greeting, setGreeting] = useState('Good Morning');
    const [userName] = useState('Yassin Bedier'); // This will come from user state later
    const [selectedMood, setSelectedMood] = useState<Mood>(null);

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) {
            setGreeting('Good Morning,');
        } else if (hour < 18) {
            setGreeting('Good Afternoon,');
        } else {
            setGreeting('Good Evening,');
        }
    }, []);

    const moods = [
        { id: 'happy' as Mood, label: 'Happy', bgClass: 'bg-moodHappy', icon: 'happy' },
        { id: 'joyful' as Mood, label: 'Joyful', bgClass: 'bg-moodJoyful', icon: 'sunny' },
        { id: 'neutral' as Mood, label: 'Neutral', bgClass: 'bg-moodNeutral', icon: 'remove-circle' },
        { id: 'sad' as Mood, label: 'Sad', bgClass: 'bg-moodSad', icon: 'sad' },
        { id: 'angry' as Mood, label: 'Angry', bgClass: 'bg-moodAngry', icon: 'flame' },
    ];

    const quickActions = [
        { id: 'chat', label: 'Talk to Mazag', icon: 'chatbubble-ellipses', route: '/chat', color: '#A8D8FF' },
        { id: 'relax', label: 'Relaxation Exercise', icon: 'flower', route: '/exercises', color: '#D4C5F9' },
        { id: 'journal', label: 'Journal Entry', icon: 'book', route: '/journal', color: '#FFE0B2' },
        { id: 'tracker', label: 'Mood Tracker', icon: 'analytics', route: '/tracker', color: '#BBDEFB' },
    ];

    // Mock stats - replace with real data later
    const stats = {
        weeklyMoodTrend: 'positive',
        journalingStreak: 5,
        exercisesCompleted: 12,
    };

    // Get recommendation based on mood
    const getRecommendation = () => {
        if (!selectedMood) return null;

        const recommendations = {
            happy: "You're feeling great! Keep the momentum going with a gratitude journal.",
            joyful: "Your positive energy is wonderful! Share it by talking to Mazag.",
            neutral: "Take a moment for yourself with a quick 3-minute breathing exercise.",
            sad: "We're here for you. Try a calming meditation or chat with Mazag.",
            angry: "Let's work through this together. A breathing exercise might help you feel centered.",
        };

        return recommendations[selectedMood];
    };

    return (
        <ExpoLinearGradient
            colors={['#FFFFFF', '#E3F2FD']}
            style={{ flex: 1 }}
            locations={[0, 1]}
        >
            <SafeAreaView style={{ flex: 1 }} edges={['top']}>
                <ScrollView
                    className="flex-1"
                    contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 10, paddingBottom: 120 }}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Greeting Section */}
                    <View className="mb-8 mt-4">
                        <Text className="text-heading-main font-avenir-bold text-textStrong">
                            {greeting}
                        </Text>
                        <Text className="text-heading font-avenir text-textStrong">
                            {userName}!
                        </Text>
                    </View>

                    {/* Mood Selector Card */}
                    <ExpoLinearGradient
                        colors={['rgba(255,255,255,0.95)', 'rgba(227,242,253,0.9)', 'rgba(186,222,251,0.15)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{
                            borderRadius: 16,
                            padding: 24,
                            marginBottom: 24,
                            borderWidth: 1,
                            borderColor: 'rgba(100,181,246,0.2)',
                            shadowColor: '#64B5F6',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.2,
                            shadowRadius: 12,
                            elevation: 5,
                        }}
                    >
                        <Text className="text-heading font-avenir-semibold text-textStrong mb-6">
                            How are you feeling today?
                        </Text>

                        <View className="flex-row justify-between items-center">
                            {moods.map((mood) => (
                                <TouchableOpacity
                                    key={mood.id}
                                    onPress={() => setSelectedMood(mood.id)}
                                    className="items-center flex-1"
                                    activeOpacity={0.7}
                                >
                                    {/* Colored Circle with Icon */}
                                    <View
                                        className={`w-12 h-12 rounded-full mb-2 items-center justify-center ${mood.bgClass} ${selectedMood === mood.id ? 'border-[3px] border-primaryBlue' : ''
                                            }`}
                                    >
                                        <Ionicons
                                            name={mood.icon as any}
                                            size={24}
                                            color={selectedMood === mood.id ? '#2C5F7C' : '#4A7C9D'}
                                        />
                                    </View>
                                    {/* Label */}
                                    <Text
                                        className={`text-xs text-center ${selectedMood === mood.id
                                            ? 'font-avenir-semibold text-textStrong'
                                            : 'font-avenir-semibold text-textBody'
                                            }`}
                                    >
                                        {mood.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ExpoLinearGradient>

                    {/* Personalized Recommendation */}
                    {selectedMood && getRecommendation() && (
                        <View className="bg-lightBlue rounded-2xl p-5 border border-borderBlue shadow-soft mb-6">
                            <View className="flex-row items-start">
                                <View className="bg-primaryBlue rounded-full p-2 mr-3">
                                    <Ionicons name="bulb" size={20} color="#FFFFFF" />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-xs font-avenir-semibold text-primaryBlue mb-1">
                                        Mazag Recommends
                                    </Text>
                                    <Text className="text-subheading font-avenir text-textStrong">
                                        {getRecommendation()}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    )}

                    {/* Quick Actions Section */}
                    <View className="mb-6">
                        <Text className="text-heading font-avenir-semibold text-textStrong mb-4">
                            Quick Actions
                        </Text>
                        {/* First Row */}
                        <View className="flex-row justify-between mb-2">
                            {quickActions.slice(0, 2).map((action) => (
                                <TouchableOpacity
                                    key={action.id}
                                    onPress={() => router.push(action.route as any)}
                                    className="bg-glassBg rounded-2xl p-4 border border-glassBorder shadow-soft items-center"
                                    activeOpacity={0.7}
                                    style={{
                                        width: 180,
                                        shadowColor: action.color,
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.1,
                                        shadowRadius: 8,
                                    }}
                                >
                                    <View
                                        className="w-12 h-12 rounded-full items-center justify-center mb-3"
                                        style={{ backgroundColor: action.color }}
                                    >
                                        <Ionicons name={action.icon as any} size={24} color="#FFFFFF" />
                                    </View>
                                    <Text className="text-body font-avenir-medium text-textStrong">
                                        {action.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        {/* Second Row */}
                        <View className="flex-row justify-between">
                            {quickActions.slice(2, 4).map((action) => (
                                <TouchableOpacity
                                    key={action.id}
                                    onPress={() => router.push(action.route as any)}
                                    className="bg-glassBg rounded-2xl p-4 border border-glassBorder shadow-soft items-center"
                                    activeOpacity={0.7}
                                    style={{
                                        width: 180,
                                        shadowColor: action.color,
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.1,
                                        shadowRadius: 8,
                                    }}
                                >
                                    <View
                                        className="w-12 h-12 rounded-full items-center justify-center mb-3"
                                        style={{ backgroundColor: action.color }}
                                    >
                                        <Ionicons name={action.icon as any} size={24} color="#FFFFFF" />
                                    </View>
                                    <Text className="text-body font-avenir-medium text-textStrong">
                                        {action.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Therapist Connection Preview */}
                    <View className="bg-glassBg rounded-2xl p-5 border border-glassBorder shadow-card mb-6">
                        <View className="flex-row items-center mb-3">
                            <View className="flex-1">
                                <Text className="text-heading font-avenir-semibold text-textStrong">
                                    Professional Support
                                </Text>
                                <Text className="text-subheading font-avenir text-textLight">
                                    Connect with a licensed therapist
                                </Text>
                            </View>
                            <View className="bg-accentBlue rounded-full w-20 h-20 items-center justify-center">
                                <MaterialCommunityIcons name="account-heart" size={34} color="#42A5F5" />
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() => router.push('/therapists')}
                            className="bg-buttonPrimary rounded-2xl py-3 items-center"
                            activeOpacity={0.8}
                        >
                            <Text className="text-subheading font-avenir-semibold text-white">
                                Find a Match
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Stats Summary */}
                    <View className="mb-6">
                        <Text className="text-heading font-avenir-semibold text-textStrong mb-4">
                            Your Progress
                        </Text>
                        <View className="bg-glassBg rounded-2xl p-5 border border-glassBorder shadow-card">
                            {/* Weekly Mood Trend */}
                            <View className="flex-row items-center justify-between mb-4 pb-4 border-b border-borderBlue">
                                <View className="flex-row items-center flex-1">
                                    <View className="bg-moodHappy rounded-full p-2" style={{ marginRight: 12 }}>
                                        <Ionicons name="trending-up" size={20} color="#4A7C9D" />
                                    </View>
                                    <View>
                                        <Text className="text-body font-avenir-medium text-textStrong">
                                            Weekly Mood
                                        </Text>
                                        <Text className="text-xs font-avenir text-textLight">
                                            Trending {stats.weeklyMoodTrend}
                                        </Text>
                                    </View>
                                </View>
                                <Ionicons name="chevron-forward" size={20} color="#8FA9B8" />
                            </View>

                            {/* Journaling Streak */}
                            <View className="flex-row items-center justify-between mb-4 pb-4 border-b border-borderBlue">
                                <View className="flex-row items-center flex-1">
                                    <View className="bg-moodJoyful rounded-full p-2" style={{ marginRight: 12 }}>
                                        <Ionicons name="flame" size={20} color="#4A7C9D" />
                                    </View>
                                    <View>
                                        <Text className="text-body font-avenir-medium text-textStrong">
                                            Journaling Streak
                                        </Text>
                                        <Text className="text-xs font-avenir text-textLight">
                                            {stats.journalingStreak} days in a row
                                        </Text>
                                    </View>
                                </View>
                                <Text className="text-heading font-avenir-bold text-primaryBlue">
                                    {stats.journalingStreak}
                                </Text>
                            </View>

                            {/* Exercises Completed */}
                            <View className="flex-row items-center justify-between">
                                <View className="flex-row items-center flex-1">
                                    <View className="bg-moodNeutral rounded-full p-2" style={{ marginRight: 12 }}>
                                        <Ionicons name="checkmark-circle" size={20} color="#4A7C9D" />
                                    </View>
                                    <View>
                                        <Text className="text-body font-avenir-medium text-textStrong">
                                            Exercises Done
                                        </Text>
                                        <Text className="text-xs font-avenir text-textLight">
                                            This month
                                        </Text>
                                    </View>
                                </View>
                                <Text className="text-heading font-avenir-bold text-primaryBlue">
                                    {stats.exercisesCompleted}
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ExpoLinearGradient>
    );
}
