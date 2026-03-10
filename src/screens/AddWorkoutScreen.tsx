import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Button } from '@/components/Button';
import { FormField } from '@/components/FormField';
import { StatusBanner } from '@/components/StatusBanner';
import { useWorkouts } from '@/context/WorkoutContext';
import { intensityOptions, type WorkoutIntensity } from '@/types/workout';

const getToday = () => new Date().toISOString().split('T')[0] ?? '';

const isValidDate = (value: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const parsedDate = new Date(value);

  return !Number.isNaN(parsedDate.getTime()) && parsedDate.toISOString().startsWith(value);
};

export default function AddWorkoutScreen() {
  const navigation = useNavigation<NavigationProp<ReactNavigation.RootParamList>>();
  const { addWorkout, storageError } = useWorkouts();
  const [activityType, setActivityType] = useState('');
  const [durationMinutes, setDurationMinutes] = useState('');
  const [intensity, setIntensity] = useState<WorkoutIntensity>('medium');
  const [date, setDate] = useState(getToday());
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = () => {
    const parsedDuration = Number.parseInt(durationMinutes, 10);

    if (!activityType.trim()) {
      setFormError('Activity type is required.');
      return;
    }

    if (!Number.isInteger(parsedDuration) || parsedDuration <= 0) {
      setFormError('Duration must be a positive number of minutes.');
      return;
    }

    if (!isValidDate(date)) {
      setFormError('Date must use the YYYY-MM-DD format.');
      return;
    }

    setFormError(null);

    const workout = addWorkout({
      activityType,
      date,
      durationMinutes: parsedDuration,
      intensity,
      notes,
    });

    navigation.replace('WorkoutDetails', { workoutId: workout.id });
  };

  return (
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <Text style={styles.title}>Add a workout session</Text>
        <Text style={styles.subtitle}>
          Save the activity, duration, intensity, date, and optional notes for this session.
        </Text>
      </View>

      {formError ? <StatusBanner message={formError} tone="error" /> : null}
      {storageError ? <StatusBanner message={storageError} tone="error" /> : null}

      <FormField label="Activity type" hint="Examples: Running, strength training, cycling">
        <TextInput
          onChangeText={setActivityType}
          placeholder="Running"
          placeholderTextColor="#94a3b8"
          style={styles.input}
          value={activityType}
        />
      </FormField>

      <FormField label="Duration (minutes)">
        <TextInput
          keyboardType="number-pad"
          onChangeText={setDurationMinutes}
          placeholder="45"
          placeholderTextColor="#94a3b8"
          style={styles.input}
          value={durationMinutes}
        />
      </FormField>

      <FormField label="Intensity">
        <View style={styles.intensityRow}>
          {intensityOptions.map((option) => {
            const isSelected = intensity === option.value;

            return (
              <TouchableOpacity
                key={option.value}
                onPress={() => setIntensity(option.value)}
                style={[styles.intensityChip, isSelected && styles.intensityChipSelected]}>
                <Text style={[styles.intensityLabel, isSelected && styles.intensityLabelSelected]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </FormField>

      <FormField label="Date" hint="Use YYYY-MM-DD, for example 2026-03-10">
        <TextInput
          autoCapitalize="none"
          onChangeText={setDate}
          placeholder="2026-03-10"
          placeholderTextColor="#94a3b8"
          style={styles.input}
          value={date}
        />
      </FormField>

      <FormField label="Notes" hint="Optional">
        <TextInput
          multiline
          onChangeText={setNotes}
          placeholder="How did the session feel?"
          placeholderTextColor="#94a3b8"
          style={[styles.input, styles.notesInput]}
          textAlignVertical="top"
          value={notes}
        />
      </FormField>

      <View style={styles.actions}>
        <Button onPress={handleSubmit} title="Save Workout" />
        <Button onPress={() => navigation.goBack()} title="Cancel" variant="secondary" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#f8fafc',
    gap: 18,
    padding: 20,
  },
  header: {
    gap: 10,
    marginBottom: 4,
  },
  title: {
    color: '#0f172a',
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    color: '#475569',
    fontSize: 15,
    lineHeight: 22,
  },
  input: {
    backgroundColor: '#ffffff',
    borderColor: '#cbd5e1',
    borderRadius: 16,
    borderWidth: 1,
    color: '#0f172a',
    fontSize: 16,
    minHeight: 52,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  notesInput: {
    minHeight: 120,
  },
  intensityRow: {
    flexDirection: 'row',
    gap: 10,
  },
  intensityChip: {
    backgroundColor: '#e2e8f0',
    borderRadius: 999,
    flex: 1,
    minHeight: 48,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  intensityChipSelected: {
    backgroundColor: '#0f766e',
  },
  intensityLabel: {
    color: '#334155',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  intensityLabelSelected: {
    color: '#ffffff',
  },
  actions: {
    gap: 12,
    marginTop: 8,
    paddingBottom: 24,
  },
});
