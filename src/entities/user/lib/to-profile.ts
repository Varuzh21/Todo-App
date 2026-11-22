import { isValid, parse } from 'date-fns';

import { toDateKey } from '@/shared/lib/date';

import { genderSchema, type Profile } from '../model/profile-schema';
import type { User } from '../model/user-schema';

const API_BIRTH_DATE_FORMAT = 'yyyy-M-d';

function toBirthDateKey(birthDate: string) {
	const date = parse(birthDate, API_BIRTH_DATE_FORMAT, new Date());

	return isValid(date) ? toDateKey(date) : null;
}

export function toProfile(user: User): Profile {
	const gender = genderSchema.safeParse(user.gender);

	return {
		fullName: `${user.firstName} ${user.lastName}`,
		email: user.email,
		phone: user.phone,
		gender: gender.success ? gender.data : null,
		birthDate: toBirthDateKey(user.birthDate),
		imageUrl: user.image,
	};
}
