import type { AxiosError } from 'axios';
import { DEFAULT_ERROR_MESSAGE, HTTP_STATUS_MESSAGES } from '../constants';
import type { ApiErrorResponse } from '../types';

function isApiErrorResponse(data: unknown): data is ApiErrorResponse {
	return data !== null && typeof data === 'object';
}

function parseFieldValue(value: unknown): string | null {
	if (typeof value === 'string') return value;
	if (Array.isArray(value)) return value.map(String).join('. ');
	return null;
}

export function parseAxiosErrorMessage(error: AxiosError): string {
	const data = error.response?.data;

	if (isApiErrorResponse(data)) {
		if (typeof data.message === 'string') return data.message;
		if (typeof data.error === 'string') return data.error;
		if (Array.isArray(data.errors)) return data.errors.join('. ');
	}

	const status = error.response?.status;
	if (status && status in HTTP_STATUS_MESSAGES) {
		return HTTP_STATUS_MESSAGES[status as keyof typeof HTTP_STATUS_MESSAGES];
	}

	return error.message || DEFAULT_ERROR_MESSAGE;
}

export function parseAxiosFieldErrors(
	error: AxiosError,
	fallbackFields: string[] = ['username', 'password'],
): Record<string, string> {
	const data = error.response?.data;

	if (!isApiErrorResponse(data) || !data.errors || typeof data.errors !== 'object') {
		const generic = parseAxiosErrorMessage(error);
		return Object.fromEntries(fallbackFields.map(field => [field, generic]));
	}

	const errors = data.errors as Record<string, unknown>;
	const fieldErrors: Record<string, string> = {};

	for (const [field, value] of Object.entries(errors)) {
		const message = parseFieldValue(value);
		if (message) fieldErrors[field] = message;
	}

	return Object.keys(fieldErrors).length > 0
		? fieldErrors
		: Object.fromEntries(fallbackFields.map(field => [field, parseAxiosErrorMessage(error)]));
}
