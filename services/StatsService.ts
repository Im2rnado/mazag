import AsyncStorage from '@react-native-async-storage/async-storage';

const STATS_KEY = '@mazag_user_stats';

export type UserStats = {
    weeklyMoodTrend: 'positive' | 'neutral' | 'negative';
    journalingStreak: number;
    exercisesCompleted: number;
    totalConversations: number;
    messagesLeftThisMonth: string | number;
    lastJournalDate: string | null;
};

const defaultStats: UserStats = {
    weeklyMoodTrend: 'neutral',
    journalingStreak: 0,
    exercisesCompleted: 0,
    totalConversations: 0,
    messagesLeftThisMonth: '∞',
    lastJournalDate: null,
};

export default {
    async getStats(): Promise<UserStats> {
        try {
            const data = await AsyncStorage.getItem(STATS_KEY);
            if (data) {
                return JSON.parse(data) as UserStats;
            }
            return defaultStats;
        } catch (error) {
            console.error('Failed to load stats:', error);
            return defaultStats;
        }
    },

    async saveStats(stats: UserStats): Promise<void> {
        try {
            await AsyncStorage.setItem(STATS_KEY, JSON.stringify(stats));
        } catch (error) {
            console.error('Failed to save stats:', error);
        }
    },

    async incrementExercisesCompleted(): Promise<void> {
        const stats = await this.getStats();
        stats.exercisesCompleted += 1;
        await this.saveStats(stats);
    },

    async incrementConversations(): Promise<void> {
        const stats = await this.getStats();
        stats.totalConversations += 1;
        await this.saveStats(stats);
    },

    async updateJournalStreak(): Promise<void> {
        const stats = await this.getStats();
        const today = new Date().toISOString().split('T')[0];
        
        if (!stats.lastJournalDate) {
            stats.journalingStreak = 1;
            stats.lastJournalDate = today;
        } else if (stats.lastJournalDate !== today) {
            // Check if it was yesterday
            const lastDate = new Date(stats.lastJournalDate);
            const currentDate = new Date(today);
            const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            
            if (diffDays === 1) {
                stats.journalingStreak += 1;
            } else {
                stats.journalingStreak = 1; // Reset streak
            }
            stats.lastJournalDate = today;
        }
        await this.saveStats(stats);
    },
    
    async setMoodTrend(trend: 'positive' | 'neutral' | 'negative'): Promise<void> {
        const stats = await this.getStats();
        stats.weeklyMoodTrend = trend;
        await this.saveStats(stats);
    }
};
