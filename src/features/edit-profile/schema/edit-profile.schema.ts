import { z } from 'zod';

import { genderSchema } from '@/entities/user';

export const editProfileSchema = z.object({
	fullName: z
		.string({ error: 'Enter your full name' })
		.trim()
		.min(1, 'Enter your full name'),
	email: z
		.string({ error: 'Enter your email address' })
		.trim()
		.pipe(z.email('Enter a valid email address')),
	phone: z
		.string({ error: 'Enter your phone number' })
		.trim()
		.min(1, 'Enter your phone number'),
	gender: genderSchema.nullable(),
	birthDate: z.date({ error: 'Pick your date of birth' }),
});

export type EditProfileValues = z.infer<typeof editProfileSchema>;
