import { Redirect } from 'expo-router';

// Redirect to welcome screen when accessing /onboarding
export default function OnboardingIndex() {
    return <Redirect href="/onboarding/welcome" />;
}
