import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { EmptyState } from '@/components/EmptyState';
import { StatusBanner } from '@/components/StatusBanner';
import { WorkoutCard } from '@/components/WorkoutCard';
import { useWorkouts } from '@/context/WorkoutContext';

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<ReactNavigation.RootParamList>>();
  const { deleteWorkout, isLoading, storageError, workouts } = useWorkouts();

  const confirmDelete = (workoutId: string) => {
    Alert.alert('Delete workout', 'This workout will be removed from your saved sessions.', [
      {
        style: 'cancel',
        text: 'Cancel',
      },
      {
        onPress: () => deleteWorkout(workoutId),
        style: 'destructive',
        text: 'Delete',
      },
    ]);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="#0f766e" size="large" />
        <Text style={styles.loadingText}>Loading your workout sessions...</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        contentContainerStyle={[styles.content, workouts.length === 0 && styles.emptyContent]}
        data={workouts}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <EmptyState
            actionLabel="Add your first workout"
            message="Save runs, rides, strength sessions, and more. Your data stays available after restart."
            onAction={() => navigation.navigate('AddWorkout')}
            title="No workouts yet"
          />
        }
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Track every session</Text>
            <Text style={styles.subtitle}>
              Review your saved workouts, open the full details, or remove a session directly from
              the list.
            </Text>
            {storageError ? <StatusBanner message={storageError} tone="error" /> : null}
            <Button onPress={() => navigation.navigate('AddWorkout')} title="Add Workout" />
          </View>
        }
        renderItem={({ item }) => (
          <WorkoutCard
            onDelete={() => confirmDelete(item.id)}
            onPress={() => navigation.navigate('WorkoutDetails', { workoutId: item.id })}
            workout={item}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#f8fafc',
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: 20,
  },
  emptyContent: {
    justifyContent: 'center',
  },
  header: {
    gap: 16,
    marginBottom: 20,
  },
  title: {
    color: '#0f172a',
    fontSize: 30,
    fontWeight: '800',
  },
  subtitle: {
    color: '#475569',
    fontSize: 15,
    lineHeight: 22,
  },
  separator: {
    height: 14,
  },
  loadingContainer: {
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    flex: 1,
    gap: 14,
    justifyContent: 'center',
    padding: 24,
  },
  loadingText: {
    color: '#334155',
    fontSize: 15,
  },
});
