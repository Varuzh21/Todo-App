import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '@/shared/config/theme';

export function TaskCompletedScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Completed</Text>
		</View>
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
