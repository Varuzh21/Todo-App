import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SettingsScreen from '@/screens/Settings/SettingsScreen';

import Left from '@/assets/icons/left.svg';

const Stack = createNativeStackNavigator();
function SettingsNavigation() {
	const navigate = useNavigation();
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name='Settings'
				component={SettingsScreen}
				options={{
					header: () => (
						<View
							style={{
								height: 60,
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'center',
								paddingHorizontal: 16,
							}}
						>
							<TouchableOpacity
								onPress={() => navigate.goBack()}
								style={{
									position: 'absolute',
									left: 18,
									alignItems: 'center',
									justifyContent: 'center',
									backgroundColor: '#fff',
									paddingHorizontal: 9,
									paddingVertical: 7,
									borderRadius: 50,
								}}
							>
								<Left />
							</TouchableOpacity>
							<Text
								style={{
									fontFamily: 'Medium',
									fontSize: 25,
									color: '#fff',
								}}
							>
								Settings
							</Text>
						</View>
					),
					headerShown: true,
					headerTransparent: true,
				}}
			/>
		</Stack.Navigator>
	);
}

export default SettingsNavigation;
