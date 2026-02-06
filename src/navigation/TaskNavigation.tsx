import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskScreen from '@/screens/Task/TaskScreen';

const Stack = createNativeStackNavigator();
function TaskNavigation() {
	return (
		<Stack.Navigator screenOptions={{headerShown: false}}>
			<Stack.Screen name='Task' component={TaskScreen} />
		</Stack.Navigator>
	);
}

export default TaskNavigation;
