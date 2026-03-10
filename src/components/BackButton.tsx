import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const BackButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity accessibilityRole="button" onPress={onPress} style={styles.touchable}>
      <View style={styles.container}>
        <Feather color="#0f766e" name="chevron-left" size={18} />
        <Text style={styles.label}>Back</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  label: {
    color: '#0f766e',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 4,
  },
});
