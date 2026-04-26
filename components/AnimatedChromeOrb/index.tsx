import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Canvas, Group, Circle, SweepGradient, vec, Blur, RadialGradient, Paint } from '@shopify/react-native-skia';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSharedValue, withRepeat, withTiming, Easing, useDerivedValue } from 'react-native-reanimated';

type SiriOrbColors = {
    bg?: string;
    c1?: string;
    c2?: string;
    c3?: string;
};

type Props = {
    size?: number;
    animationDuration?: number;
    colors?: SiriOrbColors;
    isActive?: boolean;
};

export default function AnimatedChromeOrb({
    size = 60,
    animationDuration = 20,
    colors = {},
    isActive = false,
}: Props) {
    // Shared value for animation progress (0 to 1) offloaded to UI thread
    const progress = useSharedValue(0);

    // Default color scheme - vibrant blues
    const defaultColors = {
        bg: '#E3F2FD',
        c1: '#4FC3F7', // Bright cyan
        c2: '#2196F3', // Vibrant blue
        c3: '#03A9F4', // Electric blue
    };

    const orbColors = { ...defaultColors, ...colors };

    useEffect(() => {
        // Run a continuous linear animation from 0 to 1 natively
        progress.value = 0;
        progress.value = withRepeat(
            withTiming(1, { duration: animationDuration * 1000, easing: Easing.linear }),
            -1, // infinite
            false // no reverse
        );
    }, [animationDuration]);

    const center = size / 2;
    const radius = size / 2;

    // Responsive calculations based on size
    const blurAmount = size < 50 ? Math.max(size * 0.15, 2) : Math.max(size * 0.15, 8);

    // Derived values for each gradient's rotation on the UI thread
    const transform1 = useDerivedValue(() => [{ rotate: progress.value * Math.PI * 4 }]); // angleRad * 2
    const transform2 = useDerivedValue(() => [{ rotate: progress.value * Math.PI * 4 }]); // angleRad * 2
    const transform3 = useDerivedValue(() => [{ rotate: progress.value * Math.PI * -6 }]); // angleRad * -3
    const transform4 = useDerivedValue(() => [{ rotate: progress.value * Math.PI * 4 }]); // angleRad * 2
    const transform5 = useDerivedValue(() => [{ rotate: progress.value * Math.PI * 2 }]); // angleRad * 1
    const transform6 = useDerivedValue(() => [{ rotate: progress.value * Math.PI * -4 }]); // angleRad * -2

    return (
        <View
            style={[
                styles.container,
                {
                    width: size,
                    height: size,
                    shadowColor: '#2196F3',
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.95,
                    shadowRadius: 20,
                    elevation: 20,
                }
            ]}
            pointerEvents="box-none"
        >
            {/* Main orb canvas */}
            <Canvas style={[styles.canvas, { width: size, height: size, borderRadius: size / 2 }]} pointerEvents="none">
                <Group>
                    {/* Base background */}
                    <Circle cx={center} cy={center} r={radius} color={orbColors.bg} />

                    {/* Layer of 6 conic gradients grouped with a single Blur for massive GPU optimization */}
                    <Group layer={<Paint><Blur blur={blurAmount * 0.6} /></Paint>}>
                        {/* Gradient 1: at 25% 70%, rotation * 2 */}
                        <Group transform={transform1} origin={vec(size * 0.25, size * 0.70)}>
                            <Circle cx={size * 0.25} cy={size * 0.70} r={radius * 2} opacity={0.9}>
                                <SweepGradient
                                    c={vec(size * 0.25, size * 0.70)}
                                    colors={[
                                        orbColors.c3,
                                        orbColors.c3,
                                        'transparent',
                                        'transparent',
                                        orbColors.c3,
                                        orbColors.c3,
                                    ]}
                                />
                            </Circle>
                        </Group>

                        {/* Gradient 2: at 45% 75%, rotation * 2 */}
                        <Group transform={transform2} origin={vec(size * 0.45, size * 0.75)}>
                            <Circle cx={size * 0.45} cy={size * 0.75} r={radius * 2} opacity={1.0}>
                                <SweepGradient
                                    c={vec(size * 0.45, size * 0.75)}
                                    colors={[
                                        orbColors.c3,
                                        orbColors.c2,
                                        'transparent',
                                        orbColors.c2,
                                        orbColors.c3,
                                    ]}
                                />
                            </Circle>
                        </Group>

                        {/* Gradient 3: at 80% 20%, rotation * -3 */}
                        <Group transform={transform3} origin={vec(size * 0.80, size * 0.20)}>
                            <Circle cx={size * 0.80} cy={size * 0.20} r={radius * 2} opacity={0.95}>
                                <SweepGradient
                                    c={vec(size * 0.80, size * 0.20)}
                                    colors={[
                                        orbColors.c3,
                                        orbColors.c1,
                                        'transparent',
                                        orbColors.c1,
                                        orbColors.c3,
                                    ]}
                                />
                            </Circle>
                        </Group>

                        {/* Gradient 4: at 15% 5%, rotation * 2 */}
                        <Group transform={transform4} origin={vec(size * 0.15, size * 0.05)}>
                            <Circle cx={size * 0.15} cy={size * 0.05} r={radius * 2} opacity={0.9}>
                                <SweepGradient
                                    c={vec(size * 0.15, size * 0.05)}
                                    colors={[
                                        orbColors.c3,
                                        orbColors.c2,
                                        'transparent',
                                        'transparent',
                                        'transparent',
                                        orbColors.c2,
                                        orbColors.c3,
                                    ]}
                                />
                            </Circle>
                        </Group>

                        {/* Gradient 5: at 20% 80%, rotation * 1 */}
                        <Group transform={transform5} origin={vec(size * 0.20, size * 0.80)}>
                            <Circle cx={size * 0.20} cy={size * 0.80} r={radius * 2} opacity={0.9}>
                                <SweepGradient
                                    c={vec(size * 0.20, size * 0.80)}
                                    colors={[
                                        orbColors.c3,
                                        orbColors.c1,
                                        'transparent',
                                        'transparent',
                                        orbColors.c1,
                                        orbColors.c3,
                                    ]}
                                />
                            </Circle>
                        </Group>

                        {/* Gradient 6: at 85% 10%, rotation * -2 */}
                        <Group transform={transform6} origin={vec(size * 0.85, size * 0.10)}>
                            <Circle cx={size * 0.85} cy={size * 0.10} r={radius * 2} opacity={1.0}>
                                <SweepGradient
                                    c={vec(size * 0.85, size * 0.10)}
                                    colors={[
                                        orbColors.c3,
                                        orbColors.c3,
                                        'transparent',
                                        orbColors.c3,
                                        orbColors.c3,
                                        'transparent',
                                        orbColors.c3,
                                    ]}
                                />
                            </Circle>
                        </Group>
                    </Group>

                    {/* 3D Sphere - Top-left highlight (light source) */}
                    <Circle cx={center} cy={center} r={radius * 0.5} opacity={0.5}>
                        <RadialGradient
                            c={vec(center, center)}
                            r={radius * 0.9}
                            colors={['rgba(255,255,255,0.95)', 'rgba(255,255,255,0.8)', 'transparent']}
                            positions={[0.8, 0.8, 1]}
                        />
                        <Blur blur={blurAmount * 0.8} />
                    </Circle>

                    {/* Glass rim highlight for 3D effect */}
                    <Circle cx={center} cy={center} r={radius} opacity={0.8}>
                        <RadialGradient
                            c={vec(center, center)}
                            r={radius * 1.5}
                            colors={['rgba(255,255,255,0.3)', 'transparent', 'rgba(255,255,255,0.6)']}
                            positions={[0.2, 0.88, 1]}
                        />
                        <Blur blur={blurAmount * 0.9} />
                    </Circle>
                </Group>
            </Canvas>

            {/* Icon overlay */}
            <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                    name={isActive ? "robot-happy" : "robot"}
                    size={size * 0.5}
                    color="#FFFFFF"
                    style={styles.icon}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    canvas: {
        overflow: 'hidden',
    },
    iconContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'none',
    },
    icon: {
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
    },
});
