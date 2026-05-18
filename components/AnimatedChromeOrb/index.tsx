import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';

type SiriOrbColors = {
    bg?: string;
    c1?: string;
    c2?: string;
    c3?: string;
};

type Props = {
    size?: number;
    animationDuration?: number; // Kept for prop compatibility, but unused
    colors?: SiriOrbColors;
    isActive?: boolean;
};

export default function AnimatedChromeOrb({
    size = 60,
    colors = {},
    isActive = false,
}: Props) {
    // Default color scheme - vibrant blues
    const defaultColors = {
        bg: '#E3F2FD',
        c1: '#4FC3F7', // Bright cyan
        c2: '#2196F3', // Vibrant blue
        c3: '#03A9F4', // Electric blue
    };

    const orbColors = { ...defaultColors, ...colors };

    return (
        <View
            style={[
                styles.container,
                {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    shadowColor: '#2196F3',
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.3, // Lower shadow opacity for better performance
                    shadowRadius: 8,
                    elevation: 5,
                    backgroundColor: orbColors.bg,
                }
            ]}
        >
            {/* Static Gradient Background instead of heavy Skia animations */}
            <ExpoLinearGradient
                colors={[orbColors.c1!, orbColors.c2!, orbColors.c3!]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    opacity: 0.8,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {/* Icon overlay */}
                <MaterialCommunityIcons
                    name={isActive ? "robot-happy" : "robot"}
                    size={size * 0.55}
                    color="#FFFFFF"
                    style={styles.icon}
                />
            </ExpoLinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        textShadowColor: 'rgba(0,0,0,0.2)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
    },
});
