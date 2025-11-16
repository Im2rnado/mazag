import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import QuestionCard, { QuestionData } from '@/components/Onboarding/QuestionCard';
import ProgressBar from '@/components/Onboarding/ProgressBar';
import OnboardingService from '@/services/OnboardingService';
import { OnboardingResponse } from '@/types/onboarding';

const questions: QuestionData[] = [
    {
        id: 'primaryConcern',
        question: 'What brings you to Mazag?',
        type: 'multi',
        required: true,
        options: [
            { value: 'anxiety', label: 'Anxiety', icon: 'alert-circle' },
            { value: 'depression', label: 'Depression', icon: 'sad' },
            { value: 'stress', label: 'Stress', icon: 'flash' },
            { value: 'sleep', label: 'Sleep issues', icon: 'moon' },
            { value: 'wellness', label: 'General wellness', icon: 'leaf' },
            { value: 'relationships', label: 'Relationship challenges', icon: 'people' },
        ],
    },
    {
        id: 'severityLevel',
        question: 'How would you rate your current wellbeing?',
        type: 'slider',
        required: true,
        sliderMin: 1,
        sliderMax: 10,
        sliderStep: 1,
    },
    {
        id: 'therapyExperience',
        question: 'Have you tried therapy before?',
        type: 'single',
        required: false,
        options: [
            { value: 'currently', label: 'Yes, currently', icon: 'checkmark-circle' },
            { value: 'past', label: 'Yes, in the past', icon: 'time' },
            { value: 'interested', label: 'No, but interested', icon: 'heart' },
            { value: 'never', label: 'Never considered', icon: 'close-circle' },
        ],
    },
    {
        id: 'therapyApproach',
        question: 'What approaches interest you?',
        type: 'multi',
        required: false,
        options: [
            { value: 'cbt', label: 'CBT', icon: 'bulb' },
            { value: 'talk', label: 'Talk therapy', icon: 'chatbubbles' },
            { value: 'mindfulness', label: 'Mindfulness', icon: 'medkit' },
            { value: 'journaling', label: 'Journaling', icon: 'book' },
            { value: 'breathing', label: 'Breathing exercises', icon: 'cloud' },
            { value: 'movement', label: 'Movement-based', icon: 'walk' },
        ],
    },
    {
        id: 'moodPatterns',
        question: 'When do you typically feel most challenged?',
        type: 'single',
        required: false,
        options: [
            { value: 'morning', label: 'Mornings', icon: 'sunny' },
            { value: 'afternoon', label: 'Afternoons', icon: 'partly-sunny' },
            { value: 'evening', label: 'Evenings', icon: 'moon' },
            { value: 'night', label: 'Night', icon: 'moon-outline' },
            { value: 'varies', label: 'Varies daily', icon: 'shuffle' },
        ],
    },
    {
        id: 'sleepQuality',
        question: 'How would you rate your sleep quality?',
        type: 'slider',
        required: false,
        sliderMin: 1,
        sliderMax: 10,
        sliderStep: 1,
    },
    {
        id: 'supportSystem',
        question: 'How would you describe your support network?',
        type: 'single',
        required: false,
        options: [
            { value: 'strong', label: 'Strong', icon: 'people-circle' },
            { value: 'moderate', label: 'Moderate', icon: 'people' },
            { value: 'limited', label: 'Limited', icon: 'person' },
            { value: 'prefer-not', label: 'Prefer not to say', icon: 'eye-off' },
        ],
    },
    {
        id: 'wellnessGoals',
        question: 'What would you like to improve?',
        type: 'multi',
        required: true,
        options: [
            { value: 'reduce-anxiety', label: 'Reduce anxiety', icon: 'trending-down' },
            { value: 'better-sleep', label: 'Better sleep', icon: 'bed' },
            { value: 'manage-stress', label: 'Manage stress', icon: 'fitness' },
            { value: 'improve-mood', label: 'Improve mood', icon: 'happy' },
            { value: 'build-resilience', label: 'Build resilience', icon: 'shield' },
            { value: 'self-awareness', label: 'Self-awareness', icon: 'eye' },
        ],
    },
    {
        id: 'preferredExercises',
        question: 'Which exercises appeal to you?',
        type: 'multi',
        required: false,
        options: [
            { value: 'breathing', label: 'Breathing', icon: 'cloud' },
            { value: 'meditation', label: 'Meditation', icon: 'body' },
            { value: 'journaling', label: 'Journaling', icon: 'create' },
            { value: 'movement', label: 'Physical movement', icon: 'walk' },
            { value: 'visualization', label: 'Guided visualization', icon: 'images' },
        ],
    },
    {
        id: 'communicationStyle',
        question: 'How do you prefer support?',
        type: 'single',
        required: false,
        options: [
            { value: 'direct', label: 'Direct and actionable', icon: 'arrow-forward' },
            { value: 'empathetic', label: 'Warm and empathetic', icon: 'heart' },
            { value: 'analytical', label: 'Structured and analytical', icon: 'analytics' },
            { value: 'casual', label: 'Casual and conversational', icon: 'chatbubble' },
        ],
    },
];

