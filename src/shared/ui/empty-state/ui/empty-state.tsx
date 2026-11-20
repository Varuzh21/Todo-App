import { StyleSheet, Text, View } from 'react-native';

import { COLORS, FONTS } from '@/shared/config/theme';

interface EmptyStateProps {
	message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
	return (
		<View style={styles.container}>
			<Text style={styles.message}>{message}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	message: {
		fontFamily: FONTS.galanoRegular,
		fontSize: 14,
		color: COLORS.textSecondary,
	},
});
