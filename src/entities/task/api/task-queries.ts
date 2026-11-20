import { queryOptions } from '@tanstack/react-query';

import { getTasks } from './get-tasks';

export const taskQueries = {
	all: () => ['tasks'] as const,
	list: () =>
		queryOptions({
			queryKey: [...taskQueries.all(), 'list'],
			queryFn: ({ signal }) => getTasks(signal),
		}),
};
