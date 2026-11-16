import { Tabs } from 'expo-router';

export const unstable_settings = {
	anchor: 'menu',
};

export default function AppLayout() {
	return (
		<Tabs screenOptions={{ headerShown: false }}>
			<Tabs.Screen name='menu' />
			<Tabs.Screen name='task' />
			<Tabs.Screen name='calendar' />
			<Tabs.Screen name='profile' />
		</Tabs>
	);
}
