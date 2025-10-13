# Mazag Design System Implementation

## Overview
Mazag (Arabic for "mood") is a mental wellness app with a beautiful pastel ice blue design system focused on creating a calm, soothing user experience.

## What Was Implemented

### 1. Color Palette
A comprehensive pastel color system was created in `tailwind.config.js`:

**Primary Blues (Pastels)**
- Ice Blue (#E3F2FD) - Background gradient
- Sky Blue (#BBDEFB)
- Powder Blue (#90CAF9)
- Primary Blue (#64B5F6) - Main interactive elements

**Text Colors**
- Strong: #2C5F7C (headings)
- Light: #8FA9B8 (subheadings)
- Body: #B5C4CE (regular text)

**Mood Selector Colors**
- Happy: #FFF9C4 (pastel yellow)
- Joyful: #FFE0B2 (pastel orange)
- Neutral: #E1BEE7 (pastel purple)
- Sad: #BBDEFB (pastel blue)
- Angry: #FFCDD2 (pastel red)

### 2. Typography System
Avenir Next font family configured with 4 text type styles:

1. **Main Page Headings**: 36px, AvenirNext-Bold, color #2C5F7C
2. **Normal Headings**: 24px, AvenirNext-Demi, color #2C5F7C
3. **Subheadings**: 16px, AvenirNext-Regular, color #8FA9B8
4. **Body Text**: 14px, AvenirNext-Regular, color #B5C4CE

**Font Files Required** (place in `assets/fonts/`):
- AvenirNext-Regular.ttf
- AvenirNext-Medium.ttf
- AvenirNext-Demi.ttf
- AvenirNext-Bold.ttf

### 3. Bottom Tab Bar
Redesigned tab bar with new order:
1. Home
2. Therapists
3. Chatbot (center - styled as floating orb)
4. Exercises
5. Account (renamed from Settings)

### 4. Home Page
Complete redesign featuring:
- **Greeting Section**: Dynamic greeting (Good Morning/Afternoon/Evening) with user name
- **Mood Selector Card**: Interactive mood tracking with 5 options
  - Happy, Joyful, Neutral, Sad, Angry
  - Each with colored circle indicator
  - Selected state with blue border
  - Saves to component state

### 5. Screen Updates
All screens updated with new design:
- **White to light blue gradient backgrounds** (instead of dark theme)
- **Pastel color scheme** throughout
- **Avenir Next typography** on all text
- **Updated card styles** with soft shadows and borders

**Screens Updated:**
- `screens/home/index.tsx` - Complete redesign
- `screens/chat/index.tsx` - Light theme with gradient
- `screens/exercises/index.tsx` - Light theme
- `screens/therapists/index.tsx` - Light theme
- `screens/settings/index.tsx` - Renamed to "Account", light theme

### 6. Component Updates
All components styled with new design system:
- **GlassCard**: Now uses white cards with soft blue borders and shadows
- **ChatBubble**: User messages in primary blue, bot messages in white cards
- **ExerciseCard**: Pastel styling with blue buttons
- **TherapistCard**: Updated with new color scheme

### 7. App Configuration
- **App name**: Changed to "Mazag"
- **Package name**: Updated to "mazag"
- **Bundle IDs**: Updated for iOS and Android
- **Splash background**: Changed to ice blue (#E3F2FD)

## Files Modified

### Configuration Files
- `tailwind.config.js` - Complete color palette and typography system
- `app.json` - App name and branding
- `package.json` - Package name

### Layout & Routing
- `app/_layout.tsx` - Font loading and tab bar configuration

### Screens
- `screens/home/index.tsx` - Complete redesign
- `screens/chat/index.tsx` - New color scheme
- `screens/exercises/index.tsx` - New color scheme
- `screens/therapists/index.tsx` - New color scheme
- `screens/settings/index.tsx` - New color scheme, renamed to Account

### Components
- `components/GlassCard/index.tsx` - Updated for light theme
- `components/ChatBubble/index.tsx` - New styling
- `components/ExerciseCard/index.tsx` - New styling
- `components/TherapistCard/index.tsx` - New styling

## Next Steps

### Required Actions
1. **Add Avenir Next fonts** to `assets/fonts/` folder:
   - AvenirNext-Regular.ttf
   - AvenirNext-Medium.ttf
   - AvenirNext-Demi.ttf
   - AvenirNext-Bold.ttf

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Clear cache and restart**:
   ```bash
   npx expo start -c
   ```

### Optional Enhancements
- Create custom floating orb component for chatbot tab
- Add animations to mood selector
- Implement mood tracking history
- Add haptic feedback on mood selection
- Create mood-based color themes throughout the app

## Design Principles

1. **Pastel Colors Only**: All colors are soft pastels to create a calming experience
2. **White Backgrounds**: Clean white to light blue gradients for clarity
3. **Consistent Typography**: Avenir Next throughout for elegance
4. **Soft Shadows**: Blue-tinted shadows for depth without harshness
5. **Rounded Corners**: 20-24px radius for friendly, approachable feel

## Color Usage Guidelines

- **Backgrounds**: Always use white to ice blue gradient
- **Cards**: White (85% opacity) with light blue border
- **Buttons**: Primary blue (#64B5F6) for main actions
- **Text**: Use hierarchy (strong → light → body) based on importance
- **Icons**: Primary blue (#64B5F6) for consistency
- **Mood Colors**: Only for mood selector indicators

## Accessibility Notes

- Text colors have sufficient contrast against white backgrounds
- Touch targets are minimum 48px for mood selectors
- Clear visual feedback on interactions
- Readable font sizes (minimum 14px)

