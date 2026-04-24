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
   * Stream a response visually. By bypassing Expo's network bridge which notoriously buffers chunked
   * transfer encoding into memory, we execute the normal HTTP generation phase and then beautifully
   * stream the strings sequentially to the React engine!
   */
  async streamMessage(
    userMessage: string,
    onToken: (token: string) => void,
    onDone: () => void,
    onError: (err: Error) => void,
    onTherapists?: (therapists: any[]) => void
  ): Promise<void> {
    // Local crisis check
    if (hasCrisisKeyword(userMessage)) {
      this._simulateStream(CRISIS_RESPONSE, onToken, onDone);
      return;
    }

    try {
      const sessionId = await getOrCreateSessionId();
      const userId = await getUserId();

      // We hit the standard blocking generation endpoint instead of SSE.
      // React Native's HTTP bridge almost universally buffers chunked transfers in modern
      // Expo engines, causing the entire block to execute instantly at the end.
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
      
      if (data.therapists && data.therapists.length > 0 && onTherapists) {
          onTherapists(data.therapists);
      }
      
      const fullText = data.response as string;

      // Visually type the finalized string
      this._simulateStream(fullText, onToken, onDone);
    } catch (err) {
      onError(err instanceof Error ? err : new Error('Cannot reach Mazag server.'));
    }
  },

  /** Helper to visually stream a final text string */
  _simulateStream(text: string, onToken: (t: string) => void, onDone: () => void) {
    const tokens = text.split(/(?<=\s)/); // Split strictly keeping spaces
    let index = 0;
    
    // Simulate reading speed (roughly 30-40ms per word snippet)
    const interval = setInterval(() => {
        if (index < tokens.length) {
            onToken(tokens[index]);
            index++;
        } else {
            clearInterval(interval);
            onDone();
        }
    }, 45); // Feels natural and typewriter-like
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
