import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator.tsx';
import { AuthProvider } from '@/contexts/AuthStore.tsx';
import MainNavigation from './MainNavigation.tsx'

export function AppNavigation() {
	return (
		<NavigationContainer>
			<AuthProvider>
				{/* <AuthNavigator /> */}
				<MainNavigation/>
			</AuthProvider>
		</NavigationContainer>
	);
}