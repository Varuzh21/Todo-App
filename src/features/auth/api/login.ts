import { api, authTokensSchema } from '@/shared/api';

import type { SignInValues } from '../schema/sign-in.schema';

export async function login(form: SignInValues) {
	const { data } = await api.post('/auth/login', form);

	return authTokensSchema.parse(data);
}
