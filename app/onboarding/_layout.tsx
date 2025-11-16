import { Stack } from 'expo-router';

export default function OnboardingLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                animation: 'fade',
                gestureEnabled: false, // Prevent swipe back during onboarding
            }}
        >
            <Stack.Screen name="welcome" />
            <Stack.Screen name="questionnaire" />
            <Stack.Screen name="complete" />
        </Stack>
    );
}
