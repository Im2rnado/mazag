// services/ChatbotService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

/**
 * ChatbotService contract:
 * - sendMessage(userMessage: string, userId?: string) => Promise<string>
 *
 * POC behavior: returns a mock empathetic response after a small delay.
 * Integration points (for production):
 *  1) Run local safety checks (keywords, light classifier). If crisis words detected
 *     -> return an emergency pre-scripted response (hotline + "we can't help here").
 *  2) Use embeddings + vector DB (Pinecone / Weaviate) to retrieve top-k relevant docs.
 *  3) Build prompt: system instructions + retrieved docs + conversation snippets.
 *  4) Call chosen closed-source LLM API (GPT-5 / Gemini 2.5-flash) passing the prompt.
 *  5) Post-filter the response with guardrails (bad content filter, medical disclaimers).
 *
 * For this graduation phase: we provide a mock function that mimics network delay.
 */

const ChatbotService = {
    async sendMessage(userMessage: string) {
        // Quick local guardrail
        const lowered = userMessage.toLowerCase();
        if (lowered.includes('suicide') || lowered.includes('kill myself') || lowered.includes('i want to die')) {
            // Crisis response (always hard-coded)
            return "I'm really sorry you're feeling this way. If you're thinking about harming yourself, please contact a trusted person or call the Egyptian Suicide Hotline at 16033 (if available). I can't handle emergencies — please seek immediate help.";
        }

        // Mock retrieval + LLM call simulation
        await new Promise((res) => setTimeout(res, 900)); // simulate latency

        // **Replace this block with RAG + LLM call**
        // Example pseudo:
        // 1) const queryEmbedding = await getEmbedding(userMessage)
        // 2) const docs = await vectorDB.similaritySearch(queryEmbedding, k=5)
        // 3) const prompt = buildPrompt(systemInstruction, docs, conversationHistory, userMessage)
        // 4) const response = await callLLMProvider(prompt)
        // 5) if (safetyFilter(response)) return safeFallback
        // 6) return response.text

        // For now return an empathetic canned reply
        const responses = [
            `I hear you. It sounds like "${userMessage}" is weighing on you — would you like to try a short breathing exercise or talk more about it?`,
            `Thank you for sharing that with me. How are you feeling right now? I'm here to listen and support you.`,
            `That sounds challenging. Remember that it's okay to feel this way. Would you like to explore some coping strategies together?`,
            `I understand. Sometimes talking about our feelings can help us process them better. What would be most helpful for you right now?`
        ];

        return responses[Math.floor(Math.random() * responses.length)];
    }
};

export default ChatbotService;
