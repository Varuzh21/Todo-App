import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CalendarScreen from '@/screens/Calendar/CalendarScreen';

import { TodoProvider } from '@/contexts/TodoStore';
import { Header } from '@/components/Header';

const Stack = createNativeStackNavigator();
function CalendarNavigation() {
	return (
		<TodoProvider>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen
					name='Calendar'
					component={CalendarScreen}
				/>
			</Stack.Navigator>
		</TodoProvider>
	);
}

export default CalendarNavigation;
