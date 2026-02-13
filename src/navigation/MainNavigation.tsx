import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';

import HomeNavigation from './HomeNavigation';
import TaskNavigation from './TaskNavigation';

import Home from '@/assets/icons/home.svg';
import Calendar from '@/assets/icons/calendar.svg';
import Settings from '@/assets/icons/settings.svg';
import TodoList from '@/assets/icons/todo-list.svg';
import CalendarNavigation from './CalendarNavigation';
import SettingsNavigation from './SettingsNavigation';

const Tab = createBottomTabNavigator();
function MainNavigation() {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarHideOnKeyboard: true,
				tabBarShowLabel: false,
				tabBarActiveTintColor: '#63F5EF',
				tabBarInactiveTintColor: '#FFFFFF',
				tabBarStyle: {
					borderTopWidth: 1,
					alignItems: 'center',
					columnGap: 70,
					paddingBlock: 20,
					backgroundColor: 'transparent',
					elevation: 0,
					height: 80,
					paddingTop: 20
				},
			}}
		>
			<Tab.Screen
				name='HomeNavigation'
				component={HomeNavigation}
				options={{
					headerShown: false,
					tabBarShowLabel: false,
					tabBarIcon: ({ focused, color }) => (
						<View
							style={{
								alignItems: 'center',
								gap: 6.5,
								justifyContent: 'center',
							}}
						>
							<Home width={33} height={30} fill={color} />
								<View
									style={{
										width: 12,
										height: 3,
										backgroundColor: focused ? '#fff' : undefined,
										borderRadius: 100,
									}}
								/>
						</View>
					),
				}}
			/>
			<Tab.Screen
				name='TaskNavigation'
				component={TaskNavigation}
				options={{
					headerShown: false,
					tabBarShowLabel: false,
					tabBarIcon: ({ focused, color }) => (
						<View
							style={{
								alignItems: 'center',
								gap: 6.5,
								justifyContent: 'center',
							}}
						>
							<TodoList width={33} height={30} fill={color} />
								<View
									style={{
										width: 12,
										height: 3,
										backgroundColor: focused ? '#fff' : undefined,
										borderRadius: 100,
									}}
								/>
						</View>
					),
				}}
			/>
			<Tab.Screen
				name='CalendarNavigation'
				component={CalendarNavigation}
				options={{
					headerShown: false,
					tabBarShowLabel: false,
					tabBarIcon: ({ focused, color }) => (
						<View
							style={{
								alignItems: 'center',
								gap: 6.5,
								justifyContent: 'center',
							}}
						>
							<Calendar width={33} height={30} fill={color} />
								<View
									style={{
										width: 12,
										height: 3,
										backgroundColor: focused ? '#fff' : undefined,
										borderRadius: 100,
									}}
								/>
						</View>
					),
				}}
			/>
			<Tab.Screen
				name='SettingsNavigation'
				component={SettingsNavigation}
				options={{
					headerShown: false,
					tabBarShowLabel: false,
					tabBarIcon: ({ focused, color }) => (
						<View
							style={{
								alignItems: 'center',
								gap: 6.5,
								justifyContent: 'center',
							}}
						>
							<Settings width={33} height={30} fill={color} />
								<View
									style={{
										width: 12,
										height: 3,
										backgroundColor: focused ? '#fff' : undefined,
										borderRadius: 100,
									}}
								/>
						</View>
					),
				}}
			/>
		</Tab.Navigator>
	);
}

export default MainNavigation;
