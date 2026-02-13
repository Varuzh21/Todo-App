import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TodoProvider } from '@/contexts/TodoStore';
import HomeScreen from '@/screens/Home/HomeScreen';

const Stack = createNativeStackNavigator();
function HomeNavigation() {
	return (
		<TodoProvider>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen
					name='Home'
					component={HomeScreen}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</TodoProvider>
	);
}

export default HomeNavigation;
