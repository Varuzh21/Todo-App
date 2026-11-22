import { z } from 'zod';

export const userSchema = z.object({
	id: z.number(),
	username: z.string(),
	firstName: z.string(),
	lastName: z.string(),
	email: z.string(),
	phone: z.string(),
	gender: z.string(),
	// DummyJSON sends dates without zero padding, e.g. `1996-5-30`.
	birthDate: z.string(),
	image: z.url(),
});

export type User = z.infer<typeof userSchema>;
