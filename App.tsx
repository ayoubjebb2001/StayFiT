import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { useMemo } from 'react';

import 'react-native-gesture-handler';

import { WorkoutProvider } from '@/context/WorkoutContext';
import Navigation from '@/navigation';

export default function App() {
  const colorScheme = useColorScheme();
  const theme = useMemo(() => (colorScheme === 'dark' ? DarkTheme : DefaultTheme), [colorScheme]);

  return (
    <WorkoutProvider>
      <Navigation theme={theme} />
    </WorkoutProvider>
  );
}
