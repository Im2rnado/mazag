// services/ChatbotService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from './Api';

// Crisis keywords — checked locally BEFORE hitting the network
const CRISIS_KEYWORDS = [
  'suicide', 'kill myself', 'end my life', 'want to die', 'انتحار',
  'اقتل نفسي', 'self harm', 'cut myself', 'hurt myself',
];

function hasCrisisKeyword(message: string): boolean {
  const lower = message.toLowerCase();
  return CRISIS_KEYWORDS.some((kw) => lower.includes(kw));
}

const CRISIS_RESPONSE =
  "أرى أنك تمر بوقت صعب جداً. سلامتك هي الأهم — من فضلك تواصل مع متخصص أو اتصل بخط أزمات الصحة النفسية في مصر على 16328.\n\n" +
  "I can see you're going through something very difficult. Your safety matters most. Please reach out to the Egyptian Mental Health Crisis Hotline: 16328.";

// ── Session helpers ────────────────────────────────────────────────────────────

const SESSION_KEY = '@mazag_chat_session_id';
const USER_ID_KEY = '@mazag_user_id';

async function getOrCreateSessionId(): Promise<string> {
  let sessionId = await AsyncStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    await AsyncStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

async function getUserId(): Promise<string | null> {
  return AsyncStorage.getItem(USER_ID_KEY);
}

// ── ChatbotService ─────────────────────────────────────────────────────────────

const ChatbotService = {
  /**
   * Send a message and get the full response at once (non-streaming).
   * Use this for simple integrations.
   */
  async sendMessage(userMessage: string): Promise<string> {
    // Local crisis check — no network round-trip needed
    if (hasCrisisKeyword(userMessage)) {
      return CRISIS_RESPONSE;
    }

    const sessionId = await getOrCreateSessionId();
    const userId = await getUserId();

    const response = await fetch(`${API_BASE_URL}/chat/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userMessage,
        session_id: sessionId,
        user_id: userId ?? undefined,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Chat API error:', err);
      throw new Error('Failed to get response from Mazag AI');
    }

    const data = await response.json();
    return data.response as string;
  },

  /**
   * Stream a response token-by-token using Server-Sent Events.
   *
   * @param userMessage - The user's input text
   * @param onToken - Called for each incoming token
   * @param onDone - Called when the stream ends
   * @param onError - Called on error
   */
  async streamMessage(
    userMessage: string,
    onToken: (token: string) => void,
    onDone: () => void,
    onError: (err: Error) => void
  ): Promise<void> {
    // Local crisis check
    if (hasCrisisKeyword(userMessage)) {
      onToken(CRISIS_RESPONSE);
      onDone();
      return;
    }

    const sessionId = await getOrCreateSessionId();
    const userId = await getUserId();

    // React Native's fetch doesn't support response.body.getReader() natively
    // We use XMLHttpRequest instead to read chunks as they arrive (readyState 3)
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${API_BASE_URL}/chat/stream`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'text/event-stream');
    xhr.responseType = 'text';

    let seenBytes = 0;
    
    xhr.onreadystatechange = () => {
      // readyState 3 (LOADING) or 4 (DONE)
      if (xhr.readyState === 3 || xhr.readyState === 4) {
        if (xhr.status !== 200 && xhr.status !== 0) {
          if (xhr.readyState === 4) {
             onError(new Error(`Server error: ${xhr.status}`));
          }
          return;
        }

        // We only append to unparsed raw string, so we need to buffer the incoming text
        const unparsedData = xhr.responseText || '';
        
        // We only look at new data since last split
        const newData = unparsedData.substring(seenBytes);
        
        // Find the last complete event separated by \n\n
        const lastCompleteIndex = newData.lastIndexOf('\n\n');
        
        if (lastCompleteIndex !== -1) {
            // Process the complete chunks
            const completeData = newData.substring(0, lastCompleteIndex);
            
            // Advance seenBytes to include the processed characters and the trailing \n\n
            seenBytes += lastCompleteIndex + 2;
            
            const parts = completeData.split('\n\n');
            for (const part of parts) {
                const line = part.trim();
                if (!line.startsWith('data:')) continue;
        
                const data = line.substring(5).trim();
        
                if (data === '[DONE]') {
                    onDone();
                    return;
                }
        
                try {
                    const parsed = JSON.parse(data);
                    if (parsed.token) {
                        onToken(parsed.token);
                    } else if (parsed.error) {
                        onError(new Error(parsed.error));
                        return;
                    }
                } catch (e) {
                    // Ignore incomplete JSON chunks boundary issues
                }
            }
        }
        
        if (xhr.readyState === 4 && !unparsedData.includes('[DONE]')) {
          // If connection closed without DONE
          onDone();
        }
      }
    };

    xhr.onerror = () => {
      onError(new Error('Cannot reach Mazag server. Is the backend running?'));
    };

    xhr.send(JSON.stringify({
      message: userMessage,
      session_id: sessionId,
      user_id: userId ?? undefined,
    }));
  },

  /** Reset the conversation session (start fresh) */
  async resetSession(): Promise<void> {
    await AsyncStorage.removeItem(SESSION_KEY);
  },

  /** Get current session ID */
  async getSessionId(): Promise<string> {
    return getOrCreateSessionId();
  },
};

export default ChatbotService;
