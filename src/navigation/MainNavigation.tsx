import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeNavigation from './HomeNavigation';

import Home from '@/assets/icons/home.svg';
import Calendar from '@/assets/icons/calendar.svg';
import Settings from '@/assets/icons/settings.svg';
import TodoList from '@/assets/icons/todo-list.svg';

const Tab = createBottomTabNavigator();
function MainNavigation() {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarActiveTintColor: '#63F5EF',
				tabBarInactiveTintColor: '#FFFFFF',
				tabBarStyle: {
					borderTopWidth: 0,
					position: 'absolute',
					marginBottom: 25,
					flexDirection: 'row',
					alignItems: 'center',
					gap: 70,
					paddingInline: 32,
					backgroundColor: 'transparent',
					elevation: 0,
				},
			}}
		>
			<Tab.Screen
				name='HomeNavigation'
				component={HomeNavigation}
				options={{
					headerShown: false,
					tabBarShowLabel: false,
					tabBarIcon: ({ color }) => (
						<Home width={33} height={30} fill={color} />
					),
				}}
			/>
			<Tab.Screen
				name='test1'
				component={HomeNavigation}
				options={{
					headerShown: false,
					tabBarShowLabel: false,
					tabBarIcon: ({ color }) => <TodoList fill={color} />,
				}}
			/>
			<Tab.Screen
				name='test2'
				component={HomeNavigation}
				options={{
					headerShown: false,
					tabBarShowLabel: false,
					tabBarIcon: ({ color }) => <Calendar fill={color} />,
				}}
			/>
			<Tab.Screen
				name='test3'
				component={HomeNavigation}
				options={{
					headerShown: false,
					tabBarShowLabel: false,
					tabBarIcon: ({ color }) => <Settings fill={color} />,
				}}
			/>
		</Tab.Navigator>
	);
}

export default MainNavigation;
