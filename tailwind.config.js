// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./App.{js,jsx,ts,tsx}",
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
        "./screens/**/*.{js,jsx,ts,tsx}",
    ],
    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            fontFamily: {
                'avenir': ['AvenirNext-Light'],
                'avenir-medium': ['AvenirNext-Thin'],
                'avenir-semibold': ['AvenirNext-Regular'],
                'avenir-bold': ['AvenirNext-Medium'],
            },
            colors: {
                // Primary Pastel Blues
                iceBlue: '#E3F2FD',
                skyBlue: '#BBDEFB',
                powderBlue: '#90CAF9',
                lightBlue: '#D6EAF8',

                // Text Colors
                textStrong: '#2C5F7C',
                textNormal: '#6C839A',
                textLight: '#6C839A',
                textBody: '#6C839A',

                // Mood Colors (Pastels)
                moodHappy: '#FFF9C4',      // Pastel yellow
                moodJoyful: '#FFE0B2',     // Pastel orange
                moodNeutral: '#E1BEE7',    // Pastel purple
                moodSad: '#BBDEFB',        // Pastel blue
                moodAngry: '#FFCDD2',      // Pastel red

                // Accent Colors
                primaryBlue: '#64B5F6',
                accentBlue: '#42A5F5',
                borderBlue: '#B3E5FC',

                // Button & Interactive Elements
                buttonPrimary: '#64B5F6',
                buttonSecondary: '#90CAF9',

                // Backgrounds
                bgWhite: '#FFFFFF',
                bgLight: '#F5FBFF',
                bgGradientStart: '#FFFFFF',
                bgGradientEnd: '#E3F2FD',

                // Glass Effect (updated for light theme)
                glassBg: 'rgba(255,255,255, 0.99)',
                glassBorder: 'rgba(100,181,246,0.2)',
            },
            borderRadius: {
                xl: '20px',
                '2xl': '24px',
                '3xl': '30px',
            },
            boxShadow: {
                soft: '0 2px 8px rgba(100,181,246,0.1)',
                medium: '0 4px 16px rgba(100,181,246,0.15)',
                card: '0 8px 24px rgba(100,181,246,0.2)',
            },
            backgroundImage: {
                'gradient-main': 'linear-gradient(180deg, #FFFFFF 0%, #E3F2FD 100%)',
                'gradient-card': 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(227,242,253,0.7))',
            },
            fontSize: {
                'heading-main': ['28px', { lineHeight: '32px', fontWeight: '800' }],
                'heading': ['24px', { lineHeight: '28px', fontWeight: '600' }],
                'subheading': ['22px', { lineHeight: '28px', fontWeight: '600' }],
                'body': ['14px', { lineHeight: '20px', fontWeight: '300' }],
            },
        },
    },
    plugins: [],
};