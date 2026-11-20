import { TopTabs } from 'expo-router/js-top-tabs';

import { TopTabBar } from '@/widgets/top-tab-bar';

export const unstable_settings = {
	anchor: 'index',
};

export default function TaskLayout() {
	return (
		<TopTabs
			backBehavior='initialRoute'
			tabBar={props => <TopTabBar {...props} />}
		>
			<TopTabs.Screen name='index' options={{ title: 'Behind Schedule' }} />
			<TopTabs.Screen name='upcoming' options={{ title: 'Upcoming' }} />
			<TopTabs.Screen name='completed' options={{ title: 'Completed' }} />
		</TopTabs>
	);
}
