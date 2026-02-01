import { SafeAreaView } from 'react-native-safe-area-context';
import AppNavigation from './navigation/AppNavigation';

function App() {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<AppNavigation />
		</SafeAreaView>
	);
}

export default App;