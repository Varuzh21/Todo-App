export const DEFAULT_ERROR_MESSAGE = 'Something went wrong. Please try again.';

export const HTTP_STATUS_MESSAGES: Record<number, string> = {
	400: 'Invalid request. Please check your input.',
	401: 'Invalid credentials. Please try again.',
	403: 'Access denied.',
	404: 'Resource not found.',
	422: 'Validation failed. Please check your input.',
	500: 'Server error. Please try again later.',
} as const;
