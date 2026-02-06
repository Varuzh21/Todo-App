import SettingsScreen from '@/screens/Settings/SettingsScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
function SettingsNavigation() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name='Settings' component={SettingsScreen} />
		</Stack.Navigator>
	);
}

export default SettingsNavigation;
