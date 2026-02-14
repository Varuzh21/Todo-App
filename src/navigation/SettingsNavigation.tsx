import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SettingsScreen from '@/screens/Settings/SettingsScreen';

import { Header } from '@/components/Header';

const Stack = createNativeStackNavigator();
function SettingsNavigation() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name='Settings'
				component={SettingsScreen}
				options={{
					header: () => <Header title='Settings'/>,
					headerShown: true,
					headerTransparent: true,
				}}
			/>
		</Stack.Navigator>
	);
}

export default SettingsNavigation;
