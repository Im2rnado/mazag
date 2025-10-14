import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';

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
        { id: 'happy' as Mood, label: 'Happy', bgClass: 'moodHappy', icon: 'happy' },
        { id: 'joyful' as Mood, label: 'Joyful', bgClass: 'moodJoyful', icon: 'sunny' },
        { id: 'neutral' as Mood, label: 'Neutral', bgClass: 'moodNeutral', icon: 'remove-circle' },
        { id: 'sad' as Mood, label: 'Sad', bgClass: 'moodSad', icon: 'sad' },
        { id: 'angry' as Mood, label: 'Angry', bgClass: 'moodAngry', icon: 'flame' },
    ];

    const quickActions = [
        { id: 'chat', label: 'Talk to Mazag', icon: 'chatbubble-ellipses', route: '/chat', color: '#4FC3F7' },
        { id: 'relax', label: 'Relaxation Exercise', icon: 'flower', route: '/exercises', color: '#BA68C8' },
        { id: 'journal', label: 'Journal Entry', icon: 'book', route: '/journal', color: '#FFB74D' },
        { id: 'tracker', label: 'Mood Tracker', icon: 'analytics', route: '/tracker', color: '#81D4FA' },
    ];

    // Mock stats - replace with real data later
    const stats = {
        weeklyMoodTrend: 'positive',
        journalingStreak: 5,
        exercisesCompleted: 12,
        totalConversations: 24,
        messagesLeftThisMonth: 15,
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
        <ImageBackground
            source={require('../../assets/images/background blue.png')}
            style={{ width: '100%', height: '100%' }}
        >
                <ScrollView
                    className="flex-1"
                    contentContainerStyle={{ paddingBottom: 120 }}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Image Section - Greeting & Mood Selector */}
                    <View style={{ paddingHorizontal: 24, paddingTop: 20, paddingBottom: 30, marginTop: 46 }}>
                        {/* Greeting Section */}
                        <View className="mb-8 flex-row justify-between items-center">
                            <View className="flex-1">
                                <Text className="text-heading-main font-avenir-bold text-white" style={{ textShadowColor: 'rgba(0,0,0,0.3)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 8 }}>
                                    {greeting}
                                </Text>
                                <Text className="text-heading font-avenir-semibold text-white" style={{ textShadowColor: 'rgba(0,0,0,0.2)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 }}>
                                    {userName}!
                                </Text>
                            </View>

                            {/* Profile Picture */}
                            <TouchableOpacity
                                onPress={() => router.push('/settings')}
                                activeOpacity={0.8}
                                style={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: 24,
                                    backgroundColor: '#FFFFFF',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderWidth: 2,
                                    borderColor: 'rgba(255,255,255,0.8)',
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.2,
                                    shadowRadius: 12,
                                    elevation: 8,
                                }}
                            >
                                <Ionicons name="person" size={28} color="#2196F3" />
                            </TouchableOpacity>
                        </View>

                        {/* Mood Selector Card with Blur */}
                        <BlurView
                            intensity={30}
                            tint="light"
                            style={{
                                borderRadius: 24,
                                padding: 20,
                                borderWidth: 1.5,
                                borderColor: 'rgba(255,255,255,0.6)',
                                backgroundColor: 'rgba(255,255,255,0.3)',
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 6 },
                                shadowOpacity: 0.15,
                                shadowRadius: 20,
                                elevation: 10,
                                overflow: 'hidden',
                            }}
                        >
                            <Text className="text-heading font-avenir-bold text-white mb-6" style={{ textShadowColor: 'rgba(0,0,0,0.2)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 }}>
                                How are you feeling today?
                            </Text>

                            <View className="flex-row justify-between items-center gap-4">
                                {moods.map((mood) => (
                                    <TouchableOpacity
                                        key={mood.id}
                                        onPress={() => setSelectedMood(mood.id)}
                                        className="items-center flex-1"
                                        activeOpacity={0.7}
                                    >
                                        {/* Colored Circle with Icon */}
                                        <View style={{
                                            width: 50,
                                            height: 50,
                                            borderRadius: 25,
                                            backgroundColor: mood.bgClass === 'moodHappy' ? '#FFF176' : mood.bgClass === 'moodJoyful' ? '#FFB74D' : mood.bgClass === 'moodNeutral' ? '#CE93D8' : mood.bgClass === 'moodSad' ? '#64B5F6' : mood.bgClass === 'moodAngry' ? '#E57373' : '#FFF176',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginBottom: 8,
                                            shadowColor: mood.bgClass === 'moodHappy' ? '#FFF176' : mood.bgClass === 'moodJoyful' ? '#FFB74D' : mood.bgClass === 'moodNeutral' ? '#CE93D8' : mood.bgClass === 'moodSad' ? '#64B5F6' : '#E57373',
                                            shadowOffset: { width: 0, height: 2 },
                                            shadowOpacity: selectedMood === mood.id ? 1 : 0.4,
                                            shadowRadius: 6,
                                            elevation: 4,
                                        }}>
                                            <Ionicons
                                                name={mood.icon as any}
                                                size={28}
                                                color="#FFFFFF"
                                            />
                                        </View>
                                        {/* Label */}
                                        <Text style={{ color: selectedMood === mood.id ? (mood.bgClass === 'moodHappy' ? '#FFF176' : mood.bgClass === 'moodJoyful' ? '#FFB74D' : mood.bgClass === 'moodNeutral' ? '#CE93D8' : mood.bgClass === 'moodSad' ? '#64B5F6' : '#E57373') : '#FFFFFF' }}
                                            className={`text-sm text-center ${selectedMood === mood.id ? 'font-avenir-bold' : 'font-avenir-semibold'}`} >
                                            {mood.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </BlurView>
                    </View>

                    {/* Rounded Gradient Card - Rest of Content */}
                    <ExpoLinearGradient
                        colors={['#FFFFFF', '#E3F2FD', '#B3E5FC']}
                        style={{
                            borderTopLeftRadius: 40,
                            borderTopRightRadius: 40,
                            paddingHorizontal: 24,
                            paddingTop: 30,
                            minHeight: '100%',
                            marginTop: -10,
                        }}
                        locations={[0, 0.7, 1]}
                    >

                        {/* Personalized Recommendation */}
                        {selectedMood && getRecommendation() && (
                            <View className="bg-iceBlue rounded-2xl p-5 border border-borderBlue mb-6" style={{
                                shadowColor: '#2196F3',
                                shadowOffset: { width: 0, height: 3 },
                                shadowOpacity: 0.2,
                                shadowRadius: 12,
                                elevation: 6,
                            }}>
                                <View className="flex-row items-start">
                                    <View className="bg-primaryBlue rounded-full p-3" style={{ marginRight: 12 }}>
                                        <Ionicons name="bulb" size={22} color="#FFFFFF" />
                                    </View>
                                    <View className="flex-1">
                                        <Text className="text-xs font-avenir-bold text-primaryBlue mb-1">
                                            MAZAG RECOMMENDS
                                        </Text>
                                        <Text className="text-subheading font-avenir-medium text-textStrong">
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
                            <View className="flex-row justify-between mb-3">
                                {quickActions.slice(0, 2).map((action) => (
                                    <TouchableOpacity
                                        key={action.id}
                                        onPress={() => router.push(action.route as any)}
                                        className="bg-glassBg rounded-2xl p-5 border border-glassBorder items-center"
                                        activeOpacity={0.7}
                                        style={{
                                            width: 180,
                                            shadowColor: action.color,
                                            shadowOffset: { width: 0, height: 2 },
                                            shadowOpacity: 0.25,
                                            shadowRadius: 12,
                                            elevation: 6,
                                        }}
                                    >
                                        <View
                                            className="w-14 h-14 rounded-full items-center justify-center mb-3"
                                            style={{ backgroundColor: action.color }}
                                        >
                                            <Ionicons name={action.icon as any} size={26} color="#FFFFFF" />
                                        </View>
                                        <Text className="text-body font-avenir-semibold text-textStrong text-center">
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
                                        className="bg-glassBg rounded-2xl p-5 border border-glassBorder items-center"
                                        activeOpacity={0.7}
                                        style={{
                                            width: 180,
                                            shadowColor: action.color,
                                            shadowOffset: { width: 0, height: 2 },
                                            shadowOpacity: 0.25,
                                            shadowRadius: 12,
                                            elevation: 6,
                                        }}
                                    >
                                        <View
                                            className="w-14 h-14 rounded-full items-center justify-center mb-3"
                                            style={{ backgroundColor: action.color }}
                                        >
                                            <Ionicons name={action.icon as any} size={26} color="#FFFFFF" />
                                        </View>
                                        <Text className="text-body font-avenir-semibold text-textStrong text-center">
                                            {action.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* Therapist Connection Preview */}
                        <View className="bg-glassBg rounded-2xl p-6 border border-glassBorder mb-6" style={{
                            shadowColor: '#2196F3',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.2,
                            shadowRadius: 14,
                            elevation: 6,
                        }}>
                            <View className="flex-row items-center mb-4">
                                <View className="flex-1">
                                    <Text className="text-heading font-avenir-semibold text-textStrong mb-2">
                                        Professional Support
                                    </Text>
                                    <Text className="text-subheading font-avenir-medium text-textLight">
                                        Connect with a licensed therapist
                                    </Text>
                                </View>
                                <View className="bg-iceBlue rounded-full w-16 h-16 items-center justify-center">
                                    <MaterialCommunityIcons name="account-heart" size={32} color="#2196F3" />
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => router.push('/therapists')}
                                className="bg-buttonPrimary rounded-2xl py-4 items-center"
                                activeOpacity={0.8}
                                style={{
                                    shadowColor: '#2196F3',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 8,
                                    elevation: 4,
                                }}
                            >
                                <Text className="text-subheading font-avenir-bold text-white">
                                    Find a Match
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Stats Summary */}
                        <View className="mb-6">
                            <Text className="text-heading font-avenir-semibold text-textStrong mb-4">
                                Your Progress
                            </Text>

                            {/* Weekly Mood Card */}
                            <TouchableOpacity
                                activeOpacity={0.8}
                                className="mb-3"
                                onPress={() => router.push('/tracker')}
                            >
                                <ExpoLinearGradient
                                    colors={['#FFF9C4', '#FFF176']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={{
                                        borderRadius: 20,
                                        padding: 20,
                                        shadowColor: '#FFF176',
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.3,
                                        shadowRadius: 12,
                                        elevation: 6,
                                    }}
                                >
                                    <View className="flex-row items-center justify-between">
                                        <View className="flex-row items-center flex-1">
                                            <View style={{
                                                width: 48,
                                                height: 48,
                                                borderRadius: 24,
                                                backgroundColor: 'rgba(255,255,255,0.9)',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginRight: 14,
                                            }}>
                                                <Ionicons name="trending-up" size={24} color="#F57F17" />
                                            </View>
                                            <View className="flex-1">
                                                <Text className="text-middleheadingsub font-avenir-bold text-textStrong">
                                                    Weekly Mood
                                                </Text>
                                                <Text className="text-subheading font-avenir-medium" style={{ color: '#F57F17' }}>
                                                    Trending {stats.weeklyMoodTrend}
                                                </Text>
                                            </View>
                                        </View>
                                        <Ionicons name="chevron-forward" size={24} color="#F57F17" />
                                    </View>
                                </ExpoLinearGradient>
                            </TouchableOpacity>

                            {/* Journaling Streak Card */}
                            <TouchableOpacity
                                activeOpacity={0.8}
                                className="mb-3"
                                onPress={() => router.push('/journal')}
                            >
                                <ExpoLinearGradient
                                    colors={['#FFCC80', '#FFB74D']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={{
                                        borderRadius: 20,
                                        padding: 20,
                                        shadowColor: '#FFB74D',
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.3,
                                        shadowRadius: 12,
                                        elevation: 6,
                                    }}
                                >
                                    <View className="flex-row items-center justify-between">
                                        <View className="flex-row items-center flex-1">
                                            <View style={{
                                                width: 48,
                                                height: 48,
                                                borderRadius: 24,
                                                backgroundColor: 'rgba(255,255,255,0.9)',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginRight: 14,
                                            }}>
                                                <Ionicons name="flame" size={24} color="#E65100" />
                                            </View>
                                            <View className="flex-1">
                                                <Text className="text-middleheadingsub font-avenir-bold text-textStrong">
                                                    Journaling Streak
                                                </Text>
                                                <Text className="text-subheading font-avenir-medium" style={{ color: '#E65100' }}>
                                                    {stats.journalingStreak} days in a row
                                                </Text>
                                            </View>
                                        </View>
                                        <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#E65100' }}>
                                            {stats.journalingStreak}
                                        </Text>
                                    </View>
                                </ExpoLinearGradient>
                            </TouchableOpacity>

                            {/* AI Chatbot Conversations Card */}
                            <TouchableOpacity
                                activeOpacity={0.8}
                                className="mb-3"
                                onPress={() => router.push('/chat')}
                            >
                                <ExpoLinearGradient
                                    colors={['#B3E5FC', '#81D4FA']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={{
                                        borderRadius: 20,
                                        padding: 20,
                                        shadowColor: '#4FC3F7',
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.3,
                                        shadowRadius: 12,
                                        elevation: 6,
                                    }}
                                >
                                    <View className="flex-row items-center justify-between">
                                        <View className="flex-row items-center flex-1">
                                            <View style={{
                                                width: 48,
                                                height: 48,
                                                borderRadius: 24,
                                                backgroundColor: 'rgba(255,255,255,0.9)',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginRight: 14,
                                            }}>
                                                <MaterialCommunityIcons name="robot-happy" size={24} color="#0277BD" />
                                            </View>
                                            <View className="flex-1">
                                                <Text className="text-middleheadingsub font-avenir-bold text-textStrong">
                                                    Mazag Chats
                                                </Text>
                                                <Text className="text-subheading font-avenir-medium" style={{ color: '#0277BD' }}>
                                                    Always here for you
                                                </Text>
                                            </View>
                                        </View>
                                        <Ionicons name="chatbubbles" size={28} color="#0277BD" />
                                    </View>
                                </ExpoLinearGradient>
                            </TouchableOpacity>

                            {/* Exercises Completed Card */}
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => router.push('/exercises')}
                            >
                                <ExpoLinearGradient
                                    colors={['#E1BEE7', '#CE93D8']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={{
                                        borderRadius: 20,
                                        padding: 20,
                                        shadowColor: '#BA68C8',
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.3,
                                        shadowRadius: 12,
                                        elevation: 6,
                                    }}
                                >
                                    <View className="flex-row items-center justify-between">
                                        <View className="flex-row items-center flex-1">
                                            <View style={{
                                                width: 48,
                                                height: 48,
                                                borderRadius: 24,
                                                backgroundColor: 'rgba(255,255,255,0.9)',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginRight: 14,
                                            }}>
                                                <Ionicons name="checkmark-circle" size={24} color="#7B1FA2" />
                                            </View>
                                            <View className="flex-1">
                                                <Text className="text-middleheadingsub font-avenir-bold text-textStrong">
                                                    Exercises Done
                                                </Text>
                                                <Text className="text-subheading font-avenir-medium" style={{ color: '#7B1FA2' }}>
                                                    This month
                                                </Text>
                                            </View>
                                        </View>
                                        <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#7B1FA2' }}>
                                            {stats.exercisesCompleted}
                                        </Text>
                                    </View>
                                </ExpoLinearGradient>
                            </TouchableOpacity>
                        </View>

                        {/* Mazag Bot Summary */}
                        <View className="mb-6">
                            <Text className="text-heading font-avenir-semibold text-textStrong mb-4">
                                Mazag Assistant
                            </Text>

                            <ExpoLinearGradient
                                colors={['#BBDEFB', '#BBDEFB', '#90CAF9']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={{
                                    borderRadius: 24,
                                    padding: 24,
                                    shadowColor: '#2196F3',
                                    shadowOffset: { width: 0, height: 6 },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 16,
                                    elevation: 8,
                                }}
                            >
                                <View className="flex-row items-center justify-between">
                                    {/* Left Side - Info */}
                                    <View className="flex-1" style={{ marginRight: 16 }}>
                                        {/* Conversation Count */}
                                        <View className="mb-4">
                                            <Text style={{ fontSize: 48, fontWeight: 'bold', color: '#1565C0', lineHeight: 52 }}>
                                                {stats.totalConversations}
                                            </Text>
                                            <Text className="text-subheading font-avenir-bold text-textStrong">
                                                Conversations
                                            </Text>
                                        </View>

                                        {/* Messages Left */}
                                        <View className="flex-row items-center mb-2" style={{ backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 12, paddingVertical: 8, paddingHorizontal: 10 }}>
                                            <Ionicons name="chatbubble-ellipses" size={18} color="#1976D2" style={{ marginRight: 8 }} />
                                            <Text className="text-sm font-avenir-bold text-textStrong">
                                                {stats.messagesLeftThisMonth} remaining this month
                                            </Text>
                                        </View>

                                        {/* Go Pro Button */}
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            onPress={() => router.push('/settings')}
                                            style={{
                                                backgroundColor: '#FFD700',
                                                borderRadius: 12,
                                                paddingVertical: 8,
                                                paddingHorizontal: 10,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                shadowColor: '#FFD700',
                                                shadowOffset: { width: 0, height: 3 },
                                                shadowOpacity: 0.4,
                                                shadowRadius: 8,
                                                elevation: 4,
                                            }}
                                        >
                                            <Ionicons name="star" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
                                            <Text className="text-sm font-avenir-bold text-white">
                                                Go PRO for unlimited!
                                            </Text>
                                        </TouchableOpacity>
                                    </View>

                                    {/* Right Side - Chatbot Icon */}
                                    <View style={{
                                        width: 100,
                                        height: 100,
                                        borderRadius: 50,
                                        backgroundColor: 'rgba(255,255,255,0.7)',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        shadowColor: '#2196F3',
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.3,
                                        shadowRadius: 12,
                                        elevation: 6,
                                    }}>
                                        <MaterialCommunityIcons name="robot-happy" size={56} color="#1565C0" />
                                    </View>
                                </View>
                            </ExpoLinearGradient>
                        </View>
                    </ExpoLinearGradient>
                </ScrollView>
        </ImageBackground>
    );
}
