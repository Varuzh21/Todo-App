import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import { taskQueries } from '@/entities/task';
import { userQueries } from '@/entities/user';

import { createTask } from '../api/create-task';
import type { CreateTaskValues } from '../schema/create-task.schema';

export function useCreateTask() {
	const queryClient = useQueryClient();

	const createTaskMutation = useMutation({
		mutationFn: async ({ title }: CreateTaskValues) => {
			const user = await queryClient.ensureQueryData(userQueries.me());

			return createTask({ title, userId: user.id });
		},
		onSuccess: newTask => {
			queryClient.setQueryData(taskQueries.list().queryKey, tasks =>
				tasks ? [newTask, ...tasks] : [newTask],
			);
		},
		onError: error => {
			if (!__DEV__) {
				return;
			}

			if (!isAxiosError(error)) {
				console.warn('Create task failed: unexpected error', error.message);
				return;
			}

			if (!error.response) {
				console.warn('Create task failed: network error', error.message);
				return;
			}

			console.warn('Create task failed: API error', error.response.status);
		},
	});

	const { error } = createTaskMutation;
	const responseMessage = isAxiosError<{ message?: unknown }>(error)
		? error.response?.data?.message
		: undefined;
	const serverError =
		typeof responseMessage === 'string' ? responseMessage : undefined;

	return {
		createTask: createTaskMutation.mutate,
		isPending: createTaskMutation.isPending,
		isSuccess: createTaskMutation.isSuccess,
		reset: createTaskMutation.reset,
		serverError,
	};
}
