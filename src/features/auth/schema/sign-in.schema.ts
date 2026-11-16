import { z } from 'zod';

export const signInSchema = z.object({
	username: z
		.string({ error: 'Enter your username' })
		.trim()
		.min(1, 'Enter your username')
		.min(6, 'Username must be at least 6 characters'),
	password: z
		.string({ error: 'Enter your password' })
		.min(1, 'Enter your password')
		.min(8, 'Password must be at least 8 characters'),
});

export type SignInValues = z.infer<typeof signInSchema>;
