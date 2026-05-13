import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

export default function SignupScreen() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = () => {
        // Here you would typically handle the actual registration logic
        router.replace('/');
    };

    return (
        <LinearGradient
            colors={['#FAFAFA', '#E3F2FD', '#BBDEFB']}
            style={{ flex: 1 }}
        >
            <SafeAreaView className="flex-1" edges={['top', 'bottom']}>
                <KeyboardAvoidingView 
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                >
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, padding: 24 }}>
                        <Animated.View entering={FadeInUp.delay(200).duration(600)} className="mb-8 mt-4">
                            <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 bg-white/50 rounded-full items-center justify-center mb-6">
                                <Ionicons name="arrow-back" size={24} color="#1976D2" />
                            </TouchableOpacity>
                            <Text className="text-[32px] font-avenir-bold text-[#1976D2] mb-2">
                                Create Account
                            </Text>
                            <Text className="text-base text-[#546E7A]">
                                Just one last step to start your wellness journey.
                            </Text>
                        </Animated.View>

                        <Animated.View entering={FadeInUp.delay(400).duration(600)} className="gap-4">
                            {/* Name Input */}
                            <View className="bg-white rounded-2xl border border-[#BBDEFB] px-4 py-3 flex-row items-center" style={{ shadowColor: '#2196F3', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}>
                                <Ionicons name="person-outline" size={20} color="#64B5F6" className="mr-3" />
                                <TextInput
                                    className="flex-1 font-avenir text-base text-[#263238] ml-2"
                                    placeholder="Full Name"
                                    placeholderTextColor="#90A4AE"
                                    value={name}
                                    onChangeText={setName}
                                />
                            </View>

                            {/* Email Input */}
                            <View className="bg-white rounded-2xl border border-[#BBDEFB] px-4 py-3 flex-row items-center" style={{ shadowColor: '#2196F3', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}>
                                <Ionicons name="mail-outline" size={20} color="#64B5F6" className="mr-3" />
                                <TextInput
                                    className="flex-1 font-avenir text-base text-[#263238] ml-2"
                                    placeholder="Email Address"
                                    placeholderTextColor="#90A4AE"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    value={email}
                                    onChangeText={setEmail}
                                />
                            </View>

                            {/* Phone Input */}
                            <View className="bg-white rounded-2xl border border-[#BBDEFB] px-4 py-3 flex-row items-center" style={{ shadowColor: '#2196F3', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}>
                                <Ionicons name="call-outline" size={20} color="#64B5F6" className="mr-3" />
                                <TextInput
                                    className="flex-1 font-avenir text-base text-[#263238] ml-2"
                                    placeholder="Phone Number"
                                    placeholderTextColor="#90A4AE"
                                    keyboardType="phone-pad"
                                    value={phone}
                                    onChangeText={setPhone}
                                />
                            </View>

                            {/* Password Input */}
                            <View className="bg-white rounded-2xl border border-[#BBDEFB] px-4 py-3 flex-row items-center" style={{ shadowColor: '#2196F3', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}>
                                <Ionicons name="lock-closed-outline" size={20} color="#64B5F6" className="mr-3" />
                                <TextInput
                                    className="flex-1 font-avenir text-base text-[#263238] ml-2"
                                    placeholder="Password"
                                    placeholderTextColor="#90A4AE"
                                    secureTextEntry
                                    value={password}
                                    onChangeText={setPassword}
                                />
                            </View>
                        </Animated.View>

                        <Animated.View entering={FadeInUp.delay(600).duration(600)} className="mt-10 mb-8">
                            <TouchableOpacity
                                onPress={handleSignup}
                                activeOpacity={0.85}
                                className="rounded-[28px] overflow-hidden"
                                style={{
                                    shadowColor: '#2196F3',
                                    shadowOffset: { width: 0, height: 6 },
                                    shadowOpacity: 0.4,
                                    shadowRadius: 16,
                                    elevation: 8,
                                }}
                            >
                                <LinearGradient
                                    colors={['#42A5F5', '#2196F3', '#1976D2']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16 }}
                                >
                                    <Text className="text-lg font-avenir-bold text-white mr-2">
                                        Sign Up & Start
                                    </Text>
                                    <Ionicons name="arrow-forward" size={24} color="#fff" />
                                </LinearGradient>
                            </TouchableOpacity>
                        </Animated.View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </LinearGradient>
    );
}
