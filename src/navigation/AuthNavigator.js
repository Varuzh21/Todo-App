import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConfirmScreen from '../screens/Auth/ConfirmScreen';
import DetailScreen from '../screens/Auth/DetailScreen';
import ReviewScreen from '../screens/Auth/ReviewScreen';
import ServiceScreen from '../screens/Auth/ServiceScreen';
import SignInScreen from '../screens/Auth/SignInScreen';

const Stack = createNativeStackNavigator();
function AuthNavigator() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name='Service' component={ServiceScreen} />
			<Stack.Screen name='Detail' component={DetailScreen} />
			<Stack.Screen name='Review' component={ReviewScreen} />
			<Stack.Screen name='Confirm' component={ConfirmScreen} />
			<Stack.Screen name='SingIn' component={SignInScreen} />
		</Stack.Navigator>
	);
}

export default AuthNavigator;
