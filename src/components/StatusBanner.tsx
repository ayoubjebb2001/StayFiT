import { StyleSheet, Text, View } from 'react-native';

type StatusBannerProps = {
  message: string;
  tone?: 'error' | 'info';
};

export const StatusBanner = ({ message, tone = 'info' }: StatusBannerProps) => {
  return (
    <View style={[styles.container, tone === 'error' ? styles.error : styles.info]}>
      <Text style={[styles.message, tone === 'error' ? styles.errorText : styles.infoText]}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  info: {
    backgroundColor: '#eff6ff',
    borderColor: '#93c5fd',
  },
  error: {
    backgroundColor: '#fef2f2',
    borderColor: '#fca5a5',
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
  },
  infoText: {
    color: '#1d4ed8',
  },
  errorText: {
    color: '#b91c1c',
  },
});
