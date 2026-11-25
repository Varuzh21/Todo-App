import { queryOptions } from '@tanstack/react-query';

import { readTasks } from './task-storage';

export const taskQueries = {
	all: () => ['tasks'] as const,
	list: (userId: number) =>
		queryOptions({
			queryKey: [...taskQueries.all(), 'list', userId],
			queryFn: () => readTasks(userId),
			networkMode: 'always',
		}),
};
