import { startOfToday } from 'date-fns';
import { useState } from 'react';

import type { CalendarViewMode } from '../config/calendar-config';
import { shiftDate } from '../lib/calendar-days';

export function useCalendar() {
	const [selectedDate, setSelectedDate] = useState(startOfToday);
	const [viewMode, setViewMode] = useState<CalendarViewMode>('month');

	function showPrevious() {
		setSelectedDate(date => shiftDate(date, viewMode, -1));
	}

	function showNext() {
		setSelectedDate(date => shiftDate(date, viewMode, 1));
	}

	return {
		selectedDate,
		viewMode,
		selectDate: setSelectedDate,
		setViewMode,
		showPrevious,
		showNext,
	};
}
