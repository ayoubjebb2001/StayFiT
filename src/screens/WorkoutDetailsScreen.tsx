import type { StaticScreenProps } from '@react-navigation/native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { StatusBanner } from '@/components/StatusBanner';
import { useWorkouts } from '@/context/WorkoutContext';
import { intensityLabels } from '@/types/workout';

type Props = StaticScreenProps<{
  workoutId: string;
}>;

const DetailRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
};

export default function WorkoutDetailsScreen({ route }: Props) {
  const navigation = useNavigation<NavigationProp<ReactNavigation.RootParamList>>();
  const { deleteWorkout, storageError, workouts } = useWorkouts();
  const workout = workouts.find((item) => item.id === route.params.workoutId);

  const goHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  const confirmDelete = () => {
    if (!workout) {
      return;
    }

    Alert.alert('Delete workout', 'This workout will be permanently removed.', [
      {
        style: 'cancel',
        text: 'Cancel',
      },
      {
        onPress: () => {
          deleteWorkout(workout.id);
          goHome();
        },
        style: 'destructive',
        text: 'Delete',
      },
    ]);
  };

  if (!workout) {
    return (
      <View style={styles.missingContainer}>
        <StatusBanner
          message="This workout was not found. It may have been deleted from another screen."
          tone="info"
        />
        <Button onPress={goHome} title="Back to Home" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.activity}>{workout.activityType}</Text>
        <Text style={styles.date}>{workout.date}</Text>
      </View>

      {storageError ? <StatusBanner message={storageError} tone="error" /> : null}

      <View style={styles.detailsCard}>
        <DetailRow label="Duration" value={`${workout.durationMinutes} minutes`} />
        <DetailRow label="Intensity" value={intensityLabels[workout.intensity]} />
        <DetailRow label="Created" value={new Date(workout.createdAt).toLocaleString()} />
      </View>

      <View style={styles.notesCard}>
        <Text style={styles.sectionTitle}>Notes</Text>
        <Text style={styles.notesText}>{workout.notes || 'No notes for this workout.'}</Text>
      </View>

      <View style={styles.actions}>
        <Button onPress={confirmDelete} title="Delete Workout" variant="danger" />
        <Button onPress={goHome} title="Back to Home" variant="secondary" />
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
  hero: {
    backgroundColor: '#0f766e',
    borderRadius: 24,
    gap: 8,
    padding: 20,
  },
  activity: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '800',
  },
  date: {
    color: '#ccfbf1',
    fontSize: 15,
  },
  detailsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    gap: 16,
    padding: 18,
  },
  detailRow: {
    gap: 6,
  },
  detailLabel: {
    color: '#64748b',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  detailValue: {
    color: '#0f172a',
    fontSize: 18,
    fontWeight: '600',
  },
  notesCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    gap: 10,
    padding: 18,
  },
  sectionTitle: {
    color: '#0f172a',
    fontSize: 18,
    fontWeight: '700',
  },
  notesText: {
    color: '#334155',
    fontSize: 15,
    lineHeight: 22,
  },
  actions: {
    gap: 12,
    paddingBottom: 24,
  },
  missingContainer: {
    backgroundColor: '#f8fafc',
    flex: 1,
    gap: 16,
    justifyContent: 'center',
    padding: 20,
  },
});
