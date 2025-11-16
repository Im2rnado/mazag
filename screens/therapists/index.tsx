import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, Animated } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import TherapistCard from '@/components/TherapistCard';
import TherapistService from '@/services/TherapistService';
import { Therapist } from '@/types';
import { SafeAreaView } from 'react-native-safe-area-context';

type FilterType = {
    specializations: string[];
    priceRange: { min: number; max: number } | null;
    minRating: number | null;
    languages: string[];
    genders: string[];
    ageGroups: string[];
};

// Cache for therapists data to avoid reloading
let therapistsCache: Therapist[] | null = null;
let filtersCache: { specializations: string[]; languages: string[]; ageGroups: string[] } | null = null;

export default function Therapists() {
    const router = useRouter();
    const [therapists, setTherapists] = useState<Therapist[]>(therapistsCache || []);
    const [loading, setLoading] = useState(!therapistsCache);
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [filterAnimation] = useState(new Animated.Value(0));

    // Filter state
    const [filters, setFilters] = useState<FilterType>({
        specializations: [],
        priceRange: null,
        minRating: null,
        languages: [],
        genders: [],
        ageGroups: [],
    });

    // Memoize available filter options to avoid recalculation
    const availableFilters = useMemo(() => {
        if (filtersCache) return filtersCache;

        if (therapists.length === 0) {
            return {
                specializations: [] as string[],
                languages: [] as string[],
                ageGroups: [] as string[],
            };
        }

        const specs = [...new Set(therapists.map(t => t.specialization))];
        const langs = [...new Set(therapists.flatMap(t => t.languages || []))];
        const ages = [...new Set(therapists.flatMap(t => t.ageGroups || []))];

        const filters = {
            specializations: specs,
            languages: langs,
            ageGroups: ages,
        };

        // Cache for future use
        if (!filtersCache) {
            filtersCache = filters;
        }

        return filters;
    }, [therapists]);

    useEffect(() => {
        // If data is already cached, skip loading
        if (therapistsCache) {
            return;
        }

        async function load() {
            try {
                const list = await TherapistService.fetchAll();
                setTherapists(list as Therapist[]);

                // Cache the data for future visits
                therapistsCache = list as Therapist[];
            } catch (error) {
                console.error('Failed to load therapists:', error);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    useEffect(() => {
        Animated.spring(filterAnimation, {
            toValue: showFilters ? 1 : 0,
            useNativeDriver: false,
            friction: 8,
        }).start();
    }, [showFilters]);

    // Memoize filtered therapists to avoid unnecessary recalculations
    const filteredTherapists = useMemo(() => {
        let filtered = therapists;

        // Search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                t =>
                    t.name.toLowerCase().includes(query) ||
                    t.specialization.toLowerCase().includes(query)
            );
        }

        // Specialization filter
        if (filters.specializations.length > 0) {
            filtered = filtered.filter(t => filters.specializations.includes(t.specialization));
        }

        // Price range filter
        if (filters.priceRange) {
            filtered = filtered.filter(
                t => t.price >= filters.priceRange!.min && t.price <= filters.priceRange!.max
            );
        }

        // Rating filter
        if (filters.minRating) {
            filtered = filtered.filter(t => (t.rating || 0) >= filters.minRating!);
        }

        // Language filter
        if (filters.languages.length > 0) {
            filtered = filtered.filter(t =>
                filters.languages.some(lang => t.languages?.includes(lang))
            );
        }

        // Gender filter
        if (filters.genders.length > 0) {
            filtered = filtered.filter(t => filters.genders.includes(t.gender));
        }

        // Age group filter
        if (filters.ageGroups.length > 0) {
            filtered = filtered.filter(t =>
                filters.ageGroups.some(age => t.ageGroups?.includes(age))
            );
        }

        return filtered;
    }, [therapists, searchQuery, filters]);

    // Memoize callbacks to prevent unnecessary re-renders
    const toggleFilter = useCallback((type: keyof FilterType, value: any) => {
        setFilters(prev => {
            const current = prev[type];
            if (Array.isArray(current)) {
                const updated = current.includes(value)
                    ? current.filter(v => v !== value)
                    : [...current, value];
                return { ...prev, [type]: updated };
            }
            return { ...prev, [type]: prev[type] === value ? null : value };
        });
    }, []);

    const clearFilters = useCallback(() => {
        setFilters({
            specializations: [],
            priceRange: null,
            minRating: null,
            languages: [],
            genders: [],
            ageGroups: [],
        });
        setSearchQuery('');
    }, []);

    const handleTherapistPress = useCallback((therapist: Therapist) => {
        router.push(`/therapists/${therapist.id}` as any);
    }, [router]);

    // Memoize active filter count
    const activeFilterCount = useMemo(() =>
        filters.specializations.length +
        filters.languages.length +
        filters.genders.length +
        filters.ageGroups.length +
        (filters.priceRange ? 1 : 0) +
        (filters.minRating ? 1 : 0),
        [filters]
    );

    // Memoize animated values (must be before early return)
    const filterMaxHeight = useMemo(() =>
        filterAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 600],
        }),
        [filterAnimation]
    );

    if (loading) {
        return (
            <ExpoLinearGradient
                colors={['#FFFFFF', '#E3F2FD', '#B3E5FC']}
                style={{ flex: 1 }}
                locations={[0, 0.7, 1]}
            >
                <SafeAreaView style={{ flex: 1 }} edges={['top']}>
                    <View className="flex-1 justify-center items-center p-4">
                        <Ionicons name="people" size={64} color="#64B5F6" />
                        <Text className="text-textStrong text-lg font-avenir-semibold mt-4">
                            Loading therapists...
                        </Text>
                    </View>
                </SafeAreaView>
            </ExpoLinearGradient>
        );
    }

    return (
        <ExpoLinearGradient
            colors={['#FFFFFF', '#E3F2FD', '#B3E5FC']}
            style={{ flex: 1 }}
            locations={[0, 0.7, 1]}
        >
            <SafeAreaView style={{ flex: 1 }} edges={['top']}>
                <View className="flex-1">
                    {/* Header */}
                    <View className="px-6 pt-3 pb-4">
                        <Text className="text-heading-main font-avenir-bold text-textStrong mb-4">
                            Find Your Therapist
                        </Text>

                        {/* Search Bar */}
                        <View className="bg-white rounded-2xl border-2 px-4 py-3 mb-3 flex-row items-center" style={{
                            borderColor: '#81D4FA',
                            shadowColor: '#2196F3',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 8,
                            elevation: 3,
                        }}>
                            <Ionicons name="search" size={22} color="#64B5F6" />
                            <TextInput
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                placeholder="Search by name or specialization..."
                                placeholderTextColor="#90A4AE"
                                className="flex-1 ml-3 text-base font-avenir-medium text-textStrong"
                            />
                            {searchQuery.length > 0 && (
                                <Pressable onPress={() => setSearchQuery('')}>
                                    <Ionicons name="close-circle" size={22} color="#90A4AE" />
                                </Pressable>
                            )}
                        </View>

                        {/* Filter Toggle Button */}
                        <View className="flex-row items-center justify-between">
                            <Pressable
                                onPress={() => setShowFilters(!showFilters)}
                                className="flex-row items-center bg-glassBg border border-glassBorder rounded-2xl px-4 py-3"
                                style={({ pressed }) => ({
                                    shadowColor: '#2196F3',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 6,
                                    elevation: 2,
                                    opacity: pressed ? 0.7 : 1,
                                })}
                            >
                                <Ionicons name="options" size={20} color="#2196F3" />
                                <Text className="text-base font-avenir-semibold text-textStrong ml-2">
                                    Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
                                </Text>
                            </Pressable>

                            {activeFilterCount > 0 && (
                                <Pressable
                                    onPress={clearFilters}
                                    className="px-4 py-3"
                                    style={({ pressed }) => ({
                                        opacity: pressed ? 0.7 : 1,
                                    })}
                                >
                                    <Text className="text-sm font-avenir-semibold text-primaryBlue">
                                        Clear All
                                    </Text>
                                </Pressable>
                            )}

                            <Text className="text-sm font-avenir-medium text-textLight">
                                {filteredTherapists.length} therapist{filteredTherapists.length !== 1 ? 's' : ''}
                            </Text>
                        </View>
                    </View>

                    {/* Filter Panel */}
                    <Animated.View
                        style={{
                            maxHeight: filterMaxHeight,
                            overflow: 'hidden',
                        }}
                    >
                        <ScrollView
                            className="px-6 pb-4"
                            showsVerticalScrollIndicator={false}
                        >
                            {/* Specialization Filter */}
                            <View className="mb-4">
                                <Text className="text-subheading font-avenir-bold text-textStrong mb-2">
                                    Specialization
                                </Text>
                                <View className="flex-row flex-wrap gap-2">
                                    {availableFilters.specializations.map(spec => (
                                        <Pressable
                                            key={spec}
                                            onPress={() => toggleFilter('specializations', spec)}
                                            className="rounded-xl px-3 py-2 border"
                                            style={({ pressed }) => ({
                                                backgroundColor: filters.specializations.includes(spec)
                                                    ? '#2196F3'
                                                    : 'rgba(33, 150, 243, 0.1)',
                                                borderColor: filters.specializations.includes(spec)
                                                    ? '#2196F3'
                                                    : 'rgba(33, 150, 243, 0.3)',
                                                opacity: pressed ? 0.7 : 1,
                                            })}
                                        >
                                            <Text
                                                className="text-sm font-avenir-medium"
                                                style={{
                                                    color: filters.specializations.includes(spec)
                                                        ? '#FFFFFF'
                                                        : '#2196F3',
                                                }}
                                            >
                                                {spec}
                                            </Text>
                                        </Pressable>
                                    ))}
                                </View>
                            </View>

                            {/* Price Range Filter */}
                            <View className="mb-4">
                                <Text className="text-subheading font-avenir-bold text-textStrong mb-2">
                                    Price Range (EGP)
                                </Text>
                                <View className="flex-row flex-wrap gap-2">
                                    {[
                                        { label: 'Budget (< 500)', min: 0, max: 499 },
                                        { label: 'Mid-Range (500-650)', min: 500, max: 650 },
                                        { label: 'Premium (> 650)', min: 651, max: 9999 },
                                    ].map(range => (
                                        <Pressable
                                            key={range.label}
                                            onPress={() =>
                                                toggleFilter('priceRange', { min: range.min, max: range.max })
                                            }
                                            className="rounded-xl px-3 py-2 border"
                                            style={({ pressed }) => ({
                                                backgroundColor:
                                                    filters.priceRange?.min === range.min &&
                                                        filters.priceRange?.max === range.max
                                                        ? '#FFB74D'
                                                        : 'rgba(255, 183, 77, 0.1)',
                                                borderColor:
                                                    filters.priceRange?.min === range.min &&
                                                        filters.priceRange?.max === range.max
                                                        ? '#FFB74D'
                                                        : 'rgba(255, 183, 77, 0.3)',
                                                opacity: pressed ? 0.7 : 1,
                                            })}
                                        >
                                            <Text
                                                className="text-sm font-avenir-medium"
                                                style={{
                                                    color:
                                                        filters.priceRange?.min === range.min &&
                                                            filters.priceRange?.max === range.max
                                                            ? '#FFFFFF'
                                                            : '#E65100',
                                                }}
                                            >
                                                {range.label}
                                            </Text>
                                        </Pressable>
                                    ))}
                                </View>
                            </View>

                            {/* Rating Filter */}
                            <View className="mb-4">
                                <Text className="text-subheading font-avenir-bold text-textStrong mb-2">
                                    Minimum Rating
                                </Text>
                                <View className="flex-row flex-wrap gap-2">
                                    {[4.5, 4.7, 4.8].map(rating => (
                                        <Pressable
                                            key={rating}
                                            onPress={() => toggleFilter('minRating', rating)}
                                            className="rounded-xl px-3 py-2 border flex-row items-center"
                                            style={({ pressed }) => ({
                                                backgroundColor: filters.minRating === rating
                                                    ? '#FFF176'
                                                    : 'rgba(255, 241, 118, 0.15)',
                                                borderColor: filters.minRating === rating
                                                    ? '#FFF176'
                                                    : 'rgba(255, 241, 118, 0.3)',
                                                opacity: pressed ? 0.7 : 1,
                                            })}
                                        >
                                            <Ionicons
                                                name="star"
                                                size={16}
                                                color={filters.minRating === rating ? '#F57F17' : '#FFA726'}
                                            />
                                            <Text
                                                className="text-sm font-avenir-medium ml-1"
                                                style={{
                                                    color: filters.minRating === rating ? '#F57F17' : '#FFA726',
                                                }}
                                            >
                                                {rating}+
                                            </Text>
                                        </Pressable>
                                    ))}
                                </View>
                            </View>

                            {/* Language Filter */}
                            <View className="mb-4">
                                <Text className="text-subheading font-avenir-bold text-textStrong mb-2">
                                    Languages
                                </Text>
                                <View className="flex-row flex-wrap gap-2">
                                    {availableFilters.languages.map(lang => (
                                        <Pressable
                                            key={lang}
                                            onPress={() => toggleFilter('languages', lang)}
                                            className="rounded-xl px-3 py-2 border"
                                            style={({ pressed }) => ({
                                                backgroundColor: filters.languages.includes(lang)
                                                    ? '#64B5F6'
                                                    : 'rgba(100, 181, 246, 0.1)',
                                                borderColor: filters.languages.includes(lang)
                                                    ? '#64B5F6'
                                                    : 'rgba(100, 181, 246, 0.3)',
                                                opacity: pressed ? 0.7 : 1,
                                            })}
                                        >
                                            <Text
                                                className="text-sm font-avenir-medium"
                                                style={{
                                                    color: filters.languages.includes(lang) ? '#FFFFFF' : '#1976D2',
                                                }}
                                            >
                                                {lang}
                                            </Text>
                                        </Pressable>
                                    ))}
                                </View>
                            </View>

                            {/* Gender Filter */}
                            <View className="mb-4">
                                <Text className="text-subheading font-avenir-bold text-textStrong mb-2">
                                    Gender
                                </Text>
                                <View className="flex-row flex-wrap gap-2">
                                    {['Male', 'Female'].map(gender => (
                                        <Pressable
                                            key={gender}
                                            onPress={() => toggleFilter('genders', gender)}
                                            className="rounded-xl px-3 py-2 border"
                                            style={({ pressed }) => ({
                                                backgroundColor: filters.genders.includes(gender)
                                                    ? '#BA68C8'
                                                    : 'rgba(186, 104, 200, 0.1)',
                                                borderColor: filters.genders.includes(gender)
                                                    ? '#BA68C8'
                                                    : 'rgba(186, 104, 200, 0.3)',
                                                opacity: pressed ? 0.7 : 1,
                                            })}
                                        >
                                            <Text
                                                className="text-sm font-avenir-medium"
                                                style={{
                                                    color: filters.genders.includes(gender) ? '#FFFFFF' : '#7B1FA2',
                                                }}
                                            >
                                                {gender}
                                            </Text>
                                        </Pressable>
                                    ))}
                                </View>
                            </View>

                            {/* Age Group Filter */}
                            <View className="mb-4">
                                <Text className="text-subheading font-avenir-bold text-textStrong mb-2">
                                    Age Groups They Work With
                                </Text>
                                <View className="flex-row flex-wrap gap-2">
                                    {availableFilters.ageGroups.map(age => (
                                        <Pressable
                                            key={age}
                                            onPress={() => toggleFilter('ageGroups', age)}
                                            className="rounded-xl px-3 py-2 border"
                                            style={({ pressed }) => ({
                                                backgroundColor: filters.ageGroups.includes(age)
                                                    ? '#4FC3F7'
                                                    : 'rgba(79, 195, 247, 0.1)',
                                                borderColor: filters.ageGroups.includes(age)
                                                    ? '#4FC3F7'
                                                    : 'rgba(79, 195, 247, 0.3)',
                                                opacity: pressed ? 0.7 : 1,
                                            })}
                                        >
                                            <Text
                                                className="text-sm font-avenir-medium"
                                                style={{
                                                    color: filters.ageGroups.includes(age) ? '#FFFFFF' : '#0277BD',
                                                }}
                                            >
                                                {age}
                                            </Text>
                                        </Pressable>
                                    ))}
                                </View>
                            </View>
                        </ScrollView>
                    </Animated.View>

                    {/* Therapist List */}
                    {filteredTherapists.length === 0 ? (
                        <View className="flex-1 justify-center items-center px-6">
                            <Ionicons name="sad-outline" size={64} color="#B0BEC5" />
                            <Text className="text-heading font-avenir-bold text-textStrong mt-4 text-center">
                                No therapists found
                            </Text>
                            <Text className="text-subheading font-avenir text-textLight mt-2 text-center">
                                Try adjusting your filters or search query
                            </Text>
                        </View>
                    ) : (
                        <FlashList
                            data={filteredTherapists}
                            keyExtractor={(t: Therapist) => t.id}
                            renderItem={({ item }: { item: Therapist }) => (
                                <TherapistCard
                                    therapist={item}
                                    onPress={() => handleTherapistPress(item)}
                                />
                            )}
                            contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 120 }}
                            showsVerticalScrollIndicator={false}
                        />
                    )}
                </View>
            </SafeAreaView>
        </ExpoLinearGradient>
    );
}
