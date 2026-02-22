export type FieldErrors = Record<string, string>;

export interface ApiErrorResponse {
	message?: string;
	error?: string;
	errors?: string[] | Record<string, string | string[]>;
}
