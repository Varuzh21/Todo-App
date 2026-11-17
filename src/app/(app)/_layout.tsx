import { Tabs } from 'expo-router';

import { PALETTE } from '@/shared/config/theme';
import {
	CalendarIcon,
	MenuIcon,
	ProfileIcon,
	TaskIcon,
} from '@/shared/ui/icons';

export const unstable_settings = {
	anchor: 'index',
};

export default function AppLayout() {
	return (
		<Tabs
			backBehavior='initialRoute'
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: PALETTE.primary,
				tabBarInactiveTintColor: PALETTE.neutral40,
			}}
		>
			<Tabs.Screen
				name='index'
				options={{
					title: 'Menu',
					tabBarIcon: ({ color }) => <MenuIcon color={color} />,
				}}
			/>
			<Tabs.Screen
				name='task'
				options={{
					title: 'Task',
					tabBarIcon: ({ color }) => <TaskIcon color={color} />,
				}}
			/>
			<Tabs.Screen
				name='calendar'
				options={{
					title: 'Calendar',
					tabBarIcon: ({ color }) => <CalendarIcon color={color} />,
				}}
			/>
			<Tabs.Screen
				name='profile'
				options={{
					title: 'Profile',
					tabBarIcon: ({ color }) => <ProfileIcon color={color} />,
				}}
			/>
		</Tabs>
	);
}
