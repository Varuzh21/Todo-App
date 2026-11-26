import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { SessionProvider, useSession } from '@/entities/session';
import { queryClient } from '@/shared/api';
import { FONT_SOURCES } from '@/shared/config/font-sources';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [isFontsLoaded, fontError] = useFonts(FONT_SOURCES);

	const isReady = isFontsLoaded || fontError !== null;

	if (!isReady) {
		return null;
	}

	return (
		<QueryClientProvider client={queryClient}>
			<SessionProvider>
				<StatusBar style='dark' />
				<RootNavigator />
			</SessionProvider>
		</QueryClientProvider>
	);
}

function RootNavigator() {
	const { isSignedIn } = useSession();

	useEffect(() => {
		SplashScreen.hideAsync();
	}, []);

	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Protected guard={isSignedIn}>
				<Stack.Screen name='(app)' />
			</Stack.Protected>

			<Stack.Protected guard={!isSignedIn}>
				<Stack.Screen name='(auth)' />
			</Stack.Protected>
		</Stack>
	);
}
