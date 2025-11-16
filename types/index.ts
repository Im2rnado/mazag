export type User = {
  id: string;
  name: string;
  email?: string;
  type?: 'student' | 'user';
};

export type Therapist = {
  id: string;
  name: string;
  title: string; // Dr., etc.
  specialization: string;
  price: number;
  rating?: number;
  reviewCount?: number;
  bio?: string;
  languages?: string[];
  gender: 'Male' | 'Female';
  ageGroups?: string[]; // e.g., "Children (5-12)", "Teens (13-17)", "Adults (18-64)", "Seniors (65+)"
  yearsOfExperience?: number;
  qualifications?: string[];
  approach?: string; // Therapy approach description
  availableSlots?: string[]; // ISO datetime strings
  image?: string; // Avatar/photo URL
};

export type Message = {
  id: string;
  text: string;
  fromUser: boolean;
  createdAt?: string;
};

export type Exercise = {
  id: string;
  title: string;
  type: 'breathing' | 'journaling' | 'meditation' | 'relaxation' | 'movement';
  durationMinutes?: number;
  description?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  benefits?: string[];
};

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
