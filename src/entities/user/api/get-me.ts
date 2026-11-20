import { api } from '@/shared/api';

import { userSchema } from '../model/user-schema';

export async function getMe(signal?: AbortSignal) {
	const { data } = await api.get('/auth/me', { signal });

	return userSchema.parse(data);
}
