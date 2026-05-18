import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable, Animated, TextInput, ScrollView, Easing, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import exercisesData from '@/assets/data/exercises.json';
import { Exercise } from '@/types';
import StatsService from '@/services/StatsService';

export default function ExerciseDetail() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [exercise, setExercise] = useState<Exercise | null>(null);
    const [isStarted, setIsStarted] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    // Common state for timer
    const [timeLeft, setTimeLeft] = useState(0);

    // Journaling state
    const [journalText, setJournalText] = useState('');

    // Breathing Animation
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const [breathingText, setBreathingText] = useState('Breathe In');

    useEffect(() => {
        const found = (exercisesData as Exercise[]).find(e => e.id === id);
        if (found) {
            setExercise(found);
            setTimeLeft((found.durationMinutes || 0) * 60);
            setIsStarted(false);
            setIsCompleted(false);
            setJournalText('');
        }
    }, [id]);

    useEffect(() => {
        let timer: ReturnType<typeof setInterval>;
        if (isStarted && !isCompleted && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        finishExercise();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isStarted, isCompleted, timeLeft]);

    // Breathing Animation Loop
    useEffect(() => {
        if (isStarted && !isCompleted && exercise?.type === 'breathing') {
            const startBreathingCycle = () => {
                setBreathingText('Breathe In');
                Animated.timing(scaleAnim, {
                    toValue: 2.5,
                    duration: 4000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }).start(() => {
                    setBreathingText('Hold');
                    setTimeout(() => {
                        setBreathingText('Breathe Out');
                        Animated.timing(scaleAnim, {
                            toValue: 1,
                            duration: 5000, // typically longer exhale
                            easing: Easing.inOut(Easing.ease),
                            useNativeDriver: true,
                        }).start(() => {
                            if (!isCompleted && isStarted) {
                                startBreathingCycle();
                            }
                        });
                    }, 2000); // Hold for 2 seconds
                });
            };
            startBreathingCycle();
        }
    }, [isStarted, isCompleted, exercise?.type]);

    const finishExercise = async () => {
        setIsCompleted(true);
        setIsStarted(false);
        try {
            await StatsService.incrementExercisesCompleted();
            if (exercise?.type === 'journaling') {
                await StatsService.updateJournalStreak();
            }
        } catch (e) {
            console.error('Error saving stats', e);
        }
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    if (!exercise) return <View className="flex-1 bg-white items-center justify-center"><Text>Loading...</Text></View>;

    const renderHeader = () => (
        <View className="px-6 mt-4 pb-4 flex-row items-center justify-between">
            <Pressable
                onPress={() => router.back()}
                className="w-12 h-12 rounded-full justify-center items-center border"
                style={{
                    backgroundColor: 'rgba(33, 150, 243, 0.1)',
                    borderWidth: 1.5,
                    borderColor: 'rgba(33, 150, 243, 0.2)',
                }}
            >
                <Ionicons name="arrow-back" size={24} color="#2196F3" />
            </Pressable>
            <Text className="text-xl font-avenir-bold text-textStrong flex-1 text-center mr-12">
                {isStarted || isCompleted ? exercise.title : 'Exercise Info'}
            </Text>
        </View>
    );

    // ================== VIEWS ================== //

    const renderPreStart = () => (
        <ScrollView className="flex-1 px-6 pt-4" contentContainerStyle={{ paddingBottom: 100 }}>
            <View className="w-20 h-20 rounded-full items-center justify-center mb-6" style={{ backgroundColor: 'rgba(33,150,243,0.1)' }}>
                <Ionicons 
                    name={exercise.type === 'breathing' ? 'cloud' : exercise.type === 'journaling' ? 'book' : 'leaf'} 
                    size={40} color="#2196F3" 
                />
            </View>
            <Text className="text-3xl font-avenir-bold text-textStrong mb-2">{exercise.title}</Text>
            <View className="flex-row items-center mb-6">
                <View className="bg-iceBlue px-3 py-1.5 rounded-lg mr-3">
                    <Text className="text-sm font-avenir-bold text-primaryBlue capitalize">{exercise.type}</Text>
                </View>
                <View className="flex-row items-center text-textLight">
                    <Ionicons name="time-outline" size={16} color="#90A4AE" />
                    <Text className="text-sm font-avenir-medium ml-1 text-textLight">{exercise.durationMinutes} min</Text>
                </View>
            </View>

            <Text className="text-lg font-avenir-semibold text-textStrong mb-2">Description</Text>
            <Text className="text-base font-avenir text-textBody mb-6 leading-6">{exercise.description}</Text>

            <Text className="text-lg font-avenir-semibold text-textStrong mb-3">Benefits</Text>
            {exercise.benefits && exercise.benefits.map((benefit, i) => (
                <View key={i} className="flex-row items-center mb-2">
                    <Ionicons name="checkmark-circle" size={20} color="#4CAF50" className="mr-2" />
                    <Text className="text-base font-avenir-medium text-textBody ml-2">{benefit}</Text>
                </View>
            ))}

            <Pressable
                onPress={() => setIsStarted(true)}
                className="mt-10 bg-buttonPrimary rounded-2xl py-4 items-center"
                style={{ shadowColor: '#2196F3', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 }}
            >
                <Text className="text-lg font-avenir-bold text-white">Start Exercise</Text>
            </Pressable>
        </ScrollView>
    );

    const renderBreathing = () => (
        <View className="flex-1 items-center justify-center px-6">
            <View className="items-center justify-center h-64 w-full mb-12">
                <Animated.View
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: 50,
                        backgroundColor: 'rgba(33, 150, 243, 0.2)',
                        transform: [{ scale: scaleAnim }],
                        position: 'absolute',
                    }}
                />
                <View className="w-24 h-24 rounded-full bg-primaryBlue items-center justify-center z-10 shadow-lg">
                    <Text className="text-white font-avenir-bold text-center text-sm">{breathingText}</Text>
                </View>
            </View>
            <Text className="text-4xl font-avenir-bold text-textStrong">{formatTime(timeLeft)}</Text>
            <Text className="text-lg font-avenir-medium text-textLight mt-2">remaining</Text>
            
            <Pressable onPress={finishExercise} className="mt-12 bg-white border border-borderBlue px-8 py-3 rounded-full">
                <Text className="text-primaryBlue font-avenir-bold">End Early</Text>
            </Pressable>
        </View>
    );

    const renderJournaling = () => (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1 px-6 pt-4">
            <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-avenir-medium text-textLight">Time limit: {formatTime(timeLeft)}</Text>
            </View>
            <View className="flex-1 bg-white rounded-3xl p-5 mb-6 border border-borderBlue shadow-sm">
                <TextInput
                    className="flex-1 text-lg font-avenir leading-7 text-textStrong"
                    placeholder="Start writing here..."
                    placeholderTextColor="#B0BEC5"
                    multiline
                    value={journalText}
                    onChangeText={setJournalText}
                    textAlignVertical="top"
                    autoFocus
                />
            </View>
            <Pressable
                onPress={() => {
                    if (journalText.length < 10) {
                        Alert.alert("Too short", "Please write a bit more before saving.");
                        return;
                    }
                    finishExercise();
                }}
                className="bg-buttonPrimary rounded-2xl py-4 items-center mb-6"
            >
                <Text className="text-lg font-avenir-bold text-white">Save Entry</Text>
            </Pressable>
        </KeyboardAvoidingView>
    );

    const renderGenericTimer = () => (
        <View className="flex-1 items-center justify-center px-6">
            <View className="w-64 h-64 rounded-full items-center justify-center border-8 border-iceBlue mb-12 relative overflow-hidden bg-white">
                <Ionicons name="flower-outline" size={80} color="#64B5F6" style={{ opacity: 0.2, position: 'absolute' }} />
                <Text className="text-6xl font-avenir-bold text-primaryBlue">{formatTime(timeLeft)}</Text>
            </View>
            <Text className="text-xl font-avenir-medium text-textStrong text-center mb-8 px-4 leading-7">
                Focus on the instructions. Keep your mind present.
            </Text>
            <Pressable onPress={finishExercise} className="bg-white border border-borderBlue px-8 py-3 rounded-full">
                <Text className="text-primaryBlue font-avenir-bold">Complete Now</Text>
            </Pressable>
        </View>
    );

    const renderCompleted = () => (
        <View className="flex-1 items-center justify-center px-6">
            <View className="w-24 h-24 rounded-full bg-green-100 items-center justify-center mb-6">
                <Ionicons name="checkmark" size={60} color="#4CAF50" />
            </View>
            <Text className="text-3xl font-avenir-bold text-textStrong mb-2">Great job!</Text>
            <Text className="text-lg font-avenir-medium text-textLight text-center mb-10 px-4">
                You've completed the {exercise.title} exercise. Your progress has been saved.
            </Text>
            <Pressable
                onPress={() => router.push('/exercises')}
                className="w-full bg-buttonPrimary rounded-2xl py-4 items-center"
            >
                <Text className="text-lg font-avenir-bold text-white">Back to Exercises</Text>
            </Pressable>
        </View>
    );

    return (
        <ExpoLinearGradient colors={['#FAFAFA', '#E3F2FD', '#BBDEFB']} style={{ flex: 1 }} locations={[0, 0.5, 1]}>
            <SafeAreaView style={{ flex: 1 }} edges={['top']}>
                {renderHeader()}
                {!isStarted && !isCompleted ? renderPreStart() : null}
                {isStarted && !isCompleted && exercise.type === 'breathing' ? renderBreathing() : null}
                {isStarted && !isCompleted && exercise.type === 'journaling' ? renderJournaling() : null}
                {isStarted && !isCompleted && ['meditation', 'relaxation', 'movement'].includes(exercise.type) ? renderGenericTimer() : null}
                {isCompleted ? renderCompleted() : null}
            </SafeAreaView>
        </ExpoLinearGradient>
    );
}
