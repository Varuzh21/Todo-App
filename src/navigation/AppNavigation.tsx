import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator.tsx';
import { AuthProvider } from '../contexts/AuthStore.tsx';

export function AppNavigation() {
	return (
		<NavigationContainer>
			<AuthProvider>
				<AuthNavigator />
			</AuthProvider>
		</NavigationContainer>
	);
}