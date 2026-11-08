import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { Navigation } from '@/entities/navigation';
import { SessionProvider } from '@/entities/session';
import { queryClient } from '@/shared/api';
import { FONT_SOURCES } from '@/shared/config/font-sources';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [isFontsLoaded, fontError] = useFonts(FONT_SOURCES);

	const isReady = isFontsLoaded || fontError !== null;

	useEffect(() => {
		if (isReady) {
			SplashScreen.hideAsync();
		}
	}, [isReady]);

	if (!isReady) {
		return null;
	}

	return (
		<QueryClientProvider client={queryClient}>
			<SessionProvider>
				<Navigation />
			</SessionProvider>
		</QueryClientProvider>
	);
}
