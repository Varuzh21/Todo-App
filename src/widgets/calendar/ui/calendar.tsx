import { format } from 'date-fns';
import { StyleSheet, Text, View } from 'react-native';

import { FONTS, PALETTE } from '@/shared/config/theme';
import { toDateKey } from '@/shared/lib/date';

import type { CalendarViewMode } from '../config/calendar-config';
import { getMonthWeeks, getWeekDays } from '../lib/calendar-days';
import { DaysRow } from './days-row';
import { PeriodHeader } from './period-header';
import { WeekdayRow } from './weekday-row';

interface CalendarProps {
	selectedDate: Date;
	viewMode: CalendarViewMode;
	onSelectDate: (date: Date) => void;
	onPrevious: () => void;
	onNext: () => void;
}

export function Calendar({
	selectedDate,
	viewMode,
	onSelectDate,
	onPrevious,
	onNext,
}: CalendarProps) {
	const today = new Date();
	const isDayView = viewMode === 'day';
	const isWeekView = viewMode === 'week';
	const isMonthView = viewMode === 'month';

	return (
		<View style={styles.container}>
			<View style={styles.card}>
				<PeriodHeader
					label={format(selectedDate, 'MMMM, yyyy')}
					viewMode={viewMode}
					onPrevious={onPrevious}
					onNext={onNext}
				/>
				{isDayView ? (
					<Text style={styles.selectedWeekday}>
						{format(selectedDate, 'EEE')}
					</Text>
				) : (
					<WeekdayRow selectedDate={selectedDate} />
				)}

				{isWeekView && (
					<View style={styles.weekDays}>
						<DaysRow
							days={getWeekDays(selectedDate)}
							selectedDate={selectedDate}
							today={today}
							onSelectDate={onSelectDate}
						/>
					</View>
				)}
			</View>

			{isMonthView && (
				<View style={[styles.card, styles.monthGrid]}>
					{getMonthWeeks(selectedDate).map(week => (
						<DaysRow
							key={toDateKey(week[0])}
							days={week}
							selectedDate={selectedDate}
							today={today}
							onSelectDate={onSelectDate}
						/>
					))}
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: 20,
	},
	card: {
		borderWidth: 1,
		borderRadius: 8,
		borderColor: PALETTE.grayLight,
		backgroundColor: PALETTE.white,
	},
	selectedWeekday: {
		paddingVertical: 12,
		textAlign: 'center',
		fontFamily: FONTS.galanoRegular,
		fontSize: 14,
		color: PALETTE.primary,
	},
	weekDays: {
		paddingBottom: 16,
	},
	monthGrid: {
		gap: 18,
		paddingVertical: 20,
	},
});
