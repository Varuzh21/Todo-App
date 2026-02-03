import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';

export function AppNavigation () {
	return (
		<NavigationContainer>
			<AuthNavigator />
		</NavigationContainer>
	)
}