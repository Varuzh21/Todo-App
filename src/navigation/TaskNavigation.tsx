import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskDetail from '@/screens/Task/TaskDetail';
import TaskScreen from '@/screens/Task/TaskScreen';

import { TodoProvider } from '@/contexts/TodoStore';
import { Header } from '@/components/Header';

export type TaskStackParamList = {
	Task: undefined;
	TaskDetail: {
		taskId: number;
	};
};

const Stack = createNativeStackNavigator<TaskStackParamList>();
function TaskNavigation() {
	return (
		<TodoProvider>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name='Task' component={TaskScreen} />
				<Stack.Screen
					name='TaskDetail'
					component={TaskDetail}
					options={{
						header: () => <Header title='Task Details' showBackButton />,
						headerShown: true,
						headerTransparent: true,
					}}
				/>
			</Stack.Navigator>
		</TodoProvider>
	);
}

export default TaskNavigation;
