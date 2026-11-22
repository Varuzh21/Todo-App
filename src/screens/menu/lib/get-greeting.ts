const AFTERNOON_START_HOUR = 12;
const EVENING_START_HOUR = 18;

export function getGreeting(date: Date) {
	const hour = date.getHours();

	if (hour < AFTERNOON_START_HOUR) {
		return 'Good morning';
	}

	if (hour < EVENING_START_HOUR) {
		return 'Good afternoon';
	}

	return 'Good evening';
}
