import React from 'react';
import { View, ViewProps } from 'react-native';

type Props = ViewProps & {
    intensity?: number;
    children?: React.ReactNode;
};

export default function GlassCard({ intensity = 80, style, children, ...rest }: Props) {
    return (
        <View
            className="bg-glassBg rounded-2xl p-4 border border-glassBorder shadow-card"
            style={style}
            {...rest}
        >
            {children}
        </View>
    );
}
