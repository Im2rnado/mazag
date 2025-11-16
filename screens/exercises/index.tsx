import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, Animated, TouchableOpacity, FlatList } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import ExerciseCard from '@/components/ExerciseCard';
import { Exercise } from '@/types';
import exercisesData from '@/assets/data/exercises.json';
import { SafeAreaView } from 'react-native-safe-area-context';

const CATEGORIES = [
  { id: 'all', label: 'All', icon: 'apps' as const },
  { id: 'breathing', label: 'Breathing', icon: 'cloud-outline' as const },
  { id: 'meditation', label: 'Meditation', icon: 'body-outline' as const },
  { id: 'journaling', label: 'Journaling', icon: 'book-outline' as const },
  { id: 'relaxation', label: 'Relaxation', icon: 'leaf-outline' as const },
  { id: 'movement', label: 'Movement', icon: 'walk' as const },
];

export default function Exercises() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Load exercises from JSON data
    setExercises(exercisesData as Exercise[]);
    setFilteredExercises(exercisesData as Exercise[]);
  }, []);

  useEffect(() => {
    // Filter exercises based on search and category
    let filtered = exercises;

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(ex => ex.type === selectedCategory);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(ex =>
        ex.title.toLowerCase().includes(query) ||
        ex.description?.toLowerCase().includes(query) ||
        ex.type.toLowerCase().includes(query)
      );
    }

    setFilteredExercises(filtered);
  }, [searchQuery, selectedCategory, exercises]);

  const handleExercisePress = (exercise: Exercise) => {
    // TODO: Navigate to exercise detail or start exercise
    console.log('Starting exercise:', exercise.title);
  };

  return (
    <ExpoLinearGradient
      colors={['#FAFAFA', '#E3F2FD', '#BBDEFB']}
      style={{ flex: 1 }}
      locations={[0, 0.5, 1]}
    >
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <View className="flex-1 pb-24">
          {/* Header */}
          <View className="px-6 pt-4 pb-3">
            <View className="flex-row items-center justify-between mb-4">
              <View>
                <Text className="text-3xl font-avenir-bold text-textStrong">
                  Wellness Exercises
                </Text>
                <Text className="text-sm font-avenir-medium text-textLight mt-1">
                  {filteredExercises.length} exercise{filteredExercises.length !== 1 ? 's' : ''} available
                </Text>
              </View>

              {/* Stats Icon */}
              <Pressable
                className="w-12 h-12 rounded-2xl items-center justify-center"
                style={({ pressed }) => ({
                  backgroundColor: 'rgba(33, 150, 243, 0.1)',
                  opacity: pressed ? 0.7 : 1,
                })}
              >
                <MaterialCommunityIcons name="chart-line" size={24} color="#2196F3" />
              </Pressable>
            </View>

            {/* Search Bar */}
            <View className="flex-row items-center bg-white rounded-2xl px-4 py-3 mb-4" style={{
              borderWidth: 2,
              borderColor: searchQuery ? '#64B5F6' : '#E3F2FD',
              shadowColor: '#2196F3',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: searchQuery ? 0.12 : 0.05,
              shadowRadius: 12,
              elevation: searchQuery ? 3 : 1,
            }}>
              <Ionicons name="search" size={20} color="#90A4AE" />
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search exercises..."
                placeholderTextColor="#B0BEC5"
                className="flex-1 ml-3 text-base font-avenir-medium text-textStrong"
              />
              {searchQuery.length > 0 && (
                <Pressable onPress={() => setSearchQuery('')}>
                  <Ionicons name="close-circle" size={20} color="#90A4AE" />
                </Pressable>
              )}
            </View>

            {/* Category Filters */}
            <FlatList
              data={CATEGORIES}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ gap: 8 }}
              renderItem={({ item }) => {
                const isSelected = selectedCategory === item.id;
                return (
                  <TouchableOpacity
                    onPress={() => setSelectedCategory(item.id)}
                    activeOpacity={0.7}
                    className="px-4 py-2.5 rounded-full flex-row items-center"
                    style={{
                      backgroundColor: isSelected ? '#2196F3' : 'rgba(33, 150, 243, 0.08)',
                      borderWidth: isSelected ? 0 : 1.5,
                      borderColor: 'rgba(33, 150, 243, 0.2)',
                      shadowColor: isSelected ? '#2196F3' : 'transparent',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.25,
                      shadowRadius: 8,
                      elevation: isSelected ? 3 : 0,
                    }}
                  >
                    <Ionicons
                      name={item.icon}
                      size={16}
                      color={isSelected ? '#FFFFFF' : '#2196F3'}
                    />
                    <Text
                      className="ml-2 font-avenir-bold text-sm"
                      style={{ color: isSelected ? '#FFFFFF' : '#2196F3' }}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>

          {/* Exercises List */}
          {filteredExercises.length > 0 ? (
            <FlashList
              data={filteredExercises}
              keyExtractor={(e: Exercise) => e.id}
              renderItem={({ item }: { item: Exercise }) => (
                <ExerciseCard
                  exercise={item}
                  onPress={() => handleExercisePress(item)}
                />
              )}
              contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 8, paddingBottom: 60 }}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            // Empty State
            <View className="flex-1 items-center justify-center px-8">
              <View className="w-20 h-20 rounded-full items-center justify-center mb-4" style={{
                backgroundColor: 'rgba(33, 150, 243, 0.1)',
              }}>
                <MaterialCommunityIcons name="cloud-search-outline" size={40} color="#90A4AE" />
              </View>
              <Text className="text-xl font-avenir-bold text-textStrong mb-2 text-center">
                No exercises found
              </Text>
              <Text className="text-sm font-avenir-medium text-textLight text-center">
                Try adjusting your search or filters
              </Text>
              <Pressable
                onPress={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-6 px-6 py-3 rounded-2xl"
                style={({ pressed }) => ({
                  backgroundColor: pressed ? 'rgba(33, 150, 243, 0.15)' : 'rgba(33, 150, 243, 0.1)',
                  opacity: pressed ? 0.8 : 1,
                })}
              >
                <Text className="font-avenir-bold text-primaryBlue">
                  Clear Filters
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </SafeAreaView>
    </ExpoLinearGradient>
  );
}
