import { Stack } from 'expo-router';

import { useSession } from '@/entities/session';

export function Navigation() {
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
