import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TodoProvider } from '@/contexts/TodoStore';
import HomeScreen from '@/screens/Home/HomeScreen';
import TaskDetail from '@/screens/Task/TaskDetail';

import { Header } from '@/components/Header';

export type RootStackParamList = {
	Home: undefined;
	TaskDetail: { taskId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
function HomeNavigation() {
	return (
		<TodoProvider>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name='Home' component={HomeScreen} />
				<Stack.Screen
					name='TaskDetail'
					component={TaskDetail}
					options={{
						header: () => <Header title='Task Details' />,
						headerShown: true,
						headerTransparent: true,
					}}
				/>
			</Stack.Navigator>
		</TodoProvider>
	);
}

export default HomeNavigation;
