import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS } from '@/shared/config/theme';

export function CalendarScreen() {
	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Calendar</Text>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLORS.background,
	},
	title: {
		fontSize: 32,
		lineHeight: 44,
		fontWeight: 600,
		color: COLORS.text,
	},
});
