export type WorkoutIntensity = 'low' | 'medium' | 'high';

export type Workout = {
  id: string;
  activityType: string;
  durationMinutes: number;
  intensity: WorkoutIntensity;
  date: string;
  notes?: string;
  createdAt: string;
};

export type NewWorkoutInput = {
  activityType: string;
  durationMinutes: number;
  intensity: WorkoutIntensity;
  date: string;
  notes?: string;
};

export const intensityOptions: { label: string; value: WorkoutIntensity }[] = [
  { label: 'Faible', value: 'low' },
  { label: 'Moyenne', value: 'medium' },
  { label: 'Elevee', value: 'high' },
];

export const intensityLabels: Record<WorkoutIntensity, string> = {
  low: 'Faible',
  medium: 'Moyenne',
  high: 'Elevee',
};
