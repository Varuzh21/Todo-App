import { z } from 'zod';

import type { SignInPayload } from '@/entities/session';
import { api, authTokensSchema } from '@/shared/api';

import type { SignInValues } from '../schema/sign-in.schema';

const loginResponseSchema = authTokensSchema.extend({ id: z.number() });

export async function login(form: SignInValues): Promise<SignInPayload> {
	const { data } = await api.post('/auth/login', form);
	const { id, ...tokens } = loginResponseSchema.parse(data);

	return { ...tokens, userId: id };
}
