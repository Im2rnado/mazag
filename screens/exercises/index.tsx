import React, { useState, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import ExerciseCard from '@/components/ExerciseCard';
import { Exercise } from '@/types';
import exercisesData from '@/assets/data/exercises.json';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Exercises() {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    // Load exercises from JSON data
    setExercises(exercisesData);
  }, []);

  const handleExercisePress = (exercise: Exercise) => {
    // TODO: Navigate to exercise detail or start exercise
    console.log('Starting exercise:', exercise.title);
  };

  return (
    <ExpoLinearGradient
      colors={['#FFFFFF', '#E3F2FD']}
      style={{ flex: 1 }}
      locations={[0, 1]}
    >
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <View className="flex-1 p-6 pb-28">
          <Text className="text-heading-main font-avenir-bold text-textStrong mb-4">
            Exercises
          </Text>
          <FlatList
            data={exercises}
            keyExtractor={(e) => e.id}
            renderItem={({ item }) => (
              <ExerciseCard
                exercise={item}
                onPress={() => handleExercisePress(item)}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    </ExpoLinearGradient>
  );
}
