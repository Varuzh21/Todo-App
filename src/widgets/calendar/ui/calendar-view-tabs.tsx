import { Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS, FONTS, PALETTE } from '@/shared/config/theme';

import {
	CALENDAR_VIEW_MODES,
	type CalendarViewMode,
} from '../config/calendar-config';

interface CalendarViewTabsProps {
	viewMode: CalendarViewMode;
	onChange: (viewMode: CalendarViewMode) => void;
}

export function CalendarViewTabs({
	viewMode,
	onChange,
}: CalendarViewTabsProps) {
	return (
		<View role='tablist' style={styles.tabs}>
			{CALENDAR_VIEW_MODES.map(({ mode, label }) => {
				const isSelected = mode === viewMode;

				return (
					<Pressable
						key={mode}
						role='tab'
						accessibilityState={{ selected: isSelected }}
						android_disableSound
						hitSlop={8}
						onPress={() => onChange(mode)}
					>
						<Text style={[styles.label, isSelected && styles.labelSelected]}>
							{label}
						</Text>
					</Pressable>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	tabs: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 28,
	},
	label: {
		fontFamily: FONTS.galanoRegular,
		fontSize: 15,
		color: COLORS.textSecondary,
	},
	labelSelected: {
		color: PALETTE.primary,
	},
});
