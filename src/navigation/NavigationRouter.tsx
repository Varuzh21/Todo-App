import { useAuth } from '@/hooks/useAuth'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigator from './AuthNavigator.tsx'
import MainNavigation from './MainNavigation.tsx'
import { ActivityIndicator, View } from 'react-native'

function NavigationRouter() {
	const { userToken, isLoading } = useAuth();

	if (isLoading) {
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<ActivityIndicator size='large' color='#000' />
		</View>;
	}

	return (
		<NavigationContainer>
			{userToken !== null ? <MainNavigation /> : <AuthNavigator />}
		</NavigationContainer>
	);
}

export default NavigationRouter;
