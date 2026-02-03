import { View, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppNavigation } from './navigation/AppNavigation';
import { GradientView } from './components/GradientView';

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