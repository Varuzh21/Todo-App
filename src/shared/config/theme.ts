// Placeholder palette from the Expo starter; replace with the Figma design tokens.
export const COLORS = {
  light: {
    text: '#000000',
    textSecondary: '#60646C',
    background: '#FFFFFF',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
  },
  dark: {
    text: '#FFFFFF',
    textSecondary: '#B0B4BA',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
  },
} as const;

export type ColorScheme = keyof typeof COLORS;

export type ThemeColor = keyof typeof COLORS.light & keyof typeof COLORS.dark;

export const SPACING = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;
