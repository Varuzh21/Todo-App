import { useMutation, useQueryClient } from '@tanstack/react-query';

import { TASK_STORAGE_MUTATION_SCOPE, taskQueries } from '@/entities/task';

import { setTaskCompleted } from '../api/set-task-completed';

export function useToggleTask() {
	const queryClient = useQueryClient();

	const toggleTaskMutation = useMutation({
		mutationFn: setTaskCompleted,
		networkMode: 'always',
		scope: TASK_STORAGE_MUTATION_SCOPE,
		onMutate: async ({ userId, taskId, isCompleted }) => {
			const { queryKey } = taskQueries.list(userId);

			await queryClient.cancelQueries({ queryKey });
			queryClient.setQueryData(queryKey, tasks =>
				tasks?.map(task =>
					task.id === taskId ? { ...task, isCompleted } : task,
				),
			);
		},
		onError: (error, { userId }) => {
			if (__DEV__) {
				console.warn('Toggle task failed', error.message);
			}
			queryClient.invalidateQueries({
				queryKey: taskQueries.list(userId).queryKey,
			});
		},
	});

	return { setTaskCompleted: toggleTaskMutation.mutate };
}
