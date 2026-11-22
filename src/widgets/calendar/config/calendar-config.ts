export type CalendarViewMode = 'day' | 'week' | 'month';

export const CALENDAR_VIEW_MODES = [
	{ mode: 'day', label: 'Day' },
	{ mode: 'week', label: 'Week' },
	{ mode: 'month', label: 'Month' },
] as const satisfies ReadonlyArray<{ mode: CalendarViewMode; label: string }>;

export const WEEK_STARTS_ON = 1;
export const DAYS_IN_WEEK = 7;