export default function QuestionnaireScreen() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Partial<OnboardingResponse>>({
        primaryConcern: [],
        therapyApproach: [],
        wellnessGoals: [],
        preferredExercises: [],
        severityLevel: 5,
        sleepQuality: 5,
        therapyExperience: '',
        moodPatterns: '',
        supportSystem: '',
        communicationStyle: '',
        completedAt: '',
    });

    const currentQuestion = questions[currentStep];
    const currentValue = answers[currentQuestion.id as keyof OnboardingResponse];

    const handleAnswer = (value: any) => {
        setAnswers(prev => ({
            ...prev,
            [currentQuestion.id]: value,
        }));
    };

    const canProceed = () => {
        if (!currentQuestion.required) return true;

        if (currentQuestion.type === 'multi') {
            return Array.isArray(currentValue) && currentValue.length > 0;
        }
        if (currentQuestion.type === 'slider') {
            return typeof currentValue === 'number';
        }
        return !!currentValue;
    };

    const handleNext = async () => {
        if (currentStep < questions.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            // Save and complete
            await OnboardingService.saveOnboardingData(answers as OnboardingResponse);
            router.replace('/onboarding/complete');
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        } else {
            router.back();
        }
    };

    const handleSkip = () => {
        if (currentStep < questions.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            handleNext();
        }
    };

    return (
        <LinearGradient
            colors={['#FAFAFA', '#E3F2FD', '#BBDEFB']}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={{ flex: 1 }} edges={['top']}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                >
                    <View className="flex-1">
                        {/* Header */}
                        <View className="flex-row items-center justify-between px-5 py-4">
                            <TouchableOpacity
                                onPress={() => router.push('/')}
                                activeOpacity={0.7}
                                className="w-14 h-14 rounded-full justify-center items-center border"
                                style={{
                                    backgroundColor: 'rgba(33, 150, 243, 0.1)',
                                    borderWidth: 1.5,
                                    borderColor: 'rgba(33, 150, 243, 0.2)',
                                }}
                            >
                                <Ionicons name="arrow-back" size={24} color="#2196F3" />
                            </TouchableOpacity>

                            <Text className="text-2xl font-avenir-bold text-[#1976D2]">
                                Build Your Profile
                            </Text>
                            <View className="w-10 h-10" />
                        </View>

                        {/* Progress Bar */}
                        <ProgressBar
                            currentStep={currentStep + 1}
                            totalSteps={questions.length}
                        />

                        {/* Question Card */}
                        <ScrollView
                            className="flex-1"
                            contentContainerStyle={{ paddingBottom: 20 }}
                            showsVerticalScrollIndicator={false}
                        >
                            <QuestionCard
                                question={currentQuestion}
                                value={currentValue}
                                onChange={handleAnswer}
                                onSkip={handleSkip}
                            />
                        </ScrollView>

                        {/* Navigation Buttons */}
                        <View className="p-5 pb-8">
                            <TouchableOpacity
                                onPress={handleNext}
                                disabled={!canProceed()}
                                activeOpacity={0.85}
                                className="rounded-3xl overflow-hidden"
                                style={{
                                    shadowColor: '#2196F3',
                                    shadowOffset: { width: 0, height: 4 },
                                    shadowOpacity: canProceed() ? 0.3 : 0.1,
                                    shadowRadius: 12,
                                    elevation: canProceed() ? 6 : 2,
                                }}
                            >
                                <LinearGradient
                                    colors={canProceed() ? ['#42A5F5', '#2196F3'] : ['#E0E0E0', '#BDBDBD']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16, paddingHorizontal: 32, gap: 8 }}
                                >
                                    <Text className="text-lg font-avenir-bold text-white">
                                        {currentStep < questions.length - 1 ? 'Continue' : 'Complete'}
                                    </Text>
                                    <Ionicons
                                        name="arrow-forward"
                                        size={20}
                                        color="#fff"
                                    />
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </LinearGradient>
    );
}
