import { View, type ViewProps } from 'react-native';

import type { ThemeColor } from '@/shared/config/theme';
import { useTheme } from '@/shared/lib/use-theme';

interface ThemedViewProps extends ViewProps {
  themeColor?: ThemeColor;
}

export function ThemedView({ style, themeColor = 'background', ...rest }: ThemedViewProps) {
  const theme = useTheme();

  return <View style={[{ backgroundColor: theme[themeColor] }, style]} {...rest} />;
}
