import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FONTS, PALETTE } from '@/shared/config/theme';
import { ChevronLeftIcon, ChevronRightIcon } from '@/shared/ui/icons';

import type { CalendarViewMode } from '../config/calendar-config';

interface PeriodHeaderProps {
	label: string;
	viewMode: CalendarViewMode;
	onPrevious: () => void;
	onNext: () => void;
}

export function PeriodHeader({
	label,
	viewMode,
	onPrevious,
	onNext,
}: PeriodHeaderProps) {
	return (
		<View style={styles.header}>
			<Pressable
				role='button'
				accessibilityLabel={`Previous ${viewMode}`}
				android_disableSound
				hitSlop={12}
				onPress={onPrevious}
			>
				<ChevronLeftIcon color={PALETTE.neutral} />
			</Pressable>
			<Text style={styles.label}>{label}</Text>
			<Pressable
				role='button'
				accessibilityLabel={`Next ${viewMode}`}
				android_disableSound
				hitSlop={12}
				onPress={onNext}
			>
				<ChevronRightIcon color={PALETTE.neutral} />
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 24,
		paddingVertical: 14,
		borderBottomWidth: 1,
		borderBottomColor: PALETTE.grayLight,
	},
	label: {
		minWidth: 120,
		textAlign: 'center',
		fontFamily: FONTS.galanoMedium,
		fontSize: 14,
		color: PALETTE.primary,
	},
});
