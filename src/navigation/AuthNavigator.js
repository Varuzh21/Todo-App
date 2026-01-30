import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignInScreen from '../screens/Auth/SignInScreen'
import ServiceScreen from '../screens/Auth/ServiceScreen'

const Stack = createNativeStackNavigator()
function AuthNavigator () {
	return (
		<Stack.Navigator screenOptions={{headerShown: false}}>
			<Stack.Screen name='Service' component={ServiceScreen}/>
      <Stack.Screen name='SingIn' component={SignInScreen}/>
		</Stack.Navigator>
	)
}

export default AuthNavigator