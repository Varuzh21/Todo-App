import { ActivityIndicator, StyleSheet, Text } from 'react-native';

import { COLORS, FONTS, PALETTE } from '@/shared/config/theme';

interface DashboardListEmptyProps {
	isPending: boolean;
}

export function DashboardListEmpty({ isPending }: DashboardListEmptyProps) {
	if (isPending) {
		return <ActivityIndicator color={PALETTE.primary} />;
	}

	return <Text style={styles.message}>No tasks for today</Text>;
}

const styles = StyleSheet.create({
	message: {
		fontFamily: FONTS.galanoRegular,
		fontSize: 14,
		color: COLORS.textSecondary,
	},
});
