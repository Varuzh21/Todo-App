import { StyleSheet, Text, type TextProps } from 'react-native';

import type { ThemeColor } from '@/shared/config/theme';
import { useTheme } from '@/shared/lib/use-theme';

type TextVariant = 'default' | 'title' | 'subtitle' | 'small' | 'smallBold';

interface ThemedTextProps extends TextProps {
  variant?: TextVariant;
  themeColor?: ThemeColor;
}

export function ThemedText({
  style,
  variant = 'default',
  themeColor = 'text',
  ...rest
}: ThemedTextProps) {
  const theme = useTheme();

  return <Text style={[{ color: theme[themeColor] }, styles[variant], style]} {...rest} />;
}

// Placeholder type scale from the Expo starter; replace with the Figma text styles.
const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 500,
  },
  title: {
    fontSize: 48,
    lineHeight: 52,
    fontWeight: 600,
  },
  subtitle: {
    fontSize: 32,
    lineHeight: 44,
    fontWeight: 600,
  },
  small: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 500,
  },
  smallBold: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 700,
  },
});
