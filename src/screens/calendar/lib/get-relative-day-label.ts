import { differenceInCalendarDays } from 'date-fns';

export function getRelativeDayLabel(date: Date, today: Date) {
	const dayDifference = differenceInCalendarDays(date, today);

	switch (dayDifference) {
		case 0:
			return 'Today';
		case 1:
			return 'Tomorrow';
		case -1:
			return 'Yesterday';
		default:
			return dayDifference > 0
				? `In ${dayDifference} Days`
				: `${Math.abs(dayDifference)} Days Ago`;
	}
}
