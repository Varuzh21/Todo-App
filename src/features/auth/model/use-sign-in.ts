import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import { useSession } from '@/entities/session';

import { login } from '../api/login';

export function useSignIn() {
	const { signIn: startSession } = useSession();

	const signInMutation = useMutation({
		mutationFn: login,
		onSuccess: startSession,
	});

	const { error } = signInMutation;

	const responseMessage = isAxiosError<{ message?: unknown }>(error)
		? error.response?.data?.message
		: undefined;

	const serverError =
		typeof responseMessage === 'string' ? responseMessage : undefined;

	return {
		signIn: signInMutation.mutate,
		isPending: signInMutation.isPending,
		serverError,
	};
}
