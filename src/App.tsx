import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppNavigation } from './navigation/AppNavigation.tsx';
import { GradientView } from './components/GradientView.tsx';

function App() {
	return (
		<View style={{ flex: 1 }}>
			<GradientView>
				<SafeAreaView style={{ flex: 1 }}>
					<AppNavigation />
				</SafeAreaView>
			</GradientView>
		</View>
	);
}

export default App;