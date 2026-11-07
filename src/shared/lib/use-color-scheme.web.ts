import { useSyncExternalStore } from 'react';
import { useColorScheme as useNativeColorScheme } from 'react-native';

const SERVER_COLOR_SCHEME = 'light';

function subscribeToNothing() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

// Static web rendering has no access to the user's color scheme, so the first
// client render must match the server output before switching to the real value.
export function useColorScheme() {
  const isHydrated = useSyncExternalStore(subscribeToNothing, getClientSnapshot, getServerSnapshot);
  const colorScheme = useNativeColorScheme();

  return isHydrated ? colorScheme : SERVER_COLOR_SCHEME;
}
