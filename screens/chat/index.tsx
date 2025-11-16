import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, Platform, Animated, Pressable, FlatList } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ChatBubble from '@/components/ChatBubble';
import TypingIndicator from '@/components/TypingIndicator';
import ChatbotService from '@/services/ChatbotService';
import { SafeAreaView } from 'react-native-safe-area-context';
import AnimatedChromeOrb from '@/components/AnimatedChromeOrb';

type Msg = { id: string; text: string; fromUser?: boolean; timestamp?: number };

export default function Chat() {
    const router = useRouter();
    const [messages, setMessages] = useState<Msg[]>([
        { id: '1', text: 'Hi! I\'m Mazag, your AI companion. How are you feeling today? 💙', fromUser: false, timestamp: Date.now() }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const flashListRef = useRef<any>(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        if (messages.length > 0) {
            setTimeout(() => {
                flashListRef.current?.scrollToEnd({ animated: true });
            }, 100);
        }
    }, [messages]);

    // Fade in animation for messages
    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [messages.length]);

    async function handleSend() {
        if (!input.trim() || loading) return;

        const userMsg: Msg = { id: Date.now().toString(), text: input.trim(), fromUser: true, timestamp: Date.now() };
        setMessages((m) => [...m, userMsg]);
        setInput('');
        setLoading(true);

        // Scroll to bottom after user sends message
        setTimeout(() => {
            flashListRef.current?.scrollToEnd({ animated: true });
        }, 100);

        try {
            // send to ChatbotService
            const reply = await ChatbotService.sendMessage(input);
            const botMsg: Msg = { id: Date.now().toString() + '-r', text: reply, fromUser: false, timestamp: Date.now() };
            setMessages((m) => [...m, botMsg]);
        } catch (error) {
            const errorMsg: Msg = {
                id: Date.now().toString() + '-e',
                text: 'Sorry, I encountered an error. Please try again.',
                fromUser: false,
                timestamp: Date.now()
            };
            setMessages((m) => [...m, errorMsg]);
        } finally {
            setLoading(false);
        }
    }

    const handleSuggestionPress = (suggestion: string) => {
        setInput(suggestion);
        setTimeout(() => {
            flashListRef.current?.scrollToEnd({ animated: true });
        }, 100);
    };

    return (
        <ExpoLinearGradient
            colors={['#FFFFFF', '#E3F2FD', '#B3E5FC']}
            className="flex-1"
            locations={[0, 0.4, 1]}
        >
            <SafeAreaView edges={['top']}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
                    style={{ width: '100%', height: '100%' }}
                >
                    {/* Back Button, Title, and Orb Row */}
                    <View className="px-6 mt-4 pb-4 flex-row items-center justify-between">
                        {/* Back Button */}
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

                        {/* Title & Orb - Combined */}
                        <View className="flex-1 flex-row items-center justify-center gap-3">
                            {/* Smaller Animated Orb */}
                            <AnimatedChromeOrb
                                size={44}
                                animationDuration={8}
                                colors={{
                                    bg: '#E3F2FD',
                                    c1: '#64B5F6',
                                    c2: '#42A5F5',
                                    c3: '#2196F3',
                                }}
                                isActive={true}
                            />

                            <View className='ml-4'>
                                <Text className="text-lg font-avenir-bold text-textStrong">
                                    Mazag
                                </Text>
                                {/* Compact Status */}
                                <View className="flex-row items-center gap-1.5">
                                    <Text className="text-xs font-avenir-medium" style={{ color: '#4CAF50' }}>
                                        Always here for you
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* Menu Button */}
                        <Pressable
                            className="w-11 h-11 rounded-full justify-center items-center"
                            style={({ pressed }) => ({
                                backgroundColor: pressed ? 'rgba(33, 150, 243, 0.15)' : 'rgba(33, 150, 243, 0.08)',
                                opacity: pressed ? 0.8 : 1,
                            })}
                        >
                            <MaterialCommunityIcons name="dots-horizontal" size={24} color="#2196F3" />
                        </Pressable>
                    </View>

                    {/* Messages Area */}
                    <View className="flex-1 px-4">
                        <FlashList
                            ref={flashListRef}
                            data={messages}
                            keyExtractor={(i: Msg) => i.id}
                            renderItem={({ item }: { item: Msg }) => (
                                <ChatBubble
                                    text={item.text}
                                    fromUser={item.fromUser}
                                    timestamp={item.timestamp}
                                />
                            )}
                            contentContainerStyle={{ paddingBottom: 16, paddingTop: 8 }}
                            showsVerticalScrollIndicator={false}
                            onContentSizeChange={() => flashListRef.current?.scrollToEnd({ animated: true })}
                        />

                        {/* Typing Indicator */}
                        {loading && <TypingIndicator />}
                    </View>

                    {/* Input Area */}
                    <View className="px-5 py-4 rounded-t-3xl" style={{
                        backgroundColor: 'rgba(255,255,255,0.4)',
                        shadowColor: '#2196F3',
                        shadowOffset: { width: 0, height: -2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 12,
                        elevation: 8,
                    }}>
                        {/* Quick Suggestions - Enhanced */}
                        {messages.length === 1 && (
                            <View className="mb-3">
                                <Text className="text-xs font-avenir-bold text-textLight mb-2 uppercase tracking-wide" style={{ opacity: 0.7 }}>
                                    Try asking about
                                </Text>
                                <View className="flex-row flex-wrap gap-2">
                                    {['I feel anxious', 'Have trouble sleeping', 'My friends hate me'].map((suggestion) => (
                                        <TouchableOpacity
                                            key={suggestion}
                                            onPress={() => setInput(suggestion)}
                                            activeOpacity={0.7}
                                            className="rounded-2xl py-2 px-2 border"
                                            style={{
                                                backgroundColor: 'rgba(33, 150, 243, 0.1)',
                                                borderColor: 'rgba(33, 150, 243, 0.2)',
                                            }}
                                        >
                                            <Text className="text-sm font-avenir-medium text-primaryBlue">
                                                {suggestion}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        )}

                        {/* Input Row - Enhanced */}
                        <View className="flex-row items-end gap-2.5">
                            <View className="flex-1">
                                <View className="bg-white rounded-3xl px-4 py-1" style={{
                                    borderWidth: 2,
                                    borderColor: input.length > 0 ? '#64B5F6' : '#E3F2FD',
                                    shadowColor: '#2196F3',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: input.length > 0 ? 0.12 : 0.05,
                                    shadowRadius: 12,
                                    elevation: input.length > 0 ? 3 : 1,
                                }}>
                                    <TextInput
                                        value={input}
                                        onChangeText={setInput}
                                        placeholder="Share what's on your mind..."
                                        placeholderTextColor="#B0BEC5"
                                        className="text-textStrong font-avenir-medium text-base"
                                        multiline
                                        maxLength={500}
                                        style={{
                                            minHeight: 40,
                                            maxHeight: 100,
                                            paddingTop: 8,
                                            paddingBottom: 8,
                                        }}
                                    />
                                </View>
                                {/* Character Count - Only show when near limit */}
                                {input.length > 400 && (
                                    <Text className="text-xs font-avenir-medium text-right mt-1" style={{ color: input.length > 480 ? '#FF5252' : '#90A4AE' }}>
                                        {input.length}/500
                                    </Text>
                                )}
                            </View>

                            {/* Send Button */}
                            <TouchableOpacity
                                onPress={handleSend}
                                activeOpacity={0.9}
                                disabled={loading || !input.trim()}
                                className="w-12 h-12 mb-1 rounded-full justify-center items-center"
                                style={{
                                    backgroundColor: loading || !input.trim() ? '#B3E5FC' : '#2196F3',
                                    shadowColor: '#2196F3',
                                    shadowOffset: { width: 0, height: 4 },
                                    shadowOpacity: loading || !input.trim() ? 0.2 : 0.4,
                                    shadowRadius: 12,
                                    elevation: 6,
                                }}
                            >
                                {loading ? (
                                    <Animated.View
                                        className="w-5 h-5 rounded-full"
                                        style={{
                                            borderWidth: 3,
                                            borderColor: 'rgba(33, 150, 243, 0.2)',
                                            borderTopColor: '#2196F3',
                                            transform: [{
                                                rotate: fadeAnim.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: ['0deg', '360deg']
                                                })
                                            }]
                                        }}
                                    />
                                ) : (
                                    <Ionicons name="send" size={20} color="#FFFFFF" />
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ExpoLinearGradient>
    );
}
