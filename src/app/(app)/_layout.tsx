import { Tabs } from 'expo-router';

export const unstable_settings = {
	anchor: 'home',
};

export default function AppLayout() {
	return (
		<Tabs>
			<Tabs.Screen name='home' />
		</Tabs>
	);
}
