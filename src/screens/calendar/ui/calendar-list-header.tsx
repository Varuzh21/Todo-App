import type { ComponentProps } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS, FONTS } from '@/shared/config/theme';
import { Calendar } from '@/widgets/calendar';

import { getRelativeDayLabel } from '../lib/get-relative-day-label';

interface CalendarListHeaderProps extends ComponentProps<typeof Calendar> {
	isSearching: boolean;
}

export function CalendarListHeader({
	isSearching,
	...calendarProps
}: CalendarListHeaderProps) {
	const sectionTitle = isSearching
		? 'Search Results'
		: getRelativeDayLabel(calendarProps.selectedDate, new Date());

	return (
		<View style={styles.container}>
			<Calendar {...calendarProps} />
			<Text style={styles.sectionTitle}>{sectionTitle}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: 24,
		paddingBottom: 16,
	},
	sectionTitle: {
		fontFamily: FONTS.galanoMedium,
		fontSize: 15,
		color: COLORS.text,
	},
});
