import { ActivityIndicator, StyleSheet, Text } from 'react-native';

import { COLORS, FONTS, PALETTE } from '@/shared/config/theme';

interface ListEmptyProps {
	isPending: boolean;
	message: string;
}

export function ListEmpty({ isPending, message }: ListEmptyProps) {
	if (isPending) {
		return <ActivityIndicator color={PALETTE.primary} />;
	}

	return <Text style={styles.message}>{message}</Text>;
}

const styles = StyleSheet.create({
	message: {
		fontFamily: FONTS.galanoRegular,
		fontSize: 14,
		color: COLORS.textSecondary,
	},
});
