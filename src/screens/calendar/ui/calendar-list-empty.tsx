import { ActivityIndicator, StyleSheet, Text } from 'react-native';

import { COLORS, FONTS, PALETTE } from '@/shared/config/theme';

interface CalendarListEmptyProps {
	isPending: boolean;
	isSearching: boolean;
}

export function CalendarListEmpty({
	isPending,
	isSearching,
}: CalendarListEmptyProps) {
	if (isPending) {
		return <ActivityIndicator color={PALETTE.primary} />;
	}

	const message = isSearching ? 'No tasks found' : 'No tasks for this day';

	return <Text style={styles.message}>{message}</Text>;
}

const styles = StyleSheet.create({
	message: {
		fontFamily: FONTS.galanoRegular,
		fontSize: 14,
		color: COLORS.textSecondary,
	},
});
