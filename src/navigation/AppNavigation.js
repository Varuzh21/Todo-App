import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';

function AppNavigation () {
	return (
		<NavigationContainer>
			<AuthNavigator />
		</NavigationContainer>
	)
}

export default AppNavigation