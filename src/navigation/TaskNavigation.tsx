import { TodoProvider } from '@/contexts/TodoStore';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskScreen from '@/screens/Task/TaskScreen';

const Stack = createNativeStackNavigator();
function TaskNavigation() {
	return (
		<TodoProvider>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name='Task' component={TaskScreen} />
			</Stack.Navigator>
		</TodoProvider>
	);
}

export default TaskNavigation;
