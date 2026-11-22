import { format, parseISO } from 'date-fns';

const DATE_KEY_FORMAT = 'yyyy-MM-dd';

export function toDateKey(date: Date) {
	return format(date, DATE_KEY_FORMAT);
}

export function fromDateKey(dateKey: string) {
	return parseISO(dateKey);
}
