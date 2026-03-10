import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/Button';

type EmptyStateProps = {
  title: string;
  message: string;
  actionLabel: string;
  onAction: () => void;
};

export const EmptyState = ({ title, message, actionLabel, onAction }: EmptyStateProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      <Button onPress={onAction} title={actionLabel} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8fafc',
    borderColor: '#cbd5e1',
    borderRadius: 20,
    borderWidth: 1,
    gap: 12,
    padding: 20,
  },
  title: {
    color: '#0f172a',
    fontSize: 22,
    fontWeight: '700',
  },
  message: {
    color: '#475569',
    fontSize: 15,
    lineHeight: 22,
  },
});
