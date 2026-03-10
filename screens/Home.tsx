import { useNavigation } from '@react-navigation/native';
import { ScreenContent } from 'components/ScreenContent';

import { StyleSheet, View } from 'react-native';

import { Button } from '../components/Button';

export default function Home() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScreenContent path="screens/Home.tsx" title="Home"></ScreenContent>
      <Button
        onPress={() =>
          navigation.navigate('AddWorkout')
        }
        title="Add Workout"
      />
      <Button
        onPress={() =>
          navigation.navigate('WorkoutDetails')
        }
        title="View Workouts"
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
