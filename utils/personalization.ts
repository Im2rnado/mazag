import { OnboardingResponse } from '@/types/onboarding';

export function getPersonalizedRecommendations(profile: OnboardingResponse) {
    const recommendations: {
        exercises: string[];
        therapistSpecializations: string[];
        greeting: string;
        supportMessage: string;
    } = {
        exercises: [],
        therapistSpecializations: [],
        greeting: '',
        supportMessage: '',
    };

    // Personalized greeting based on wellbeing level
    if (profile.severityLevel <= 3) {
        recommendations.greeting = "We're here to support you through this";
        recommendations.supportMessage = "Let's take small, manageable steps together";
    } else if (profile.severityLevel <= 7) {
        recommendations.greeting = "Welcome back to your wellness journey";
        recommendations.supportMessage = "You're making progress, keep going";
    } else {
        recommendations.greeting = "Great to see you focusing on growth";
        recommendations.supportMessage = "Let's maintain and enhance your wellbeing";
    }

    // Exercise recommendations based on preferences and concerns
    if (profile.preferredExercises?.includes('breathing') || profile.primaryConcern?.includes('anxiety')) {
        recommendations.exercises.push('4-7-8 Breathing', 'Box Breathing');
    }
    if (profile.preferredExercises?.includes('meditation') || profile.primaryConcern?.includes('stress')) {
        recommendations.exercises.push('Body Scan Meditation', 'Mindful Observation');
    }
    if (profile.preferredExercises?.includes('journaling') || profile.primaryConcern?.includes('depression')) {
        recommendations.exercises.push('Gratitude Journal', 'Emotional Check-In');
    }
    if (profile.preferredExercises?.includes('movement')) {
        recommendations.exercises.push('Walking Meditation', 'Gentle Stretching Flow');
    }
    if (profile.sleepQuality <= 5 || profile.primaryConcern?.includes('sleep')) {
        recommendations.exercises.push('4-7-8 Breathing', 'Body Scan Meditation');
    }

    // Therapist specialization recommendations
    if (profile.primaryConcern?.includes('anxiety')) {
        recommendations.therapistSpecializations.push('Anxiety', 'Stress Management');
    }
    if (profile.primaryConcern?.includes('depression')) {
        recommendations.therapistSpecializations.push('Depression', 'Mood Disorders');
    }
    if (profile.primaryConcern?.includes('relationships')) {
        recommendations.therapistSpecializations.push('Relationships', 'Family Therapy');
    }
    if (profile.primaryConcern?.includes('stress')) {
        recommendations.therapistSpecializations.push('Stress Management', 'Burnout');
    }

    // Therapy approach recommendations
    if (profile.therapyApproach?.includes('cbt')) {
        recommendations.therapistSpecializations.push('Cognitive Behavioral Therapy');
    }
    if (profile.therapyApproach?.includes('mindfulness')) {
        recommendations.therapistSpecializations.push('Mindfulness-Based Therapy');
    }

    // Remove duplicates
    recommendations.exercises = [...new Set(recommendations.exercises)];
    recommendations.therapistSpecializations = [...new Set(recommendations.therapistSpecializations)];

    return recommendations;
}

export function getPersonalizedQuickActions(profile: OnboardingResponse) {
    const actions = [];

    // Always include chat
    actions.push({
        id: 'chat',
        label: 'Talk to Mazag',
        icon: 'chatbubbles' as const,
        route: '/chat',
        color: '#2196F3',
    });

    // Add based on preferences
    if (profile.preferredExercises?.includes('breathing') || profile.primaryConcern?.includes('anxiety')) {
        actions.push({
            id: 'breathing',
            label: 'Breathing Exercise',
            icon: 'cloud' as const,
            route: '/exercises',
            color: '#64B5F6',
        });
    }

    if (profile.preferredExercises?.includes('journaling')) {
        actions.push({
            id: 'journal',
            label: 'Journal Entry',
            icon: 'create' as const,
            route: '/exercises',
            color: '#FF9800',
        });
    }

    if (profile.primaryConcern?.includes('relationships') || profile.severityLevel <= 4) {
        actions.push({
            id: 'therapist',
            label: 'Find Therapist',
            icon: 'people' as const,
            route: '/therapists',
            color: '#7B1FA2',
        });
    }

    // Limit to 4 actions
    return actions.slice(0, 4);
}

export function getChatbotPersonality(profile: OnboardingResponse): string {
    // Return personality instructions for the chatbot based on communication style
    const styles: Record<string, string> = {
        direct: 'Be concise and solution-focused. Provide clear action steps.',
        empathetic: 'Be warm and understanding. Use supportive language and validate feelings.',
        analytical: 'Be structured and logical. Explain the reasoning behind suggestions.',
        casual: 'Be friendly and conversational. Use a relaxed, approachable tone.',
    };

    return styles[profile.communicationStyle] || styles.empathetic;
}

