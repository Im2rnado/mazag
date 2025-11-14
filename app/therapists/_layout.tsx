import { Stack } from 'expo-router';

export default function TherapistsLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                animation: 'slide_from_right',
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    gestureEnabled: false, // Disable for list page
                }}
            />
            <Stack.Screen
                name="[id]"
                options={{
                    gestureEnabled: true, // Enable swipe back for detail page
                    presentation: 'card',
                }}
            />
        </Stack>
    );
}

