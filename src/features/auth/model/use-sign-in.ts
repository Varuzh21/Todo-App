import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { z } from 'zod';

import { useSession } from '@/entities/session';

import { login } from '../api/login';

export function useSignIn() {
	const { signIn: startSession } = useSession();

	const signInMutation = useMutation({
		mutationKey: ['signIn'],
		mutationFn: login,
		onSuccess: startSession,
	});

	const { error } = signInMutation;
	const apiError = z
		.object({ message: z.string() })
		.safeParse(isAxiosError(error) ? error.response?.data : undefined);
	const serverError = apiError.success
		? apiError.data.message
		: error && 'Something went wrong. Please try again.';

	return {
		signIn: signInMutation.mutate,
		isPending: signInMutation.isPending,
		serverError,
	};
}
