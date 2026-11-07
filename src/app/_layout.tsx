import { Stack } from 'expo-router';

import { SessionProvider, useSession } from '@/entities/session';

export default function RootLayout() {
	return (
		<SessionProvider>
			<RootNavigator />
		</SessionProvider>
	);
}

function RootNavigator() {
	const { isSignedIn } = useSession();

	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Protected guard={isSignedIn} redirectTo='/welcome'>
				<Stack.Screen name='(app)' />
			</Stack.Protected>

			<Stack.Protected guard={!isSignedIn} redirectTo='/home'>
				<Stack.Screen name='(auth)' />
			</Stack.Protected>
		</Stack>
	);
}
