import { AuthProvider } from '@/contexts/AuthStore.tsx';
import NavigationRouter from './NavigationRouter';

export function AppNavigation() {
	return (
		<AuthProvider>
			<NavigationRouter />
		</AuthProvider>
	);
}