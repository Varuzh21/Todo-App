import { z } from 'zod';

export const GENDERS = ['male', 'female'] as const;

export const genderSchema = z.enum(GENDERS);

export const profileSchema = z.object({
	fullName: z.string(),
	email: z.string(),
	phone: z.string(),
	gender: genderSchema.nullable(),
	birthDate: z.iso.date().nullable(),
	imageUrl: z.url().nullable(),
});

export type Gender = z.infer<typeof genderSchema>;
export type Profile = z.infer<typeof profileSchema>;
