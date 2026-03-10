import { createStaticNavigation, StaticParamList } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BackButton } from '../components/BackButton';
import Home from 'screens/Home';
import AddWorkout from 'screens/AddWorkout';
import WorkoutDetails from 'screens/WorkoutDetails';


const Stack = createStackNavigator({
  screens: {
    Home: {
      screen: Home,
    },
    AddWorkout: {
      screen: AddWorkout,
      options: ({ navigation }) => ({
        headerLeft: () => <BackButton onPress={navigation.goBack} />,
      }),
    },
    WorkoutDetails: {
      screen: WorkoutDetails,
      options: ({ navigation }) => ({
        headerLeft: () => <BackButton onPress={navigation.goBack} />,
      }),
    }
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
