import CalendarScreen from '@/screens/Calendar/CalendarScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
function CalendarNavigation() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name='Calendar' component={CalendarScreen} />
		</Stack.Navigator>
	);
}

export default CalendarNavigation;
