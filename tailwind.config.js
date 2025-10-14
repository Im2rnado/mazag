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
                'avenir-medium': ['AvenirNext-Regular'],
                'avenir-semibold': ['AvenirNext-Medium'],
                'avenir-bold': ['AvenirNext-Demi'],
            },
            colors: {
                // Primary Vibrant Blues
                iceBlue: '#B3E5FC',
                skyBlue: '#81D4FA',
                powderBlue: '#4FC3F7',
                lightBlue: '#29B6F6',

                // Text Colors - More Vibrant
                textStrong: '#1565C0',
                textNormal: '#1976D2',
                textLight: '#42A5F5',
                textBody: '#64B5F6',

                // Mood Colors (More Vibrant)
                moodHappy: '#FFF176',      // Bright yellow
                moodJoyful: '#FFB74D',     // Bright orange
                moodNeutral: '#CE93D8',    // Bright purple
                moodSad: '#64B5F6',        // Bright blue
                moodAngry: '#E57373',      // Bright red

                // Accent Colors - More Vibrant
                primaryBlue: '#2196F3',
                accentBlue: '#03A9F4',
                borderBlue: '#81D4FA',

                // Button & Interactive Elements
                buttonPrimary: '#2196F3',
                buttonSecondary: '#4FC3F7',

                // Backgrounds
                bgWhite: '#FFFFFF',
                bgLight: '#E3F2FD',
                bgGradientStart: '#FFFFFF',
                bgGradientEnd: '#B3E5FC',

                // Glass Effect - More Vibrant
                glassBg: 'rgba(255,255,255,0.9)',
                glassBorder: 'rgba(33,150,243,0.3)',
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
                'heading-main': ['28px', { lineHeight: '32px', fontWeight: '700' }],
                'heading': ['24px', { lineHeight: '28px', fontWeight: '600' }],
                'middleheadingsub': ['20px', { lineHeight: '24px', fontWeight: '600' }],
                'subheading': ['18px', { lineHeight: '20px', fontWeight: '500' }],
                'body': ['14px', { lineHeight: '20px', fontWeight: '400' }],
            },
        },
    },
    plugins: [],
};