import { View } from 'react-native';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GradientView } from '@/components/GradientView.tsx';
import { AppNavigation } from '@/navigation/AppNavigation.tsx';

function App() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<BottomSheetModalProvider>
				<View style={{ flex: 1 }}>
					<GradientView>
						<SafeAreaView style={{ flex: 1 }}>
							<AppNavigation />
						</SafeAreaView>
					</GradientView>
				</View>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	);
}

export default App;
