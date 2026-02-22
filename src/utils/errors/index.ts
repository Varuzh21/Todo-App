import axios from 'axios';
import * as z from 'zod';
import type { AxiosError } from 'axios';
import { DEFAULT_ERROR_MESSAGE } from './constants';
import type { FieldErrors } from './types';
import { parseAxiosErrorMessage, parseAxiosFieldErrors } from './parsers/axios.parser';
import { parseZodErrorMessage, parseZodFieldErrors } from './parsers/zod.parser';

export function getErrorMessage(error: unknown): string {
	if (axios.isAxiosError(error)) return parseAxiosErrorMessage(error);
	if (error instanceof z.ZodError) return parseZodErrorMessage(error);
	if (error instanceof Error) return error.message;
	return DEFAULT_ERROR_MESSAGE;
}

export function getFieldErrors(
	error: unknown,
	fallbackFields: string[] = ['username', 'password'],
): FieldErrors {
	if (axios.isAxiosError(error)) return parseAxiosFieldErrors(error, fallbackFields);
	if (error instanceof z.ZodError) return parseZodFieldErrors(error);

	const message = error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE;
	return Object.fromEntries(fallbackFields.map(field => [field, message]));
}

export function isAxiosError(error: unknown): error is AxiosError {
	return axios.isAxiosError(error);
}

export function isZodError(error: unknown): error is z.ZodError {
	return error instanceof z.ZodError;
}

export type { FieldErrors } from './types';
