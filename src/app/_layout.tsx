import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';

import { SessionProvider, useSession } from '@/entities/session';
import { useColorScheme } from '@/shared/lib/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const navigationTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <SessionProvider>
      <ThemeProvider value={navigationTheme}>
        <RootNavigator />
      </ThemeProvider>
    </SessionProvider>
  );
}

function RootNavigator() {
  const { isSignedIn } = useSession();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isSignedIn} redirectTo="/welcome">
        <Stack.Screen name="(app)" />
      </Stack.Protected>

      <Stack.Protected guard={!isSignedIn} redirectTo="/">
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
}
