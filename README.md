# Mazag - Mental Wellness App (Expo SDK 54)

A comprehensive mental health support application built with React Native, Expo Router, and NativeWind, featuring AI-powered chat support, wellness exercises, and therapist booking functionality.

**Mazag** means "mood" in Arabic, reflecting the app's core focus on mood tracking and mental wellness.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 LTS recommended)
- Expo CLI
- EAS CLI (for native builds)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npx expo start
   ```

3. **For native builds with Hermes & New Architecture:**
   ```bash
   npx expo prebuild --clean
   npx expo run:android
   ```
   
   Or use EAS:
   ```bash
   eas build --platform android --profile development
   ```

## 📱 Features

### Core Functionality
- **AI Chat Companion**: Empathetic AI chatbot with safety guardrails
- **Wellness Exercises**: Breathing exercises, journaling prompts, meditation
- **Therapist Directory**: Browse and book sessions with licensed professionals
- **User Settings**: Profile management and app preferences

### Technical Features
- **Pastel Ice Blue Design**: Beautiful light theme with gradient backgrounds
- **Custom Typography**: Avenir Next font family throughout
- **Mood Tracking**: Interactive mood selector on home screen
- **Expo Router**: File-based routing system
- **NativeWind**: Tailwind CSS for React Native
- **TypeScript**: Full type safety
- **Hermes Engine**: Optimized JavaScript engine
- **New Architecture**: React Native's new architecture enabled

## 🏗️ Project Structure

```
/mazag
├── /app                    # Expo Router files
│   ├── _layout.tsx        # Root layout
│   ├── index.tsx          # Home route
│   ├── +not-found.tsx     # 404 page
│   ├── /chat              # Chat route
│   ├── /exercises         # Exercises route
│   ├── /therapists        # Therapists route
│   └── /settings          # Settings route
├── /components            # Reusable UI components
│   ├── /GlassCard         # Glassmorphism card component
│   ├── /Header            # App header
│   ├── /ChatBubble        # Chat message bubble
│   ├── /TherapistCard     # Therapist display card
│   └── /ExerciseCard      # Exercise display card
├── /screens               # Screen components
│   ├── /home              # Home screen logic
│   ├── /chat              # Chat screen logic
│   ├── /exercises         # Exercises screen logic
│   ├── /therapists        # Therapists screen logic
│   └── /settings          # Settings screen logic
├── /services              # Business logic layer
│   ├── ChatbotService.ts  # AI chat service (with RAG placeholders)
│   └── TherapistService.ts # Therapist data service
├── /types                 # TypeScript type definitions
├── /utils                 # Utility functions and constants
├── /assets                # Static assets
│   ├── /data              # JSON data files
│   ├── /fonts             # Custom fonts
│   └── /images            # Images and icons
└── Configuration files
```

## 🎨 Mazag Design System

### Color Palette

#### Primary Blues (Pastels)
- **Ice Blue**: `#E3F2FD` - Background gradient end
- **Sky Blue**: `#BBDEFB` - Accents
- **Powder Blue**: `#90CAF9` - Secondary buttons
- **Light Blue**: `#D6EAF8` - Subtle highlights
- **Primary Blue**: `#64B5F6` - Buttons, icons
- **Accent Blue**: `#42A5F5` - Interactive elements

#### Text Colors
- **Strong Text**: `#2C5F7C` - Main headings, important text
- **Normal Text**: `#4A7C9D` - Secondary headings
- **Light Text**: `#8FA9B8` - Subheadings
- **Body Text**: `#B5C4CE` - Regular body text

#### Mood Colors (Pastels)
- **Happy**: `#FFF9C4` - Pastel yellow
- **Joyful**: `#FFE0B2` - Pastel orange
- **Neutral**: `#E1BEE7` - Pastel purple
- **Sad**: `#BBDEFB` - Pastel blue
- **Angry**: `#FFCDD2` - Pastel red

#### Backgrounds
- **White**: `#FFFFFF` - Primary background
- **Light**: `#F5FBFF` - Alternative background
- **Gradient**: `linear-gradient(180deg, #FFFFFF 0%, #E3F2FD 100%)` - Main gradient

### Typography (Avenir Next)

#### Font Families
- **Regular**: `AvenirNext-Regular` - Body text
- **Medium**: `AvenirNext-Medium` - UI elements
- **Demi Bold**: `AvenirNext-Demi` - Headings
- **Bold**: `AvenirNext-Bold` - Main headings

