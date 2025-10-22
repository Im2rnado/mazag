import React, { useState } from 'react';
import { View, FlatList, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ChatBubble from '@/components/ChatBubble';
import ChatbotService from '@/services/ChatbotService';
import { SafeAreaView } from 'react-native-safe-area-context';
import AnimatedChromeOrb from '@/components/AnimatedChromeOrb';

type Msg = { id: string; text: string; fromUser?: boolean };

export default function Chat() {
    const router = useRouter();
    const [messages, setMessages] = useState<Msg[]>([
        { id: '1', text: 'Hi! I\'m Mazag, your AI companion. How are you feeling today? 💙', fromUser: false }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSend() {
        if (!input.trim() || loading) return;

        const userMsg: Msg = { id: Date.now().toString(), text: input.trim(), fromUser: true };
        setMessages((m) => [...m, userMsg]);
        setInput('');
        setLoading(true);

        try {
            // send to ChatbotService
            const reply = await ChatbotService.sendMessage(input);
            const botMsg: Msg = { id: Date.now().toString() + '-r', text: reply, fromUser: false };
            setMessages((m) => [...m, botMsg]);
        } catch (error) {
            const errorMsg: Msg = {
                id: Date.now().toString() + '-e',
                text: 'Sorry, I encountered an error. Please try again.',
                fromUser: false
            };
            setMessages((m) => [...m, errorMsg]);
        } finally {
            setLoading(false);
        }
    }

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
                            <Ionicons name="arrow-back" size={26} color="#2196F3" />
                        </TouchableOpacity>

                        {/* Title - Center */}
                        <View className="flex-1 items-center">
                            <Text className="text-heading font-avenir-bold text-textStrong">
                                Chat with Mazag
                            </Text>

                            {/* Status Indicator */}
                            <View className="flex-row items-center justify-center self-center rounded-xl mt-1 px-3 py-1" style={{
                                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                            }}>
                                <View className="w-2 h-2 rounded-full mr-2" style={{
                                    backgroundColor: '#4CAF50',
                                }} />
                                <Text className="text-xs font-avenir-semibold" style={{ color: '#4CAF50' }}>
                                    Online & Ready to Help
                                </Text>
                            </View>

                        </View>

                        {/* Animated Orb */}
                        <View>
                            <AnimatedChromeOrb
                                size={60}
                                animationDuration={7}
                                colors={{
                                    bg: '#BEE3FF',
                                    c1: '#A8D8FF',
                                    c2: '#92C7E8',
                                    c3: '#A8D8FF',
                                }}
                                isActive={true}
                            />
                        </View>
                    </View>

                    {/* Messages Area */}
                    <View className="flex-1 px-4">
                        <FlatList
                            data={messages}
                            keyExtractor={(i) => i.id}
                            renderItem={({ item }) => <ChatBubble text={item.text} fromUser={item.fromUser} />}
                            contentContainerStyle={{ paddingBottom: 16, flexGrow: 1, justifyContent: 'flex-end' }}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>

                    {/* Input Area */}
                    <View className="px-5 py-4 rounded-t-3xl" style={{
                        backgroundColor: 'rgba(255,255,255,0.95)',
                        shadowColor: '#2196F3',
                        shadowOffset: { width: 0, height: -2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 12,
                        elevation: 8,
                    }}>
                        {/* Quick Suggestions */}
                        {messages.length === 1 && (
                            <View className="mb-3">
                                <Text className="text-sm font-avenir-semibold text-textLight mb-2">
                                    Quick prompts:
                                </Text>
                                <View className="flex-row flex-wrap gap-2">
                                    {['I feel anxious', 'Having trouble sleeping'].map((suggestion) => (
                                        <TouchableOpacity
                                            key={suggestion}
                                            onPress={() => setInput(suggestion)}
                                            activeOpacity={0.7}
                                            className="rounded-2xl py-2 px-3.5 border"
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

                        {/* Input Row */}
                        <View className="flex-row items-end gap-3">
                            <View className="flex-1 bg-white rounded-3xl border-2 px-4 py-1" style={{
                                borderColor: '#81D4FA',
                                shadowColor: '#2196F3',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.08,
                                shadowRadius: 8,
                                elevation: 2,
                            }}>
                                <TextInput
                                    value={input}
                                    onChangeText={setInput}
                                    placeholder="Type your message here..."
                                    placeholderTextColor="#90A4AE"
                                    className="text-textStrong font-avenir-medium text-subheading text-sm"
                                    multiline
                                    maxLength={500}
                                    style={{
                                        minHeight: 44,
                                        maxHeight: 100,
                                        paddingTop: 12,
                                        paddingBottom: 12,
                                    }}
                                />
                            </View>

                            {/* Send Button */}
                            <TouchableOpacity
                                onPress={handleSend}
                                activeOpacity={0.8}
                                disabled={loading || !input.trim()}
                                className="w-14 h-14 rounded-full justify-center items-center"
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
                                    <View className="w-6 h-6 rounded-full border-white" style={{
                                        borderWidth: 3,
                                        borderColor: 'rgba(255,255,255,0.3)',
                                        borderTopColor: '#FFFFFF',
                                    }} />
                                ) : (
                                    <Ionicons name="send" size={24} color="#FFFFFF" />
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ExpoLinearGradient>
    );
}
