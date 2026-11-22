import { StyleSheet, Text, View } from 'react-native';

import { COLORS, FONTS, PALETTE } from '@/shared/config/theme';

interface TodayProgressProps {
	completedCount: number;
	totalCount: number;
}

const FULL_PERCENT = 100;

export function TodayProgress({
	completedCount,
	totalCount,
}: TodayProgressProps) {
	const hasTasks = totalCount > 0;
	const percent = hasTasks
		? Math.round((completedCount / totalCount) * FULL_PERCENT)
		: 0;
	const summary = hasTasks
		? `${completedCount} of ${totalCount} done`
		: 'Nothing planned for today';

	return (
		<View
			style={styles.card}
			accessible
			accessibilityRole='progressbar'
			accessibilityLabel="Today's progress"
			accessibilityValue={{ min: 0, max: FULL_PERCENT, now: percent }}
		>
			<View style={styles.row}>
				<Text style={styles.title}>Today</Text>
				<Text style={styles.summary}>{summary}</Text>
			</View>
			<View style={styles.track}>
				<View style={[styles.fill, { width: `${percent}%` }]} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		gap: 14,
		padding: 20,
		borderRadius: 8,
		backgroundColor: PALETTE.primary,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	title: {
		fontFamily: FONTS.galanoSemiBold,
		fontSize: 18,
		color: PALETTE.white,
	},
	summary: {
		fontFamily: FONTS.galanoRegular,
		fontSize: 14,
		color: PALETTE.white,
	},
	track: {
		height: 8,
		overflow: 'hidden',
		borderRadius: 4,
		backgroundColor: COLORS.background,
		opacity: 0.9,
	},
	fill: {
		height: '100%',
		borderRadius: 4,
		backgroundColor: PALETTE.success,
	},
});
