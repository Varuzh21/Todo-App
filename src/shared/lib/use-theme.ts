import { COLORS, type ColorScheme } from '@/shared/config/theme';
import { useColorScheme } from '@/shared/lib/use-color-scheme';

export function useTheme() {
  const scheme: ColorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';

  return COLORS[scheme];
}
