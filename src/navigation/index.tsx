import { createStaticNavigation, StaticParamList } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { BackButton } from '@/components/BackButton';
import AddWorkoutScreen from '@/screens/AddWorkoutScreen';
import HomeScreen from '@/screens/HomeScreen';
import WorkoutDetailsScreen from '@/screens/WorkoutDetailsScreen';

const Stack = createStackNavigator({
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        title: 'My Workouts',
      },
    },
    AddWorkout: {
      screen: AddWorkoutScreen,
      options: ({ navigation }) => ({
        title: 'Add Workout',
        headerLeft: () => <BackButton onPress={navigation.goBack} />,
      }),
    },
    WorkoutDetails: {
      screen: WorkoutDetailsScreen,
      options: ({ navigation }) => ({
        title: 'Workout Details',
        headerLeft: () => <BackButton onPress={navigation.goBack} />,
      }),
    },
  },
});

type RootNavigatorParamList = StaticParamList<typeof Stack>;

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends RootNavigatorParamList {}
  }
}

const Navigation = createStaticNavigation(Stack);

export default Navigation;
