import { format, isSameDay } from 'date-fns';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS, FONTS, PALETTE } from '@/shared/config/theme';
import { toDateKey } from '@/shared/lib/date';

import { getWeekDays } from '../lib/calendar-days';

interface WeekdayRowProps {
	selectedDate: Date;
}

export function WeekdayRow({ selectedDate }: WeekdayRowProps) {
	return (
		<View style={styles.row}>
			{getWeekDays(selectedDate).map(day => (
				<Text
					key={toDateKey(day)}
					style={[
						styles.weekday,
						isSameDay(day, selectedDate) && styles.weekdaySelected,
					]}
				>
					{format(day, 'EEE')}
				</Text>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		paddingVertical: 12,
	},
	weekday: {
		flex: 1,
		textAlign: 'center',
		fontFamily: FONTS.galanoRegular,
		fontSize: 14,
		color: COLORS.text,
	},
	weekdaySelected: {
		color: PALETTE.primary,
	},
});
