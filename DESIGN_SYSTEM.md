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


### Optional Enhancements
- Implement mood tracking history
- Add haptic feedback on mood selection