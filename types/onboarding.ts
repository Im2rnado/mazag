export type OnboardingResponse = {
    primaryConcern: string[];
    severityLevel: number;
    therapyExperience: string;
    therapyApproach: string[];
    moodPatterns: string;
    sleepQuality: number;
    supportSystem: string;
    wellnessGoals: string[];
    preferredExercises: string[];
    communicationStyle: string;
    completedAt: string;
};

export type UserProfile = {
    id: string;
    name?: string;
    onboarding?: OnboardingResponse;
    hasCompletedOnboarding: boolean;
};

