import { useMutation, useQueryClient } from '@tanstack/react-query';

import { TASK_STORAGE_MUTATION_SCOPE, taskQueries } from '@/entities/task';
import { toDateKey } from '@/shared/lib/date';

import { createTask } from '../api/create-task';
import type { CreateTaskValues } from '../schema/create-task.schema';

type CreateTaskVariables = CreateTaskValues & { userId: number };

export function useCreateTask() {
	const queryClient = useQueryClient();

	const createTaskMutation = useMutation({
		mutationFn: ({ title, dueDate, userId }: CreateTaskVariables) =>
			createTask({ title, dueDate: toDateKey(dueDate), userId }),
		networkMode: 'always',
		scope: TASK_STORAGE_MUTATION_SCOPE,
		onSuccess: newTask => {
			queryClient.setQueryData(
				taskQueries.list(newTask.userId).queryKey,
				tasks => (tasks ? [newTask, ...tasks] : undefined),
			);
		},
		onError: error => {
			if (__DEV__) {
				console.warn('Create task failed', error.message);
			}
		},
	});

	return {
		createTask: createTaskMutation.mutate,
		isPending: createTaskMutation.isPending,
		isSuccess: createTaskMutation.isSuccess,
		isError: createTaskMutation.isError,
		reset: createTaskMutation.reset,
	};
}
