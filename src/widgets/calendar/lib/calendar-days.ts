import {
	addDays,
	addMonths,
	addWeeks,
	eachDayOfInterval,
	endOfMonth,
	endOfWeek,
	startOfMonth,
	startOfWeek,
} from 'date-fns';

import {
	type CalendarViewMode,
	DAYS_IN_WEEK,
	WEEK_STARTS_ON,
} from '../config/calendar-config';

export function getWeekDays(date: Date) {
	return eachDayOfInterval({
		start: startOfWeek(date, { weekStartsOn: WEEK_STARTS_ON }),
		end: endOfWeek(date, { weekStartsOn: WEEK_STARTS_ON }),
	});
}

export function getMonthWeeks(date: Date) {
	const days = eachDayOfInterval({
		start: startOfWeek(startOfMonth(date), { weekStartsOn: WEEK_STARTS_ON }),
		end: endOfWeek(endOfMonth(date), { weekStartsOn: WEEK_STARTS_ON }),
	});
	const weeks: Date[][] = [];

	for (let index = 0; index < days.length; index += DAYS_IN_WEEK) {
		weeks.push(days.slice(index, index + DAYS_IN_WEEK));
	}

	return weeks;
}

export function shiftDate(
	date: Date,
	viewMode: CalendarViewMode,
	amount: number,
) {
	switch (viewMode) {
		case 'day':
			return addDays(date, amount);
		case 'week':
			return addWeeks(date, amount);
		default:
			return addMonths(date, amount);
	}
}
