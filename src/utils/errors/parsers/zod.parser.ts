import type * as z from 'zod';

export function parseZodErrorMessage(error: z.ZodError): string {
	return error.issues
		.map(issue => {
			const path = issue.path.length > 0 ? `${issue.path.join('.')}: ` : '';
			return `${path}${issue.message}`;
		})
		.join('. ');
}

export function parseZodFieldErrors(error: z.ZodError): Record<string, string> {
	return error.issues.reduce<Record<string, string>>((acc, issue) => {
		const field = issue.path[0]?.toString() ?? 'form';
		acc[field] = issue.message;
		return acc;
	}, {});
}
