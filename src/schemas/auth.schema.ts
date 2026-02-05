import * as z from 'zod';

export const LoginSchema = z.object({
	username: z
		.string()
		.nonempty('Username is required')
		.trim()
		.min(5, { message: 'Username must be at least 5 characters' }),

	password: z
		.string()
		.nonempty('Password is required')
		.min(9, { message: 'Password must be at least 9 characters' }),
});

export type LoginInput = z.infer<typeof LoginSchema>;