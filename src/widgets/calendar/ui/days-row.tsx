import { isSameDay, isSameMonth } from 'date-fns';
import { StyleSheet, View } from 'react-native';

import { toDateKey } from '@/shared/lib/date';

import { CalendarDay } from './calendar-day';

interface DaysRowProps {
	days: Date[];
	selectedDate: Date;
	today: Date;
	onSelectDate: (date: Date) => void;
}

export function DaysRow({
	days,
	selectedDate,
	today,
	onSelectDate,
}: DaysRowProps) {
	return (
		<View style={styles.row}>
			{days.map(day => (
				<CalendarDay
					key={toDateKey(day)}
					date={day}
					isSelected={isSameDay(day, selectedDate)}
					isToday={isSameDay(day, today)}
					isOutsideMonth={!isSameMonth(day, selectedDate)}
					onPress={onSelectDate}
				/>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
	},
});