#### Text Styles
1. **Main Page Headings**: 36px, Bold, Strong color (#2C5F7C)
2. **Normal Headings**: 24px, Demi Bold, Strong color (#2C5F7C)
3. **Subheadings**: 16px, Regular, Light color (#8FA9B8)
4. **Body Text**: 14px, Regular, Body color (#B5C4CE)

### UI Components
- **Border Radius**: 20px-24px for cards, 24px for inputs
- **Shadows**: Soft blue shadows using `#64B5F6` with low opacity
- **Cards**: White background (85% opacity), light blue borders
- **Buttons**: Primary blue (#64B5F6) with rounded corners

## 🤖 AI Integration (Production Ready)

The ChatbotService is designed for production AI integration:

### Current Implementation
- Mock responses with empathetic language
- Crisis detection and safety responses
- Simulated network latency

### Production Integration Points
1. **Safety Layer**: Keyword detection + lightweight classifier
2. **RAG Pipeline**: Vector database (Pinecone/Weaviate) for context retrieval
3. **LLM Integration**: GPT-4/Gemini API calls with structured prompts
4. **Guardrails**: Post-processing filters for medical advice detection
5. **Logging**: Conversation logging for moderation and improvement

### Environment Setup for Production
```env
# Add these to your .env file
OPENAI_API_KEY=your_openai_key
PINECONE_API_KEY=your_pinecone_key
PINECONE_INDEX_NAME=mental-health-kb
```

## 📊 Data Management

### Local Storage (MVP)
- **AsyncStorage**: User preferences, chat history, bookings
- **JSON Files**: Static data for therapists and exercises

### Production Database Integration
- Replace JSON files with REST API calls
- Implement user authentication
- Add real-time chat synchronization

## 🔧 Configuration Files

### Key Files
- **app.json**: Expo configuration with Hermes and New Architecture
- **babel.config.js**: NativeWind and module resolution setup
- **metro.config.js**: NativeWind integration
- **tailwind.config.js**: Custom theme and glassmorphism tokens
- **tsconfig.json**: TypeScript configuration with path aliases

## 🚀 Deployment

### Development
```bash
npx expo start
```

### Production Builds
```bash
# Android
eas build --platform android --profile production

# iOS  
eas build --platform ios --profile production
```

### Environment Variables
Use EAS secrets for production:
```bash
eas secret:create --scope project --name OPENAI_API_KEY --value your_key
```

## 🧪 Testing Strategy

### Manual QA Checklist
- [ ] Crisis keywords trigger appropriate responses
- [ ] Chat flow works without AI integration
- [ ] Therapist booking stores in AsyncStorage
- [ ] All navigation routes function correctly
- [ ] Glassmorphism effects render properly

### Future Testing
- Unit tests with Jest + React Native Testing Library
- E2E testing with Detox
- AI response quality testing

## 🔒 Security & Privacy

### Current Measures
- Local data storage only
- Crisis intervention responses
- No sensitive data transmission

### Production Security
- End-to-end encryption for chat messages
- HIPAA compliance considerations
- Secure API authentication
- Data anonymization for AI training

## 📈 Subscription Model (UI Ready)

### Tiers Implemented
- **Free Tier**: 10 messages/day, basic exercises
- **Premium Tier**: Unlimited messages, 15% therapist discount

### Integration Points
- Stripe/Paymob payment processing
- Subscription state management
- Usage tracking and limits

## 🌍 Localization Support

### Current
- English interface
- Egyptian therapist data
- Crisis hotline numbers for Egypt

### Expansion Ready
- i18n framework integration
- Multi-language therapist profiles
- Regional crisis resources

## 🐛 Known Issues & Limitations

### Current Limitations
- Mock AI responses only
- Local data storage
- No real-time features
- No user authentication

### Dependency Issues
- Some peer dependency warnings (resolved with --legacy-peer-deps)
- New Architecture requires native builds for testing

## 🤝 Contributing

### Development Workflow
1. Create feature branch
2. Implement changes following existing patterns
3. Test on both platforms
4. Submit PR with description

### Code Style
- Use TypeScript for all new files
- Follow existing component patterns
- Use NativeWind classes for styling
- Implement proper error handling

## 📞 Support & Contact

For technical issues or feature requests:
- Create GitHub issues for bugs
- Use discussion board for feature requests
- Check existing documentation first

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Expo Team**: For the excellent development platform
- **NativeWind Team**: For bringing Tailwind to React Native
- **Mental Health Professionals**: For guidance on appropriate AI responses
- **Open Source Community**: For the foundational libraries

---

**Note**: This is an MVP implementation. The AI integration points are clearly marked for production implementation with proper safety measures and professional oversight.
