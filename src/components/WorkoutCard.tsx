import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { intensityLabels, Workout } from '@/types/workout';

type WorkoutCardProps = {
  workout: Workout;
  onPress: () => void;
  onDelete: () => void;
};

export const WorkoutCard = ({ workout, onPress, onDelete }: WorkoutCardProps) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.activity}>{workout.activityType}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{intensityLabels[workout.intensity]}</Text>
          </View>
        </View>
        <Text style={styles.meta}>{workout.durationMinutes} min</Text>
        <Text style={styles.meta}>{workout.date}</Text>
        {workout.notes ? (
          <Text numberOfLines={2} style={styles.notes}>
            {workout.notes}
          </Text>
        ) : null}
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.85} onPress={onDelete} style={styles.deleteButton}>
        <Text style={styles.deleteLabel}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderColor: '#dbeafe',
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    gap: 6,
    padding: 18,
  },
  headerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activity: {
    color: '#0f172a',
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    marginRight: 12,
  },
  badge: {
    backgroundColor: '#ccfbf1',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  badgeText: {
    color: '#115e59',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  meta: {
    color: '#475569',
    fontSize: 14,
  },
  notes: {
    color: '#334155',
    fontSize: 14,
    lineHeight: 20,
  },
  deleteButton: {
    alignItems: 'center',
    backgroundColor: '#fee2e2',
    justifyContent: 'center',
    minWidth: 78,
    paddingHorizontal: 12,
  },
  deleteLabel: {
    color: '#b91c1c',
    fontSize: 14,
    fontWeight: '700',
  },
});
