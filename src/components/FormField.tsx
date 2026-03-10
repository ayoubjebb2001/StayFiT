import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type FormFieldProps = {
  label: string;
  children: ReactNode;
  hint?: string;
};

export const FormField = ({ label, children, hint }: FormFieldProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {children}
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    color: '#0f172a',
    fontSize: 15,
    fontWeight: '700',
  },
  hint: {
    color: '#64748b',
    fontSize: 13,
  },
});
