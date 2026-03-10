import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

type ButtonProps = TouchableOpacityProps & {
  title: string;
  variant?: 'primary' | 'secondary' | 'danger';
};

export const Button = ({ title, variant = 'primary', style, ...touchableProps }: ButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      {...touchableProps}
      style={[styles.button, styles[variant], style]}>
      <Text style={[styles.label, variant !== 'primary' && styles.darkLabel]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 18,
    justifyContent: 'center',
    minHeight: 52,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  primary: {
    backgroundColor: '#0f766e',
  },
  secondary: {
    backgroundColor: '#ccfbf1',
  },
  danger: {
    backgroundColor: '#fecaca',
  },
  label: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  darkLabel: {
    color: '#111827',
  },
});
