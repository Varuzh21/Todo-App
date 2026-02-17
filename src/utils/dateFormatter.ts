/**
 * Formats a YYYY-MM-DD string into a readable format
 * Example: "2026-01-16" -> "16 January 2026"
 */

export const formatDate = (dateString: string | null | undefined): string => {
	if (!dateString) return '';
	const date = new Date(dateString);
	return date.toLocaleDateString('en-GB', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	} as Intl.DateTimeFormatOptions);
};
