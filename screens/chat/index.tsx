import React, { useState } from 'react';
import { View, FlatList, TextInput, TouchableOpacity, Text } from 'react-native';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import ChatBubble from '@/components/ChatBubble';
import ChatbotService from '@/services/ChatbotService';
import { SafeAreaView } from 'react-native-safe-area-context';

type Msg = { id: string; text: string; fromUser?: boolean };

export default function Chat() {
    const [messages, setMessages] = useState<Msg[]>([
        { id: '1', text: 'Hi, I am here to help. How are you feeling today?', fromUser: false }
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
            colors={['#FFFFFF', '#E3F2FD']}
            style={{ flex: 1 }}
            locations={[0, 1]}
        >
            <SafeAreaView style={{ flex: 1 }} edges={['top']}>
                <View className="flex-1 p-6 pb-64">
                    <Text className="text-heading-main font-avenir-bold text-textStrong mb-4">
                        Chatbot
                    </Text>
                    <FlatList
                        data={messages}
                        keyExtractor={(i) => i.id}
                        renderItem={({ item }) => <ChatBubble text={item.text} fromUser={item.fromUser} />}
                        contentContainerClassName="flex-grow justify-end pb-4"
                    />
                    <View className="flex-row items-center gap-2 mt-2">
                        <TextInput
                            value={input}
                            onChangeText={setInput}
                            placeholder="Write a message..."
                            placeholderTextColor="#B5C4CE"
                            className="flex-1 bg-glassBg border border-glassBorder px-4 py-3 rounded-2xl text-textStrong font-avenir text-body"
                            multiline
                        />
                        <TouchableOpacity
                            onPress={handleSend}
                            className={`px-4 py-3 rounded-2xl ${loading ? 'bg-buttonSecondary' : 'bg-buttonPrimary'}`}
                            disabled={loading}
                        >
                            <Text className="text-white font-avenir-semibold text-body">
                                {loading ? '...' : 'Send'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </ExpoLinearGradient>
    );
}
