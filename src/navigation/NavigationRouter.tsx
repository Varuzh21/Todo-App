import { useAuth } from '@/hooks/useAuth'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigator from './AuthNavigator.tsx'
import MainNavigation from './MainNavigation.tsx'

function NavigationRouter() {
	const { userToken } = useAuth();

	return (
		<NavigationContainer>
			{userToken !== null ? <MainNavigation /> : <AuthNavigator />}
		</NavigationContainer>
	);
}

export default NavigationRouter;
