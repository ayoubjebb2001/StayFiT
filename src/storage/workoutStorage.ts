import AsyncStorage from '@react-native-async-storage/async-storage';

import type { Workout, WorkoutIntensity } from '@/types/workout';

const WORKOUTS_STORAGE_KEY = 'stayfit.workouts.v1';

const isWorkoutIntensity = (value: unknown): value is WorkoutIntensity =>
  value === 'low' || value === 'medium' || value === 'high';

const isWorkout = (value: unknown): value is Workout => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.activityType === 'string' &&
    typeof candidate.durationMinutes === 'number' &&
    isWorkoutIntensity(candidate.intensity) &&
    typeof candidate.date === 'string' &&
    typeof candidate.createdAt === 'string' &&
    (typeof candidate.notes === 'undefined' || typeof candidate.notes === 'string')
  );
};

const sortWorkouts = (workouts: Workout[]) =>
  [...workouts].sort(
    (left, right) => new Date(right.date).getTime() - new Date(left.date).getTime()
  );

export const loadWorkouts = async (): Promise<Workout[]> => {
  const storedValue = await AsyncStorage.getItem(WORKOUTS_STORAGE_KEY);

  if (!storedValue) {
    return [];
  }

  const parsedValue: unknown = JSON.parse(storedValue);

  if (!Array.isArray(parsedValue) || !parsedValue.every(isWorkout)) {
    throw new Error('Stored workouts are invalid.');
  }

  return sortWorkouts(parsedValue);
};

export const saveWorkouts = async (workouts: Workout[]) => {
  await AsyncStorage.setItem(WORKOUTS_STORAGE_KEY, JSON.stringify(sortWorkouts(workouts)));
};
